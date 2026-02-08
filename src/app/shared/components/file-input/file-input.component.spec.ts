import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileInputComponent } from './file-input.component';
import { FilePreviewTypeEnum } from '../../enums';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file selection', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const event = new Event('change');
    Object.defineProperty(event.target, 'files', {
      value: [file],
      writable: false,
    });

    await component.onFileSelected(event);
    expect(component.filePreviews().length).toBeGreaterThan(0);
  });

  it('should remove file', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    component.filePreviews.set([
      {
        file,
        previewType: FilePreviewTypeEnum.UNKNOWN,
        size: file.size,
        name: file.name,
        mimeType: file.type,
        uploadStatus: 'pending',
      },
    ]);

    component.removeFile(0);
    expect(component.filePreviews().length).toBe(0);
  });

  it('should clear all files', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    component.filePreviews.set([
      {
        file,
        previewType: FilePreviewTypeEnum.UNKNOWN,
        size: file.size,
        name: file.name,
        mimeType: file.type,
        uploadStatus: 'pending',
      },
    ]);

    component.clearAll();
    expect(component.filePreviews().length).toBe(0);
  });
});
