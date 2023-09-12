import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedBatchComponent } from './locked-batch.component';

describe('LockedBatchComponent', () => {
  let component: LockedBatchComponent;
  let fixture: ComponentFixture<LockedBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedBatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockedBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
