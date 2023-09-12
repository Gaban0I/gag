import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.errorType = '404';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the correct error message for type 404', () => {
    expect(component.message).toBe("Cette page n'existe pas");
  });

  it('should set the correct error type for 404', () => {
    expect(component.type).toBe('404');
  });

  it('should set the correct class container for 404', () => {
    expect(component.class_container).toBe('e404_container');
  });

  it('should set the correct background class for 404', () => {
    expect(component.class_background).toBe('boy');
  });

  it('should set the correct background image for 404', () => {
    expect(component.background_img).toBe(
      '../../../assets/images/casqueVR-3840x2560.jpg'
    );
  });

  it('should set the correct class message for 404', () => {
    expect(component.class_message).toBe('e404_message');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle invalid error code', () => {
    component.errorType = 'invalid';
    component.ngOnInit();

    expect(component.message).toBe('');
    expect(component.type).toBe('');
    expect(component.class_container).toBe('');
    expect(component.class_background).toBe('');
    expect(component.background_img).toBe('');
    expect(component.class_message).toBe('');
  });
});
