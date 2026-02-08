import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './managers.html',
  styleUrl: './managers.scss',
})
export class Managers {}
