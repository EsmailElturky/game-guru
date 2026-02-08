import { FileInputErrorEnum, FilePreviewTypeEnum } from '../enums';
import { IFileValidation, IFileInputError, IFilePreview } from '../interfaces';

/**
 * File utility functions for file input handling
 */
export class FileUtils {
  /**
   * Get file preview type based on MIME type
   */
  static getPreviewType(mimeType: string): FilePreviewTypeEnum {
    if (mimeType.startsWith('image/')) {
      return FilePreviewTypeEnum.IMAGE;
    }
    if (mimeType.startsWith('video/')) {
      return FilePreviewTypeEnum.VIDEO;
    }
    if (mimeType.startsWith('audio/')) {
      return FilePreviewTypeEnum.AUDIO;
    }
    if (
      mimeType.includes('pdf') ||
      mimeType.includes('word') ||
      mimeType.includes('sheet') ||
      mimeType.includes('presentation')
    ) {
      return FilePreviewTypeEnum.DOCUMENT;
    }
    return FilePreviewTypeEnum.UNKNOWN;
  }

  /**
   * Get file extension from file name
   */
  static getFileExtension(fileName: string): string {
    const lastDot = fileName.lastIndexOf('.');
    if (lastDot === -1) return '';
    return fileName.substring(lastDot).toLowerCase();
  }

  /**
   * Format file size to human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Validate file against validation rules
   */
  static validateFile(
    file: File,
    validation?: IFileValidation
  ): IFileInputError | null {
    if (!validation) return null;

    // Check file size
    if (validation.maxFileSize && file.size > validation.maxFileSize) {
      return {
        type: FileInputErrorEnum.FILE_TOO_LARGE,
        message: `File size exceeds maximum allowed size of ${FileUtils.formatFileSize(
          validation.maxFileSize
        )}`,
        file,
      };
    }

    // Check file type
    if (validation.allowedFileTypes && validation.allowedFileTypes.length > 0) {
      if (!validation.allowedFileTypes.includes(file.type)) {
        return {
          type: FileInputErrorEnum.INVALID_FILE_TYPE,
          message: `File type ${file.type} is not allowed`,
          file,
        };
      }
    }

    // Check file extension
    if (
      validation.allowedExtensions &&
      validation.allowedExtensions.length > 0
    ) {
      const extension = FileUtils.getFileExtension(file.name);
      if (!validation.allowedExtensions.includes(extension)) {
        return {
          type: FileInputErrorEnum.INVALID_FILE_TYPE,
          message: `File extension ${extension} is not allowed`,
          file,
        };
      }
    }

    return null;
  }

  /**
   * Create file preview
   */
  static async createFilePreview(file: File): Promise<IFilePreview> {
    const previewType = FileUtils.getPreviewType(file.type);
    const preview: IFilePreview = {
      file,
      previewType,
      size: file.size,
      name: file.name,
      mimeType: file.type,
      uploadStatus: 'pending',
    };

    // Create preview URL for images and videos
    if (
      previewType === FilePreviewTypeEnum.IMAGE ||
      previewType === FilePreviewTypeEnum.VIDEO
    ) {
      preview.previewUrl = URL.createObjectURL(file);

      // Get image dimensions if it's an image
      if (previewType === FilePreviewTypeEnum.IMAGE) {
        try {
          preview.dimensions = await FileUtils.getImageDimensions(file);
        } catch (error) {
          console.error('Error getting image dimensions:', error);
        }
      }
    }

    return preview;
  }

  /**
   * Get image dimensions
   */
  static getImageDimensions(
    file: File
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        img.src = event.target?.result as string;
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Validate image dimensions
   */
  static validateImageDimensions(
    dimensions: { width: number; height: number },
    validation?: IFileValidation
  ): IFileInputError | null {
    if (!validation) return null;

    if (
      validation.minImageWidth &&
      dimensions.width < validation.minImageWidth
    ) {
      return {
        type: FileInputErrorEnum.INVALID_DIMENSIONS,
        message: `Image width must be at least ${validation.minImageWidth}px`,
      };
    }

    if (
      validation.minImageHeight &&
      dimensions.height < validation.minImageHeight
    ) {
      return {
        type: FileInputErrorEnum.INVALID_DIMENSIONS,
        message: `Image height must be at least ${validation.minImageHeight}px`,
      };
    }

    if (
      validation.maxImageWidth &&
      dimensions.width > validation.maxImageWidth
    ) {
      return {
        type: FileInputErrorEnum.INVALID_DIMENSIONS,
        message: `Image width must not exceed ${validation.maxImageWidth}px`,
      };
    }

    if (
      validation.maxImageHeight &&
      dimensions.height > validation.maxImageHeight
    ) {
      return {
        type: FileInputErrorEnum.INVALID_DIMENSIONS,
        message: `Image height must not exceed ${validation.maxImageHeight}px`,
      };
    }

    return null;
  }

  /**
   * Check if file is corrupt (basic check)
   */
  static async checkFileIntegrity(file: File): Promise<boolean> {
    try {
      const buffer = await file.arrayBuffer();
      return buffer.byteLength > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get default error message
   */
  static getDefaultErrorMessage(errorType: FileInputErrorEnum): string {
    const messages: { [key in FileInputErrorEnum]: string } = {
      [FileInputErrorEnum.FILE_TOO_LARGE]: 'File size is too large',
      [FileInputErrorEnum.INVALID_FILE_TYPE]: 'Invalid file type',
      [FileInputErrorEnum.MAX_FILES_EXCEEDED]:
        'Maximum number of files exceeded',
      [FileInputErrorEnum.NO_FILE_SELECTED]: 'No file selected',
      [FileInputErrorEnum.UPLOAD_FAILED]: 'File upload failed',
      [FileInputErrorEnum.INVALID_DIMENSIONS]: 'Invalid file dimensions',
      [FileInputErrorEnum.CORRUPT_FILE]: 'File appears to be corrupt',
    };

    return messages[errorType] || 'Unknown error';
  }
}

export function generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
