import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContextMenuAction } from 'src/app/models/interface';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {
  @Input() visible = false;
  @Input() position = { top: 0, left: 0 };
  @Input() items: ContextMenuAction[] = [];
  @Output() itemClick = new EventEmitter<ContextMenuAction>();

  onMenuItemClick(item: ContextMenuAction) {
    this.itemClick.emit(item);
    this.visible = false;
  }
}
