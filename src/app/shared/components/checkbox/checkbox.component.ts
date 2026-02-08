import { Component, forwardRef, input, output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ICheckboxOption } from '../../interfaces';
import { ControlsErrorComponent } from '../controls-error/controls-error.component';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';

@Component({
  selector: 'uikit-checkbox',
  imports: [CheckboxModule, FormsModule, ControlsErrorComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends ReactiveFormBaseClassComponent<any> {
  /**
   * for single checkbox
   */
  single = input<boolean>(true);

  /**
   * for binary checkbox
   */
  binary = input<boolean>(true);

  /**
   * for single checkbox value
   */
  optionValue = input<any>();

  /**
   * When present, it specifies that the component should have hasError state style.
   */
  hasError = input<boolean>(false);

  /**
   * ID attribute for the input element.
   */
  inputId = input<string>('uiKit-checkbox');

  /**
   * When present, it specifies that the component should have indeterminate state style.
   */
  indeterminate = input<boolean>(false);

  /**
   * When present, it specifies that the component should have readonly state style.
   */
  readonly = input<boolean>(false);

  /**
   * Options for the checkbox.
   */
  options = input<ICheckboxOption[]>([]);

  /**
   * When present, it specifies that the component should have horizontal state style.
   */
  horizontal = input<boolean>(false);

  /**
   * When present, used if you used single checkbox in group of options
   */
  name = input<string>('');

  /**
   * Event emitted when the value changes.
   * This event is emitted when the input value changes, either through user input or programmatically.
   * It allows the parent component to react to changes in the input value.
   */
  checkboxChange = output<any>();

  onValueChanged(): void {
    this.onChange(this.value()!);
    this.onTouched();
  }
}
