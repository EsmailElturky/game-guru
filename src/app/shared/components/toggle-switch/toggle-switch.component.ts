import { Component, forwardRef, input, model, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { CommonModule } from '@angular/common';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';
import { ControlsErrorComponent } from '../controls-error/controls-error.component';

@Component({
  selector: 'uiKit-toggle-switch',
  imports: [ToggleSwitch, FormsModule, CommonModule, ControlsErrorComponent],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true,
    },
  ],
})
export class ToggleSwitchComponent extends ReactiveFormBaseClassComponent<boolean> {
  /**
   * Identifier of the input element.
   */
  readonly inputId = input<string>('uiKit-input-witch');

  /**
   * When present, it specifies that the component cannot be edited.
   */
  readonly readonly = input<boolean>(false);

  /**
   * Used to emit the value of the input.
   */
  toggleSwitchChanged = output<boolean>();

  /**
   * Function to call when the value changes (Angular forms API).
   */
  onToggleSwitchChange() {
    const value = this.value() || false;
    this.toggleSwitchChanged.emit(value);
    this.onChange(value);
    this.onTouched();
  }
}
