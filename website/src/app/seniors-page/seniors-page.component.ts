import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-seniors-page',
  templateUrl: './seniors-page.component.html',
  styleUrls: ['./seniors-page.component.scss'],
})
export class SeniorsPageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologie pour les séniors');
    this._meta.updateTag({
      name: 'description',
      content:
        'Des techniques de relaxation adaptées aux séniors pour réduire le stress, améliorer le bien-être et favoriser une vie équilibrée.',
    });
    this._meta.updateTag({
      name: 'og:description',
      content:
        'Des techniques de relaxation adaptées aux séniors pour réduire le stress, améliorer le bien-être et favoriser une vie équilibrée.',
    });
    this._meta.updateTag({
      name: 'og:image',
      content: '/assets/home.jpg',
    });
    this._meta.updateTag({
      name: 'keywords',
      content:
        'Anne Avenel Dubois, sophrologue, Saint-Aignan-Sur-Ry, parcours, compétences, expérience, formation, séances de sophrologie, relaxation, bien-être, gestion du stress, techniques de respiration, méditation',
    });
    this._meta.updateTag({
      name: 'twitter:card',
      content: 'summary',
    });
  }
}
