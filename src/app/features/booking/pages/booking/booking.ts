import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextComponent } from '@EsmailElturky/ui-kit';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [TranslateModule, InputTextComponent],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {}
