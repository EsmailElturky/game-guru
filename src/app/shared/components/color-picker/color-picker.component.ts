import { Component, forwardRef, input, output, model } from '@angular/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';
import { ControlsErrorComponent } from '../controls-error/controls-error.component';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';

@Component({
  selector: 'uiKit-color-picker',
  imports: [
    ColorPickerModule,
    FormsModule,
    InputTextComponent,
    ControlsErrorComponent,
  ],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent extends ReactiveFormBaseClassComponent<string> {
  /**
   * When present, it specifies that the component should have viewHexText state style.
   */
  viewHexText = input<boolean>(false);

  /**
   * When present, it specifies that the component should have hexValue state style.
   */
  hexValue = model<string>('');

  /**
   * ID attribute for the input element.
   */
  readonly inputId = input<string>('uiKit-color-picker');

  // format

  /**
   * When present, it specifies that the component should have appendTo state style.
   */
  readonly appendTo = input<string>('body');

  /**
   * Function to call when the value changes.
   */
  onColorChanged = output<string>();

  /**
   * Function to call when the value changes from input text
   */
  onInputTextChanged(value: string): any {
    // check if the value is valid hex color
    const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;

    if (value && hexRegex.test(value)) {
      this.value.set(value);
    } else {
      this.hexValue.set('');
    }
    this.onColorPickerChange();
  }

  /**
   * Function to call when the value changes.
   */
  onColorPickerChange() {
    setTimeout(() => {
      this.hexValue.set(this.value()!);
    }, 0);
    this.onColorChanged.emit(this.value()!);
    this.onChange(this.value()!);
    this.onTouched();
  }
}
