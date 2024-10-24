import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

const TITLE_SUFFIX = '- Anne Avenel Dubois';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private _title: Title) {}

  setTitle(title: string, withSuffix: boolean = true): void {
    if (withSuffix) {
      this._title.setTitle(`${title} ${TITLE_SUFFIX}`);
    } else {
      this._title.setTitle(title);
    }
  }
}
