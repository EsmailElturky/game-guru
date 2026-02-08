import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, InputPasswordComponent } from '@EsmailElturky/ui-kit';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, InputPasswordComponent, ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  form = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { newPassword, confirmPassword } = this.form.value;
    if (newPassword !== confirmPassword) {
      this.form.controls['confirmPassword'].setErrors({ passwordMismatch: true });
      return;
    }
    console.log(this.form.value);
  }
}
