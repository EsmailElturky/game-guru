import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import Aura from '@primeuix/themes/aura';
import { TabsModule } from 'primeng/tabs';
import { CurrencyCode, MapViewType, TextCaseEnum, ToastType } from 'src/app/shared/enums';
import { ButtonModule } from 'primeng/button';
import { ICheckboxOption, IFileInputError } from 'src/app/shared/interfaces';
import {
  CheckboxComponent,
  ColorPickerComponent,
  FileInputComponent,
  InputNumberComponent,
  InputPasswordComponent,
  InputTextComponent,
  TextAreaComponent,
  ToastComponent,
  ToggleSwitchComponent,
  ButtonComponent,
} from '@EsmailElturky/ui-kit';
import { ToastService } from 'src/app/shared/services';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    ColorPickerComponent,
    InputTextComponent,
    ToggleSwitchComponent,
    TabsModule,
    TextAreaComponent,
    InputPasswordComponent,
    InputNumberComponent,
    CheckboxComponent,
    FileInputComponent,
    ToastComponent,
    ButtonModule,
    ButtonComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  TextCaseEnum = TextCaseEnum;
  CurrencyCode = CurrencyCode;
  ToastType = ToastType;

  checkboxOptions1: ICheckboxOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  checkboxOptions2: ICheckboxOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  checkboxValue = true;
  inputTextValue = '';

  // File input validation configurations
  imageValidation = {
    maxFileSize: 2097152, // 2MB
    maxFiles: 5,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
    minImageWidth: 800,
    minImageHeight: 600,
  };

  documentValidation = {
    maxFileSize: 10485760, // 10MB
    maxFiles: 1,
    allowedFileTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    allowedExtensions: ['.pdf', '.doc', '.docx'],
  };

  multiFileValidation = {
    maxFileSize: 5242880, // 5MB
    maxFiles: 10,
    allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  };

  // Form group with validation
  form = new FormGroup({
    // Basic info
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    inputNumber: new FormControl(undefined, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(120),
    ]),

    // Original demo fields
    colorPicker: new FormControl('#a72727ff', [Validators.required]),
    toggleSwitch: new FormControl(false, [Validators.requiredTrue]),

    textArea: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(120),
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    inputPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(120),
    ]),
    checkbox: new FormControl(['option2'], [Validators.required]),
    checkbox2: new FormControl(['option2'], [Validators.required]),
  });

  // Map properties
  MapViewType = MapViewType;
  viewType = MapViewType.Street;
  constructor(private toastService: ToastService) {
    console.log(Aura);
  }

  // Form submission
  onSubmit() {
    console.log('Form submitted:', this.form.value);
  }

  // Reset form
  onReset() {
    this.form.reset();
  }

  log(event: any) {
    const value = (event.target as HTMLTextAreaElement).value;
    console.log(value);
  }

  // File input event handlers
  onFilesSelected(files: File[], scenario: string): void {
    console.log(`${scenario} - Files selected:`, files);
    this.toastService.addToast(ToastType.Success, 'Success', `${files.length} file(s) selected`);
  }

  onFilesRemoved(files: File[], scenario: string): void {
    console.log(`${scenario} - Files removed:`, files);
    this.toastService.addToast(ToastType.Info, 'Removed', `${files.length} file(s) removed`);
  }

  onUploadCompleted(event: { files: File[]; response: any }, scenario: string): void {
    console.log(`${scenario} - Upload completed:`, event);
    this.toastService.addToast(
      ToastType.Success,
      'Upload Complete',
      `${event.files.length} file(s) uploaded successfully`,
    );
  }

  onUploadProgress(event: { file: File; progress: number }, scenario: string): void {
    console.log(`${scenario} - Upload progress:`, event.progress + '%');
  }

  onFileError(error: IFileInputError, scenario: string): void {
    console.error(`${scenario} - File error:`, error);
    this.toastService.addToast(ToastType.Error, 'File Error', error.message);
  }

  // Toast demo methods
  showSuccessToast(): void {
    this.toastService.addToast(
      ToastType.Success,
      'Success!',
      'Your operation completed successfully',
    );
  }

  showErrorToast(): void {
    this.toastService.addToast(
      ToastType.Error,
      'Error!',
      'Something went wrong. Please try again.',
    );
  }

  showInfoToast(): void {
    this.toastService.addToast(ToastType.Info, 'Information', 'This is an informational message');
  }

  showWarningToast(): void {
    this.toastService.addToast(ToastType.Warning, 'Warning!', 'Please be careful with this action');
  }

  showToastWithAction(): void {
    this.toastService.addToast(
      ToastType.Success,
      'File Uploaded',
      'Your file has been uploaded successfully',
      {
        actionButtonTitle: 'View',
        action: () => {
          console.log('View action clicked');
          this.toastService.addToast(
            ToastType.Info,
            'Action Executed',
            'You clicked the View button',
          );
        },
      },
      undefined,
      true,
      true,
    );
  }

  showStickyToast(): void {
    this.toastService.addToast(
      ToastType.Warning,
      'Sticky Toast',
      'This toast will stay until you close it',
      undefined,
      undefined,
      true,
      true,
    );
  }

  clearAllToasts(): void {
    this.toastService.clear();
  }
}
