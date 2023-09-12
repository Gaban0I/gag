import { Component, Input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { Batch } from 'src/app/models/interface';
@Component({
  selector: 'app-locked-batch',
  templateUrl: './locked-batch.component.html',
  styleUrls: ['./locked-batch.component.scss'],
  providers: [KeyValuePipe],
})
export class LockedBatchComponent {
  @Input() data!: Batch;
  @Input() isFirst = false;

  get network(): string {
    const parts = this.data.domain.split('.');
    if (parts.length > 1) {
      return parts[1].replace(/_/g, ` `);
    }
    return this.data.domain.replace(/_/g, ' ');
  }
}
