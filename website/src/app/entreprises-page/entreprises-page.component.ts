import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-entreprises-page',
  templateUrl: './entreprises-page.component.html',
  styleUrls: ['./entreprises-page.component.scss'],
})
export class EntreprisesPageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologie en entreprise');
    this._meta.updateTag({
      name: 'description',
      content:
        'Apportez bien-être à vos salariés avec la sophrologie en entreprise : réduisez le stress et améliorez la qualité de vie au travail.',
    });
    this._meta.updateTag({
      name: 'og:description',
      content:
        'Apportez bien-être à vos salariés avec la sophrologie en entreprise : réduisez le stress et améliorez la qualité de vie au travail.',
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
