import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewEditRequest } from '../view-edit-request/view-edit-request';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [TranslateModule, ViewEditRequest],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
})
export class RequestsComponent {}
