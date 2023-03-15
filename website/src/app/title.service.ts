import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

const TITLE_SUFFIX = '| Anne Avenel Dubois | Saint-Aignan-Sur-Ry';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
    constructor(private _title: Title) { }

    setTitle(title: string): void {
      this._title.setTitle(`${title} ${TITLE_SUFFIX}`);
    }
}
