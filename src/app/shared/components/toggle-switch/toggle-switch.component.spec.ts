import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSwitchComponent } from './toggle-switch.component';
import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

describe('ToggleSwitchComponent', () => {
  let component: ToggleSwitchComponent;
  let fixture: ComponentFixture<ToggleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('NG_VALUE_ACCESSOR provider', () => {
    it('should register component with NG_VALUE_ACCESSOR using forwardRef', () => {
      // Get the component metadata from its constructor
      const componentMetadata = (ToggleSwitchComponent as any)
        .__annotations__[0];

      // Find the NG_VALUE_ACCESSOR provider
      const ngValueAccessorProvider = componentMetadata.providers.find(
        (provider: any) => provider.provide === NG_VALUE_ACCESSOR
      );

      // Verify the provider exists
      expect(ngValueAccessorProvider).toBeTruthy();
      expect(ngValueAccessorProvider.multi).toBe(true);

      // Create a sample forwardRef for comparison
      const sampleForwardRef = forwardRef(() => ToggleSwitchComponent);

      // The useExisting property should be a forwardRef function
      expect(typeof ngValueAccessorProvider.useExisting).toBe('function');
      expect(typeof sampleForwardRef).toBe('function');

      // Execute the forwardRef function and verify it returns the ToggleSwitchComponent
      const result = ngValueAccessorProvider.useExisting();
      expect(result).toBe(ToggleSwitchComponent);
    });
  });

  describe('writeValue', () => {
    it('should update the value signal', () => {
      component.writeValue(true);
      expect(component.value()).toBe(true);
    });
  });

  describe('registerOnChange()', () => {
    it('should store and invoke the registered onChange callback', () => {
      const spy = jest.fn();
      component.registerOnChange(spy);
      (component as any).onChange(true);
      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  describe('registerOnTouched()', () => {
    it('should store and invoke the registered onTouched callback', () => {
      const spy = jest.fn();
      component.registerOnTouched(spy);
      (component as any).onTouched();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setDisabledState', () => {
    it('should call the setDisabled method with true', () => {
      component.setDisabledState(true);
      expect(component.disabled()).toBe(true);
    });

    it('should call the setDisabled method with false', () => {
      component.setDisabledState(false);
      expect(component.disabled()).toBe(false);
    });
  });

  describe('onToggleSwitchChange', () => {
    it('should call the onChange callback with the current value', () => {
      const spy = jest.fn();
      component.registerOnChange(spy);
      component.onToggleSwitchChange();
      expect(spy).toHaveBeenCalledWith(component.value());
    });
  });
});
