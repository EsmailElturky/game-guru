import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Component, inject, input, model } from '@angular/core';

@Component({
  template: '',
})
export abstract class ReactiveFormBaseClassComponent<T>
  implements ControlValueAccessor
{
  private controlContainer = inject(ControlContainer, { optional: true });
  /**
   * Current value of the input (model signal).
   */
  value = model<T | null>();

  /**
   * When present, it specifies that the component should have disabled state style.
   */
  disabled = model<boolean>(false);

  /**
   * When present, it represents the name of the form control.
   */
  formControlName = input<string | null>(null);

  /**
   * FormGroup instance of the parent wrapper
   */
  get form() {
    if (!this.formControlName()) {
      return null;
    }
    return this.controlContainer!.control! as FormGroup | null;
  }

  /**
   * FormControl instance used to capture the value and state of the input.
   */
  get control() {
    if (!this.formControlName()) {
      return null;
    }
    return this.form?.get(this.formControlName()!) as FormControl | null;
  }

  /**
   * Function to call when the value changes (Angular forms API).
   */
  protected onChange: (_: T) => void = () => {};

  /**
   * Function to call when the input is touched (Angular forms API).
   */
  protected onTouched: () => void = () => {};

  /**
   * Writes a new value to the element.
   */
  writeValue(value: T): void {
    this.value.set(value);
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that is called when the control is touched.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the input.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
