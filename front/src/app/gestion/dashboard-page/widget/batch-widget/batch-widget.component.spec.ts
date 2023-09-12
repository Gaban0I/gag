import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchWidgetComponent } from './batch-widget.component';

describe('BatchWidgetComponent', () => {
  let component: BatchWidgetComponent;
  let fixture: ComponentFixture<BatchWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
