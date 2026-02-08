import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormBaseClassComponent } from './reactive-form-base-class.component';

// Create a test component that extends our base class
@Component({
  template: '',
  standalone: true,
})
class TestComponent extends ReactiveFormBaseClassComponent<string> {}

describe('ReactiveFormBaseClassComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writeValue', () => {
    it('should update the value signal', () => {
      component.writeValue('hello');
      expect(component.value()).toBe('hello');
    });

    it('should allow null values', () => {
      component.writeValue(null as any);
      expect(component.value()).toBeNull();
    });
  });

  describe('registerOnChange()', () => {
    it('should store and invoke the registered onChange callback', () => {
      const spy = jasmine.createSpy();
      component.registerOnChange(spy);
      (component as any).onChange('test-change');
      expect(spy).toHaveBeenCalledWith('test-change');
    });
  });

  describe('registerOnTouched()', () => {
    it('should store and invoke the registered onTouched callback', () => {
      const spy = jasmine.createSpy();
      component.registerOnTouched(spy);
      (component as any).onTouched();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setDisabledState', () => {
    it('should call the setDisabled method with true', () => {
      component.setDisabledState(true);
      expect(component.disabled()).toBeTrue();
    });

    it('should call the setDisabled method with false', () => {
      component.setDisabledState(false);
      expect(component.disabled()).toBeFalse();
    });
  });
});
