import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'uikit-toast',
  imports: [ToastModule, ButtonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  private messageService = inject(MessageService);

  /**
   * Handle action button click
   */
  onActionClicked(message: any): void {
    if (message.data?.action) {
      message.data.action();
    }
  }

  /**
   * Handle toast close event
   */
  onToastClosed(event: any): void {
    if (event.message?.data?.closeAction) {
      event.message.data.closeAction();
    }
  }

  /**
   * Clear toast by key
   */
  onCloseClicked(message: any): void {
    this.messageService.clear(message.key);
  }
}
