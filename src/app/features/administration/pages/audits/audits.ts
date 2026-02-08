import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-audits',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './audits.html',
  styleUrl: './audits.scss',
})
export class Audits {}
