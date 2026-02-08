import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextComponent, InputPasswordComponent, ButtonComponent } from '@EsmailElturky/ui-kit';
import {
  FormGroup,
  FormControl,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services';
@Component({
  selector: 'app-login',
  imports: [
    TranslateModule,
    InputTextComponent,
    InputPasswordComponent,
    ButtonComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private translateService = inject(TranslationService);
  private router = inject(Router);

  language = this.translateService.currentLang;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forget-password']);
  }
}
