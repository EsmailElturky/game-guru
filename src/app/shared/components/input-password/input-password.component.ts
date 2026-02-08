import { Component, forwardRef, inject, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { NgStyle } from '@angular/common';
import { IInputStyle } from '../../interfaces';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';
// import { UIKIT_UIKitConfig_TOKEN } from '../../config/ui-kit-token';
import { ControlsErrorComponent } from '../controls-error/controls-error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'uikit-input-password',
  imports: [FormsModule, PasswordModule, NgStyle, ControlsErrorComponent],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
})
export class InputPasswordComponent extends ReactiveFormBaseClassComponent<string> {
  /**
   * Configuration object.
   */
  // config = inject(UIKIT_UIKitConfig_TOKEN, { optional: true });

  /**
   * This is used to link the input with a label or for accessibility purposes.
   */
  inputId = input<string>('uikit-input-password');

  /**
   * This is used to identify the input in forms and for accessibility purposes.
   * It is also used to link the input with a label.
   */
  inputName = input<string>('uikit-input-password');

  /**
   * It is used to provide a hint to the user about what to enter in the input.
   */
  placeholder = input<string>('');

  /**
   * It is used to show clear button.
   */
  showClear = input<boolean>(false);

  /**
   * This can be used to conditionally show or hide the input.
   */
  hidden = input<boolean>(false);

  /**
   * It is useful for limiting the number of characters that can be entered.
   * The default value is set to 250 characters, but this can be changed as needed
   */
  maxLength = input<number>(250);

  /**
   * This is useful for scenarios where you want to capture the value only when the user has finished editing.
   * It is set to true by default, meaning the value will be emitted on blur
   */
  emitOnBlur = input<boolean>(true);

  /**
   * It is useful for scenarios where you want to show feedback about the password strength.
   */
  feedback = input<boolean>(false);

  /**
   * It is useful for scenarios where you want to show toggle mask button.
   */
  toggleMask = input<boolean>(true);

  /**
   * This is useful for scenarios where you want to apply custom styles to the input.
   * It allows you to set properties like color, background color, border color, font size, and font weight.
   */
  style = input<IInputStyle>();

  /**
   * When present, it specifies that the component should have error state style.
   */
  hasError = input<boolean>(false);

  /**
   * Event emitted when the value changes.
   * This event is emitted when the input value changes, either through user input or programmatically.
   * It allows the parent component to react to changes in the input value.
   */
  inputPasswordChanged = output<string>();

  /**
   * Event emitted when the input is blurred.
   * This event is emitted when the input loses focus, allowing the parent component to react to the blur event.
   * It is useful for scenarios where you want to perform actions when the user has finished editing
   */
  inputPasswordBlured = output<string>();

  /**
   * Subject used to emit input value changes.
   * This subject is used to emit input value changes to the parent component.
   */
  passwordChanged = new Subject<string>();

  constructor() {
    super();
    this.passwordChanged
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        value = value.trim();
        this.inputPasswordChanged.emit(value);
        this.onChange(value);
        this.onTouched();
      });
  }

  /**
   * Handle input change event
   * @param event input event
   */
  onInputChange(): void {
    if (!this.emitOnBlur()) {
      this.passwordChanged.next(this.value()!);
    }
  }

  /**
   * Handle input blur event
   */
  onBlur(): void {
    this.inputPasswordBlured.emit(this.value()!);
    if (this.emitOnBlur()) {
      this.passwordChanged.next(this.value()!);
    }
  }
}
