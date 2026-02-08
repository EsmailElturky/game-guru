import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'primeng/tabs';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { RequestsComponent } from '../../components/requests/requests.component';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-profile',
  imports: [
    TranslateModule,
    TabsModule,
    UserProfileComponent,
    ChangePasswordComponent,
    RequestsComponent,
    NotificationComponent,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  tabs = signal([
    { label: 'profile.userProfile', value: '0' },
    { label: 'profile.changePassword', value: '1' },
    { label: 'profile.requests', value: '2' },
    { label: 'profile.notification', value: '3' },
  ]);
}
