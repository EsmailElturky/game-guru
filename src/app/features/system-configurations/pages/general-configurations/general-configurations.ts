import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent, InputTextComponent } from '@EsmailElturky/ui-kit';

@Component({
  selector: 'app-general-configurations',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, InputTextComponent, ButtonComponent],
  templateUrl: './general-configurations.html',
  styleUrl: './general-configurations.scss',
})
export class GeneralConfigurations {
  configForm = new FormGroup({
    pointValue: new FormControl('100', Validators.required),
    refundMoreThan3Days: new FormControl('100%', Validators.required),
    refund3To1Day: new FormControl('80%', Validators.required),
    refundSameDay: new FormControl('50%', Validators.required),
    refundBefore1Hour: new FormControl('0%', Validators.required),
    fixedMonthly: new FormControl('500 SR', Validators.required),
    fixedYearly: new FormControl('5000 SR', Validators.required),
    fixedMonthlyAndPercentageAmount: new FormControl('1000 SR', Validators.required),
    fixedMonthlyAndPercentagePercent: new FormControl('60%', Validators.required),
    fixedYearlyAndPercentageAmount: new FormControl('1000 SR', Validators.required),
    fixedYearlyAndPercentagePercent: new FormControl('60%', Validators.required),
  });

  save() {
    if (this.configForm.valid) {
      console.log(this.configForm.value);
    }
  }

  ngOnInit(): void {
    this.configForm.disable();
  }
}
