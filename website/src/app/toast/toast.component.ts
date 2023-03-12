import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  private _timeout?: NodeJS.Timeout;

  shown = false;
  success?: boolean;
  message?: string;

  constructor(private readonly _toastService: ToastService) {
    this._toastService.toast$.subscribe((toast: Toast) => {
      this.success = toast.isSuccess;
      this.message = toast.message;
      this.shown = true;
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      this._timeout = setTimeout(() => this.shown = false, 5000);
    });
  }
}
