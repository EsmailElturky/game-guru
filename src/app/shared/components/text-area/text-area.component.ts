import { Component, forwardRef, inject, input, output } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlsErrorComponent } from '../controls-error/controls-error.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { IInputStyle } from '../../interfaces';
import { TextCaseEnum } from '../../enums';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'uikit-text-area',
  imports: [TextareaModule, ControlsErrorComponent, FormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent extends ReactiveFormBaseClassComponent<string> {
  /**
   * Configuration object.
   */
  // config = inject(UIKIT_UIKitConfig_TOKEN, { optional: true });
  /**
   * When present, it represents the id of the form control.
   */
  id = input<string>('uikit-text-area');

  /**
   * When present, it represents the name of the form control.
   */
  name = input<string>('uikit-text-area');

  /**
   * When present, it represents the style of the form control.
   */
  style = input<IInputStyle>();

  /**
   * When present, it represents the placeholder of the form control.
   */
  placeholder = input<string>('');

  /**
   * When present, it represents the name of the form control.
   */
  hasError = input<boolean>(false);

  /**
   * When present, it represents the maximum length of the form control.
   */
  maxLength = input<number>(1000);

  /**
   * When present, it represents the readonly state of the form control.
   */
  readonly = input<boolean>(false);

  /**
   * When present, it represents the number of rows of the form control.
   */
  rows = input<number>(3);

  /**
   * When present, it represents the spellcheck state of the form control.
   */
  allowSpellCheck = input<boolean>(true);

  /**
   * When present, it represents the paste state of the form control.
   */
  allowPaste = input<boolean>(true);

  /**
   * Whether the input is autocomplete.
   */
  autocomplete = input<boolean>(false);

  /**
   * Text case of the input.
   */
  textCase = input<TextCaseEnum>(TextCaseEnum.Mixed);

  /**
   * When present, it represents the emit on blur state of the form control.
   */
  emitOnBlur = input<boolean>(true);

  /**
   * When present, it represents the show counter state of the form control.
   */
  isShowCounter = input<boolean>(true);

  /**
   * When present, it represents the input text changed event of the form control.
   */
  inputTextChanged = output<string>();

  /**
   * When present, it represents the input text changed event of the form control.
   */
  inputTextBlured = output<string>();

  /**
   * When present, it represents the input text changed event of the form control.
   */
  textChanged = new Subject<string>();

  constructor() {
    super();
    /**
     * Subscribe to the textChanged event and emit the input text value after 400ms of last change.
     */
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
   * Emit the input text value.
   */
  emitInputTextValue(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    let value = (target.value || '').trim();
    switch (this.textCase()) {
      case TextCaseEnum.LowerCase:
        value = value.toLowerCase();
        break;
      case TextCaseEnum.UpperCase:
        value = value.toUpperCase();
        break;
      case TextCaseEnum.Mixed:
        value = value;
        break;
    }
    this.value.set(value);
    if (!this.emitOnBlur()) {
      this.textChanged.next(value);
    }
  }

  /**
   * Emit the input text value on blur.
   */
  onBlur(): void {
    this.value.set((this.value() || '').trim());
    this.inputTextBlured.emit(this.value()!);
    if (this.emitOnBlur()) {
      this.textChanged.next(this.value()!);
    }
  }
}
