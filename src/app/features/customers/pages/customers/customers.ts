import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {}
