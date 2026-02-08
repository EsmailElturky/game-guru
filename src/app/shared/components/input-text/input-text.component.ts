import { Component, forwardRef, inject, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { TextCaseEnum } from '../../enums';
import { NgClass, NgStyle } from '@angular/common';
import { IInputStyle } from '../../interfaces';
import { textCaseTransform } from '../../functions/text-case-transform';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';
// import { UIKIT_UIKitConfig_TOKEN } from '../../config/ui-kit-token';
import { ControlsErrorComponent } from '../controls-error/controls-error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'uiKit-input-text',
  imports: [
    FormsModule,
    InputTextModule,
    NgClass,
    NgStyle,
    ControlsErrorComponent,
  ],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent extends ReactiveFormBaseClassComponent<string> {
  /**
   * Configuration object.
   */
  // config = inject(UIKIT_UIKitConfig_TOKEN, { optional: true });

  /**
   * This is used to link the input with a label or for accessibility purposes.
   */
  inputId = input<string>('uiKit-input-text');

  /**
   * This is used to identify the input in forms and for accessibility purposes.
   * It is also used to link the input with a label.
   */
  inputName = input<string>('uiKit-input-text');

  /**
   * It is used to provide a hint to the user about what to enter in the input.
   */
  placeholder = input<string>('');

  /**
   * It prevents the user from changing the value of the input.
   */
  readonly = input<boolean>(false);

  /**
   * This can be used to conditionally show or hide the input.
   */
  hidden = input<boolean>(false);

  /**
   * It is used to enable or disable spell checking in the input.
   * It is useful for text inputs where spell checking is desired.
   */
  allowSpellCheck = input<boolean>(true);

  /**
   * It is useful for limiting the number of characters that can be entered.
   * The default value is set to 250 characters, but this can be changed as needed
   */
  maxLength = input<number>(250);

  /**
   * This is useful for text inputs where pasting is allowed.
   * It is set to true by default, allowing users to paste text into the input.
   */
  allowPaste = input<boolean>(true);

  /**
   * This is useful for scenarios where you want to capture the value only when the user has finished editing.
   * It is set to true by default, meaning the value will be emitted on blur
   */
  emitOnBlur = input<boolean>(true);

  /**
   * This is useful for scenarios where you want to allow users to edit the text inline.
   * It is set to false by default, meaning inline editing is not enabled.
   */
  inline = input<boolean>(false);

  /**
   * This is useful for scenarios where you want to apply custom styles to the input.
   * It allows you to set properties like color, background color, border color, font size, and font weight.
   */
  style = input<IInputStyle>();

  /**
   * This is useful for scenarios where you want to apply a borderless style to the input.
   * It is set to false by default, meaning the input will have a border.
   */
  withoutBorder = input<boolean>(false);

  /**
   * This is useful for scenarios where you want to allow users to search the text.
   * It is set to false by default, meaning search is not enabled.
   */
  isSearchable = input<boolean>(false);

  /**
   * This is useful for scenarios where you want to allow users to clear the text.
   * It is set to false by default, meaning clear is not enabled.
   */
  showClear = input<boolean>(false);

  /**
   * When present, it specifies that the component should have error state style.
   */

  hasError = input<boolean>(false);

  /**
   * Text case of the input.
   */
  textCase = input<TextCaseEnum>(TextCaseEnum.Mixed);

  /**
   * Event emitted when the value changes.
   * This event is emitted when the input value changes, either through user input or programmatically.
   * It allows the parent component to react to changes in the input value.
   */
  inputTextChanged = output<string>();

  /**
   * Event emitted when the input is blurred.
   * This event is emitted when the input loses focus, allowing the parent component to react to the blur event.
   * It is useful for scenarios where you want to perform actions when the user has finished editing
   */
  inputTextBlured = output<string>();

  /**
   * Subject used to emit input value changes.
   * This subject is used to emit input value changes to the parent component.
   * It is used to emit input value changes to the parent component.
   */
  textChanged = new Subject<string>();

  /**
   * Enum for text case.
   */
  TextCaseEnum = TextCaseEnum;

  constructor() {
    super();
    this.textChanged
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        value = value.trim();
        this.inputTextChanged.emit(value);
        this.onChange(value);
        this.onTouched();
      });
  }

  /**
   * this simple function created for emitting input mask value to the parent while typing
   * @param value text written in input mask
   */
  emitInputTextValue(value: string): void {
    value = value.trim();
    this.value.set(value);
    // convert text case
    if (this.value()) {
      this.value.set(textCaseTransform(value, this.textCase()));
    }

    if (!this.emitOnBlur()) {
      this.textChanged.next(value);
    }
  }

  /**
   * this simple function created for emitting input value to the parent on blur
   */

  onBlur(): void {
    this.value.set((this.value() || '').trim());
    // convert text case
    if (this.value()) {
      this.value.set(textCaseTransform(this.value()!, this.textCase()));
    }

    this.inputTextBlured.emit(this.value()!);
    if (this.emitOnBlur()) {
      this.textChanged.next(this.value()!);
    }
  }

  /**
   * this simple function created for clear input text
   * @returns removes input value
   */
  removeText(): void {
    this.value.set('');
    this.textChanged.next(this.value()!);
  }
}
