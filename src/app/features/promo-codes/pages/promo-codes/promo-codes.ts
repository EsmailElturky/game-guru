import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-promo-codes',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './promo-codes.html',
  styleUrl: './promo-codes.scss',
})
export class PromoCodes {}
