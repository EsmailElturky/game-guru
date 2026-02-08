import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputPasswordComponent, ButtonComponent, OtpComponent } from '@EsmailElturky/ui-kit';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/core/services';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  imports: [
    TranslateModule,
    InputPasswordComponent,
    ButtonComponent, 
    ReactiveFormsModule,
    OtpComponent,
    NgClass
  ],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit, OnDestroy {
  private translationService = inject(TranslationService);
  private router = inject(Router);

  language = this.translationService.currentLang;

  step = signal<'otp' | 'password'>('otp');
  email = 'd123agency***@gmail.com'; // This should come from the previous step/state
  timerValue = signal<number>(119); // 1:59 in seconds
  timerDisplay = signal<string>('01:59');
  private timerInterval: any;

  otpForm = new FormGroup({
    otp: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  resetPasswordForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator },
  );

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      if (this.timerValue() > 0) {
        this.timerValue.update((value) => value - 1);
        this.updateTimerDisplay();
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timerValue() / 60);
    const seconds = this.timerValue() % 60;
    this.timerDisplay.set(
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    );
  }

  resendCode() {
    if (this.timerValue() === 0) {
      this.timerValue.set(119);
      this.startTimer();
      console.log('Resending code...');
    }
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      this.step.set('password');
      this.stopTimer();
    }
  }

  passwordMatchValidator(form: any): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword) {
      confirmPassword.setErrors(null);
    }
    return null;
  }

  confirm() {
    if (this.resetPasswordForm.valid) {
      console.log('Password reset confirmed');
      this.router.navigate(['/auth/login']);
    }
  }

  goBack() {
    if (this.step() === 'password') {
      this.resetPasswordForm.reset();
      this.otpForm.reset();
      this.step.set('otp');
      this.startTimer();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
