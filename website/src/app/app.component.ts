import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private _lastConsent?: boolean;

  async ngAfterViewInit(): Promise<void> {
    this._lastConsent = await this._isEnabled();

    (window as any).cookieStore.addEventListener('change', async () => {
      if (await this._isEnabled() !== this._lastConsent) {
        window.location.reload();
      }
    });
  }

  private async _isEnabled(): Promise<boolean> {
    const authorizedVendorsCookie = await (window as any).cookieStore.get(('axeptio_authorized_vendors'));
    return authorizedVendorsCookie && authorizedVendorsCookie.value.includes('recaptcha_enterprise');
  }
}
