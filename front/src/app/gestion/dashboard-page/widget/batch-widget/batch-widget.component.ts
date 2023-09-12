import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { Batch } from '../../../../models/interface';
import { ContextMenuAction } from '../../../../models/interface';

@Component({
  selector: 'app-batch-widget',
  templateUrl: './batch-widget.component.html',
  styleUrls: ['./batch-widget.component.scss'],
})
export class BatchWidgetComponent implements OnInit, AfterViewInit {
  @ViewChild('lotsWidgetTitleContainer') lotsWidgetTitleContainer!: ElementRef;
  @ViewChild('lockedBatchsContainer') lockedBatchsContainer!: ElementRef;
  @ViewChild('confirmationOverlay') confirmationOverlay!: ElementRef;
  lockedCounter!: number;
  batchContainerNumber!: number;
  batch: Batch[] = [
    {
      idPacket: 'MASSI-20230517-20230517-041227-CE-INDI-GE-0001-1',
      status: 'INJECTED',
      domain: 'personal_insurance.caisse_epargne',
      startInjectionDate: '2023-05-17T05:00:11',
      endInjectionDate: '2023-05-17T05:05:56',
      lock: false,
      lockComment: 'test ok',
      numberOfDocument: 615,
      idSICreator: 'ADOB',
      routings: [
        {
          type: 'DELIVERED',
          value: '383',
        },
        {
          type: 'NON_DELIVERED',
          value: '4',
        },
        {
          type: 'DIGITAL',
          value: '228',
        },
      ],
      documentTypes: [
        {
          type: 'VER',
          value: '49',
        },
        {
          type: 'TRF',
          value: '24',
        },
        {
          type: 'SIN',
          value: '5',
        },
        {
          type: 'VER',
          value: '69',
        },
        {
          type: 'RCT',
          value: '142',
        },
        {
          type: 'RCP',
          value: '176',
        },
        {
          type: 'RAC',
          value: '2',
        },
        {
          type: 'PMT',
          value: '19',
        },
        {
          type: 'PMT',
          value: '19',
        },
        {
          type: 'IMP',
          value: '7',
        },
        {
          type: 'CVR',
          value: '47',
        },
        {
          type: 'CLB',
          value: '25',
        },
        {
          type: 'AVE',
          value: '26',
        },
        {
          type: 'ARB',
          value: '18',
        },
        {
          type: 'ADH',
          value: '6',
        },
      ],
    },
    {
      idPacket: 'MASSI-20230517-20230517-041227-CE-INDI-GE-0001-3',
      status: 'INJECTED',
      domain: 'personal_insurance.caisse_epargne',
      startInjectionDate: '2023-05-17T05:00:11',
      endInjectionDate: '2023-05-17T05:05:56',
      lock: true,
      lockComment: 'test ok',
      numberOfDocument: 615,
      idSICreator: 'ADOB',
      routings: [
        {
          type: 'DELIVERED',
          value: '383',
        },
        {
          type: 'NON_DELIVERED',
          value: '4',
        },
        {
          type: 'DIGITAL',
          value: '228',
        },
      ],
      documentTypes: [
        {
          type: 'VER',
          value: '49',
        },
        {
          type: 'TRF',
          value: '24',
        },
        {
          type: 'SIN',
          value: '5',
        },
        {
          type: 'VER',
          value: '69',
        },
        {
          type: 'RCT',
          value: '142',
        },
        {
          type: 'RCP',
          value: '176',
        },
        {
          type: 'RAC',
          value: '2',
        },
        {
          type: 'PMT',
          value: '19',
        },
        {
          type: 'PMT',
          value: '19',
        },
        {
          type: 'IMP',
          value: '7',
        },
        {
          type: 'CVR',
          value: '47',
        },
        {
          type: 'CLB',
          value: '25',
        },
        {
          type: 'AVE',
          value: '26',
        },
        {
          type: 'ARB',
          value: '18',
        },
        {
          type: 'ADH',
          value: '6',
        },
      ],
    },
    {
      idPacket: 'MASSI-20230517-20230517-041227-CE-INDI-GE-0001-2',
      status: 'INJECTED',
      domain: 'personal_insurance.caisse_epargne',
      startInjectionDate: '2023-05-17T05:00:11',
      endInjectionDate: '2023-05-17T05:05:56',
      lock: true,
      numberOfDocument: 32,
      idSICreator: 'ADOB',
      routings: [
        {
          type: 'DELIVERED',
          value: '32',
        },
      ],
      documentTypes: [
        {
          type: 'VER',
          value: '32',
        },
      ],
    },
    {
      idPacket: 'MASSI-20230517-20230517-041227-CE-INDI-GE-0001-3',
      status: 'INPROGRESS',
      domain: 'personal_insurance.ametis',
      startInjectionDate: '2023-05-17T05:00:11',
      idSICreator: 'ADOB',
    },
    {
      idPacket: 'MASSI-20230517-20230517-041227-CE-INDI-GE-0001-4',
      status: 'FAILED',
      domain: 'personal_insurance.caisse_epargne',
      startInjectionDate: '2023-05-17T05:00:11',
      idSICreator: 'ADOB',
    },
  ];
  batchLocked: Batch[] = [];
  menuItemDelete!: ContextMenuAction;
  menuItemUnlock!: ContextMenuAction;
  contextMenuVisible = false;
  showConfirmation = false;
  contextMenuPosition = { top: 0, left: 0 };
  selectedBatchIndex = -1;
  lockedBatchContainerSelected!: Element;

