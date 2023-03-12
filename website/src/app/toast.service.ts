import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Toast {
  message: string;
  isSuccess: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toast$ = new Subject<Toast>();

  public get toast$(): Observable<Toast> {
    return this._toast$.asObservable();
  }

  public showSuccess(message: string): void {
    this._toast$.next({
      message,
      isSuccess: true
    });
  }

  public showError(message: string): void {
    this._toast$.next({
      message,
      isSuccess: false
    });
  }
}
