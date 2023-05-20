import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ActivationStatus {
  service: string,
  activation: boolean
}

interface AxeptioSDK {
  hasAcceptedVendor: (vendor: string) => boolean;
  on: (event: string, callback: (result: any) => void) => void;
}

@Injectable({
  providedIn: 'root'
})
export class AxeptioService {
  private readonly _activationChanged$: Subject<ActivationStatus>;
  private _axeptioSDK?: AxeptioSDK;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this._activationChanged$ = new Subject<ActivationStatus>();
    if (isPlatformBrowser(platformId)) {
      this._waitForAxeptio();
    }
  }

  isServiceEnabled(service: string): boolean {
    return !!this._axeptioSDK && this._axeptioSDK.hasAcceptedVendor(service);
  }

  activationChange$(): Observable<ActivationStatus> {
    return this._activationChanged$.asObservable();
  }

  private _waitForAxeptio(): void {
    const interval = setInterval(() => {
      const sdk = (window as any).axeptioSDK;
      if (sdk) {
        this._axeptioSDK = sdk;
        this._initializeListener();
        clearInterval(interval);
      }
    }, 2000);
  }

  private _initializeListener(): void {
    this._axeptioSDK?.on('cookies:complete', (result: any) => {
      Object.keys(result).forEach(key => {
        this._activationChanged$.next({
          service: key,
          activation: result[key] as boolean
        } as ActivationStatus);
      });
    });
  }
}