  constructor(
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.adjustBatchContainerHeight();
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    this.hideContextMenu();
    this.cancelDelete();
    event.preventDefault();
    if (event.button === 2) {
      // Vérifie si le bouton droit de la souris est utilisé
      const lockedBatchElement = this.findParentLockedBatch(
        event.target as HTMLElement
      );
      if (lockedBatchElement != null) {
        const index = this.batch.findIndex(
          (batch: Batch) => batch.idPacket === lockedBatchElement.dataset['id']
        );
        if (lockedBatchElement.firstElementChild) {
          this.lockedBatchContainerSelected =
            lockedBatchElement.firstElementChild;
          lockedBatchElement.firstElementChild.classList.add('active');
        }

        this.showContextMenu(event, index);
      }
    }
  }

  ngOnInit(): void {
    this.updateLockedBatch();

    this.menuItemDelete = {
      name: 'Supprimer',
      action: () => {
        this.showConfirmation = true;
      },
    };
    this.menuItemUnlock = {
      name: 'Déverrouiller',
      action: () => {
        if (this.selectedBatchIndex >= 0) {
          // Déverrouiller le lot verrouillé
          this.batch[this.selectedBatchIndex].lock = false;
          this.updateLockedBatch();
          this.removeActiveClass();
          this.cdRef.detectChanges();
        }
      },
    };

    document.addEventListener('click', () => {
      this.removeActiveClass();
      this.hideContextMenu();
    });
  }
  ngAfterViewInit() {
    this.adjustBatchContainerHeight();
    this.cdRef.detectChanges();
  }

  private adjustBatchContainerHeight() {
    const totalHeight =
      this.elementRef.nativeElement.getBoundingClientRect().height;
    const totalHeightPadding =
      parseFloat(
        window.getComputedStyle(
          this.elementRef.nativeElement.querySelector('.widget')
        ).padding
      ) * 2;

    const lotsWidgetTitleContainerHeight = this.elementRef.nativeElement
      .querySelector('#lotsWidgetTitleContainer')
      .getBoundingClientRect().height;
    const lockedBatchContainer = this.elementRef.nativeElement.querySelector(
      '#lockedBatchsContainer'
    );

    this.batchContainerNumber = Math.floor(
      (totalHeight -
        totalHeightPadding -
        (lotsWidgetTitleContainerHeight + 10) -
        30) /
        50
    );
    /*calcule le nombre de lot que je peux rentrer au maximum dans l'élément batch widget sans déborder donc pour ça je calcule la hauteur total de l'élément batch widget : (totalHeight) 
    moins la hauteur des padding de batchwidget : (totalHeightPadding) moins la hauteur de mon titleContainer avec la marge : (lotsWidgetTitleContainerHeight + 10) - 30 px la taille 
    minimum de mon bouton afficher plus, le tout diviser par 50px qui est la hauteur de chaque composant lot*/

    const batchContainerHeight = this.batchContainerNumber * 50;
    lockedBatchContainer.style.height = batchContainerHeight + 'px';
  }

  private updateLockedBatch() {
    this.batchLocked = this.batch.filter((item) => item.lock === true);
    this.lockedCounter = this.batchLocked.length;
    console.log(this.batchLocked, this.lockedCounter);
  }

  private findParentLockedBatch(
    element: HTMLElement | null
  ): HTMLElement | null {
    if (!element) {
      return null;
    }

    if (element.tagName.toLowerCase() === 'app-locked-batch') {
      return element;
    }

    return this.findParentLockedBatch(element.parentElement);
  }

  onMenuItemClick(item: ContextMenuAction) {
    item.action();
  }

  showContextMenu(event: MouseEvent, index: number) {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = { top: event.clientY, left: event.clientX };
    this.selectedBatchIndex = index;
  }
  hideContextMenu() {
    this.contextMenuVisible = false;
  }

  private removeActiveClass() {
    if (this.lockedBatchContainerSelected != null) {
      this.lockedBatchContainerSelected.classList.remove('active');
    }
  }

  deleteConfirmed() {
    if (this.selectedBatchIndex >= 0) {
      // Trouver l'index dans le tableau 'batch'
      const lockedIndexInBatchList = this.batch.findIndex(
        (batch: Batch) =>
          batch.idPacket === this.batch[this.selectedBatchIndex].idPacket
      );

      // Supprimer l'élément du tableau 'batch' en utilisant l'index trouvé
      if (lockedIndexInBatchList >= 0) {
        this.batch.splice(lockedIndexInBatchList, 1);
        this.updateLockedBatch();
      }

      this.showConfirmation = false;
      this.cdRef.detectChanges();
    }
  }
  cancelDelete() {
    this.showConfirmation = false;
  }
}
