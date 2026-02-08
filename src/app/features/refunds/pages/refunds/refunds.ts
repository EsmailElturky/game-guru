import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-refunds',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './refunds.html',
  styleUrl: './refunds.scss',
})
export class Refunds {}
