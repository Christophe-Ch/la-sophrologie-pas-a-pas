import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-confidentialite-page',
  templateUrl: './confidentialite-page.component.html',
  styleUrls: ['./confidentialite-page.component.scss']
})
export class ConfidentialitePageComponent implements OnInit {

  constructor(private readonly _meta: Meta) { }

  ngOnInit(): void {
    this._meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

}
