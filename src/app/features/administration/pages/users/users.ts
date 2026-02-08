import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {}
