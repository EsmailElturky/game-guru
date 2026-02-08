import { Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ControlError } from '../../enums';

@Component({
  selector: 'uiKit-controls-error',
  imports: [],
  templateUrl: './controls-error.component.html',
  styleUrl: './controls-error.component.scss',
})
export class ControlsErrorComponent {
  error = input<ValidationErrors | null>();
  ControlError = ControlError;
}
