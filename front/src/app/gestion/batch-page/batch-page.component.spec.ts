import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchPageComponent } from './batch-page.component';

describe('BatchPageComponent', () => {
  let component: BatchPageComponent;
  let fixture: ComponentFixture<BatchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
