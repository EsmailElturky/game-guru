import { Component, forwardRef, input, output } from '@angular/core';
import { InputNumber, InputNumberInputEvent } from 'primeng/inputnumber';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';
import { FormsModule } from '@angular/forms';
import { ControlsErrorComponent } from '../controls-error/controls-error.component';
import { CurrencyCode } from '../../enums';
import { IInputStyle } from '../../interfaces';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ArabicToEnglishDirective } from '../../directives';

@Component({
  selector: 'uikit-input-number',
  imports: [
    InputNumber,
    FormsModule,
    ControlsErrorComponent,
    ArabicToEnglishDirective,
  ],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent extends ReactiveFormBaseClassComponent<number> {
  /**
   * This is used to identify the input in forms and for accessibility purposes.
   */
  inputId = input<string>('uikit-input-number');

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  placeholder = input<string>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  readonly = input<boolean>(false);

  /**
   * This is used to identify the input in forms and for accessibility purposes.
   */
  inputName = input<string>('uikit-input-number');

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  currency = input<CurrencyCode>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  minFractionDigits = input<number>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  maxFractionDigits = input<number>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  useGrouping = input<boolean>(false);

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  style = input<IInputStyle>();

  /**
   * When present, it specifies that the component should have error state style.
   */
  hasError = input<boolean>(false);

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  min = input<number>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  max = input<number>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  maxlength = input<number | null>(null);

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  prefix = input<string>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  suffix = input<string>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  showButtons = input<boolean>(true);

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  step = input<number>(1);

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  showClear = input<boolean>(false);

  /**
   * When present, it emits the value on blur.
   */
  emitOnBlur = input<boolean>(true);

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  inputNumberChanged = output<number>();

  /**
   * It is useful for scenarios where you want to show currency symbol.
   */
  inputNumberBlured = output<number>();

  /**
   * Subject used to emit input value changes.
   * This subject is used to emit input value changes to the parent component.
   */
  numberChanged = new Subject<number>();

  constructor() {
    super();
    this.numberChanged
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        this.inputNumberChanged.emit(value);
        this.onChange(value);
        this.onTouched();
      });
  }

  onInputChange(): void {
    if (!this.emitOnBlur()) {
      this.numberChanged.next(this.value()!);
    }
  }

  onBlur(): void {
    this.inputNumberBlured.emit(this.value()!);
    if (this.emitOnBlur()) {
      this.numberChanged.next(this.value()!);
    }
  }
}
