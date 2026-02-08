import {
  Component,
  forwardRef,
  input,
  output,
  ViewChild,
  ElementRef,
  signal,
  effect,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { Subject } from 'rxjs';
import { ReactiveFormBaseClassComponent } from '../classes/reactive-form-base-class/reactive-form-base-class.component';
import {
  IFileValidation,
  IFilePreview,
  IFileInputError,
} from '../../interfaces';
import { FileInputErrorEnum, FilePreviewTypeEnum } from '../../enums';
import { FileUtils } from '../../functions/file-utils';
import { ToastService } from '../../services/toaster/toaster.service';
import { ToastType } from '../../enums';
import { FileSizePipe } from '../../pipes/file-size.pipe';

@Component({
  selector: 'uikit-file-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    TooltipModule,
    FileSizePipe,
  ],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
})
export class FileInputComponent
  extends ReactiveFormBaseClassComponent<File[]>
  implements OnInit, OnDestroy
{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  inputId = input<string>('uikit-file-input');
  inputName = input<string>('uikit-file-input');
  placeholder = input<string>('Choose files or drag and drop');
  multiple = input<boolean>(true);
  showPreview = input<boolean>(true);
  showFileList = input<boolean>(true);
  dragDropEnabled = input<boolean>(true);
  validation = input<IFileValidation>();
  errorMessages = input<{ [key in FileInputErrorEnum]?: string }>();
  showToaster = input<boolean>(true);
  autoUpload = input<boolean>(false);
  uploadUrl = input<string>();
  uploadHeaders = input<{ [key: string]: string }>();
  uploadParams = input<{ [key: string]: any }>();
  readonly = input<boolean>(false);
  hasError = input<boolean>(false);

  filesSelected = output<File[]>();
  filesRemoved = output<File[]>();
  uploadStarted = output<File[]>();
  uploadProgress = output<{ file: File; progress: number }>();
  uploadCompleted = output<{ files: File[]; response: any }>();
  errorOccurred = output<IFileInputError>();

  filePreviews = signal<IFilePreview[]>([]);
  isDraggingOver = signal<boolean>(false);
  isUploading = signal<boolean>(false);

  FilePreviewTypeEnum = FilePreviewTypeEnum;

  private toastService = inject(ToastService);
  private destroy$ = new Subject<void>();

  constructor() {
    super();

    effect(() => {
      const previews = this.filePreviews();
      const files = previews.map((p) => p.file);
      this.value.set(files);
      this.onChange(files);
    });
  }

  ngOnInit(): void {
    if (this.value() && this.value()!.length > 0) {
      this.initializeExistingFiles(this.value()!);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.filePreviews().forEach((preview) => {
      if (preview.previewUrl) {
        URL.revokeObjectURL(preview.previewUrl);
      }
    });
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    if (files.length === 0) {
      this.emitError({
        type: FileInputErrorEnum.NO_FILE_SELECTED,
        message: this.getErrorMessage(FileInputErrorEnum.NO_FILE_SELECTED),
      });
      return;
    }

    await this.processFiles(files);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    if (!this.dragDropEnabled() || this.readonly()) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver.set(false);
  }

  async onDrop(event: DragEvent): Promise<void> {
    if (!this.dragDropEnabled() || this.readonly()) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver.set(false);

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length > 0) {
      await this.processFiles(files);
    }
  }

  private async processFiles(files: File[]): Promise<void> {
    const currentPreviews = this.filePreviews();

    if (!this.multiple() && currentPreviews.length + files.length > 1) {
      this.emitError({
        type: FileInputErrorEnum.MAX_FILES_EXCEEDED,
        message: this.getErrorMessage(FileInputErrorEnum.MAX_FILES_EXCEEDED),
      });
      this.showToasterMessage({
        severity: 'error',
        summary: 'Error',
        detail: 'Only one file is allowed',
      });
      return;
    }

    const maxFiles = this.validation()?.maxFiles;
    if (maxFiles && currentPreviews.length + files.length > maxFiles) {
      this.emitError({
        type: FileInputErrorEnum.MAX_FILES_EXCEEDED,
        message: this.getErrorMessage(FileInputErrorEnum.MAX_FILES_EXCEEDED),
      });
      this.showToasterMessage({
        severity: 'error',
        summary: 'Error',
        detail: `Maximum ${maxFiles} files allowed`,
      });
      return;
    }

    const newPreviews: IFilePreview[] = [];
    const validFiles: File[] = [];

    for (const file of files) {
      const validationError = FileUtils.validateFile(file, this.validation());

      if (validationError) {
        this.emitError(validationError);
        this.showToasterMessage({
          severity: 'error',
          summary: 'File Error',
          detail: validationError.message,
        });
        continue;
      }

      const isValid = await FileUtils.checkFileIntegrity(file);
      if (!isValid) {
        this.emitError({
          type: FileInputErrorEnum.CORRUPT_FILE,
          message: `File ${file.name} appears to be corrupt`,
          file,
        });
        this.showToasterMessage({
          severity: 'error',
          summary: 'File Error',
          detail: `File ${file.name} appears to be corrupt`,
        });
        continue;
      }

      const preview = await FileUtils.createFilePreview(file);

      if (
        preview.previewType === FilePreviewTypeEnum.IMAGE &&
        preview.dimensions
      ) {
        const dimensionError = FileUtils.validateImageDimensions(
          preview.dimensions,
          this.validation()
        );

        if (dimensionError) {
          this.emitError(dimensionError);
          this.showToasterMessage({
            severity: 'error',
            summary: 'Image Error',
            detail: dimensionError.message,
          });
          continue;
        }
      }

      newPreviews.push(preview);
      validFiles.push(file);
    }

    if (newPreviews.length > 0) {
      this.filePreviews.set([...currentPreviews, ...newPreviews]);
      this.filesSelected.emit(validFiles);

      this.showToasterMessage({
        severity: 'success',
        summary: 'Success',
        detail: `${validFiles.length} file(s) selected`,
      });

      if (this.autoUpload() && this.uploadUrl()) {
        this.uploadFiles(validFiles);
      }
    }
  }

  removeFile(index: number): void {
    const previews = this.filePreviews();
    const preview = previews[index];

    if (preview.previewUrl) {
      URL.revokeObjectURL(preview.previewUrl);
    }

    const updatedPreviews = previews.filter((_, i) => i !== index);
    this.filePreviews.set(updatedPreviews);

    this.filesRemoved.emit([preview.file]);

    this.showToasterMessage({
      severity: 'info',
      summary: 'File Removed',
      detail: `${preview.name} has been removed`,
    });
  }

  clearAll(): void {
    this.filePreviews().forEach((preview) => {
      if (preview.previewUrl) {
        URL.revokeObjectURL(preview.previewUrl);
      }
    });

    this.filePreviews.set([]);
    this.filesRemoved.emit(this.value() || []);

    this.showToasterMessage({
      severity: 'info',
      summary: 'Cleared',
      detail: 'All files have been removed',
    });
  }

  uploadFiles(files?: File[]): void {
    const filesToUpload = files || this.filePreviews().map((p) => p.file);

    if (filesToUpload.length === 0) {
      this.emitError({
        type: FileInputErrorEnum.NO_FILE_SELECTED,
        message: this.getErrorMessage(FileInputErrorEnum.NO_FILE_SELECTED),
      });
      return;
    }

    if (!this.uploadUrl()) {
      this.emitError({
        type: FileInputErrorEnum.UPLOAD_FAILED,
        message: 'Upload URL is not configured',
      });
      return;
    }

    this.isUploading.set(true);
    this.uploadStarted.emit(filesToUpload);

    const formData = new FormData();

    filesToUpload.forEach((file) => {
      formData.append('files', file);
    });

    if (this.uploadParams()) {
      Object.entries(this.uploadParams()!).forEach(([key, value]) => {
        formData.append(key, JSON.stringify(value));
      });
    }

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        filesToUpload.forEach((file) => {
          this.uploadProgress.emit({ file, progress });
          this.updatePreviewProgress(file, progress);
        });
      }
    });

    xhr.addEventListener('load', () => {
      this.isUploading.set(false);

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          this.uploadCompleted.emit({ files: filesToUpload, response });

          this.showToasterMessage({
            severity: 'success',
            summary: 'Upload Complete',
            detail: `${filesToUpload.length} file(s) uploaded successfully`,
          });
          filesToUpload.forEach((file) => {
            this.updatePreviewProgress(file, 100);
          });
        } catch {
          this.uploadCompleted.emit({ files: filesToUpload, response: null });
        }
      } else {
        this.emitError({
          type: FileInputErrorEnum.UPLOAD_FAILED,
          message: `Upload failed with status ${xhr.status}`,
        });

        this.showToasterMessage({
          severity: 'error',
          summary: 'Upload Failed',
          detail: `Upload failed with status ${xhr.status}`,
        });
      }
    });

    xhr.addEventListener('error', () => {
      this.isUploading.set(false);
      this.emitError({
        type: FileInputErrorEnum.UPLOAD_FAILED,
        message: 'Upload failed due to network error',
      });

      this.showToasterMessage({
        severity: 'error',
        summary: 'Upload Failed',
        detail: 'Upload failed due to network error',
      });
      filesToUpload.forEach((file) => {
        this.updatePreviewProgress(file, 0, true);
      });
    });

    if (this.uploadHeaders()) {
      Object.entries(this.uploadHeaders()!).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });
    }

    xhr.open('POST', this.uploadUrl()!);
    xhr.send(formData);
  }

  updatePreviewProgress(file: File, progress: number, failed?: boolean): void {
    this.filePreviews.update((previews) => {
      return previews.map((preview) => {
        if (preview.file === file) {
          return {
            ...preview,
            uploadProgress: failed ? 0 : progress,
            uploadStatus: failed
              ? 'error'
              : progress === 100
              ? 'success'
              : 'uploading',
          };
        }
        return preview;
      });
    });
  }

  triggerFileInput(): void {
    if (!this.readonly()) {
      this.fileInput.nativeElement.click();
    }
  }

  getErrorMessage(errorType: FileInputErrorEnum): string {
    return (
      this.errorMessages()?.[errorType] ||
      FileUtils.getDefaultErrorMessage(errorType)
    );
  }

  private async initializeExistingFiles(files: File[]): Promise<void> {
    const previews: IFilePreview[] = [];

    for (const file of files) {
      const preview = await FileUtils.createFilePreview(file);
      previews.push(preview);
    }

    this.filePreviews.set(previews);
  }

  private emitError(error: IFileInputError): void {
    this.errorOccurred.emit(error);
  }

  private showToasterMessage(message: {
    severity: 'success' | 'error' | 'info' | 'warn';
    summary: string;
    detail: string;
  }): void {
    if (this.showToaster()) {
      const toastType = {
        success: ToastType.Success,
        error: ToastType.Error,
        info: ToastType.Info,
        warn: ToastType.Warning,
      }[message.severity];

      this.toastService.addToast(toastType, message.summary, message.detail);
    }
  }
}
