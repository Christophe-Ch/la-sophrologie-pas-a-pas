import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-cookies-page',
  templateUrl: './cookies-page.component.html',
  styleUrls: ['./cookies-page.component.scss']
})
export class CookiesPageComponent implements OnInit {

  constructor(private readonly _meta: Meta) { }

  ngOnInit(): void {
    this._meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

}
