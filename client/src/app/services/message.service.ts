import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceClient {

  constructor(private messageService: MessageService) { }

  showSuccess(alert: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: alert });
  }

  showInfo(alert: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: alert });
  }

  showWarn(alert: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: alert });
  }

  showError(alert: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: alert });
  }
}
