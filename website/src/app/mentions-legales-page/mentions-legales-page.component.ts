import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-mentions-legales-page',
  templateUrl: './mentions-legales-page.component.html',
  styleUrls: ['./mentions-legales-page.component.scss']
})
export class MentionsLegalesPageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Mentions légales');
    this._meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}
