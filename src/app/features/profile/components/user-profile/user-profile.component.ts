import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  FileInputComponent,
  InputTextComponent,
  TextAreaComponent,
} from '@EsmailElturky/ui-kit';
import { IFileValidation } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    InputTextComponent,
    TextAreaComponent,
    FileInputComponent,
    ButtonComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  profileForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    profileImage: new FormControl<File[]>([]),
  });

  fileValidation: IFileValidation = {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png'],
  };

  save() {
    console.log(this.profileForm.value);
  }
}
