import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Anne Avenel Dubois - Sophrologue', false);
    this._meta.updateTag({
      name: 'description',
      content:
        'Découvrez la sophrologie avec Anne Avenel Dubois. Séances personnalisées pour gérer le stress et améliorer votre bien-être.',
    });
    this._meta.updateTag({
      name: 'og:description',
      content:
        'Découvrez la sophrologie avec Anne Avenel Dubois. Séances personnalisées pour gérer le stress et améliorer votre bien-être.',
    });
    this._meta.updateTag({
      name: 'og:image',
      content: '/assets/home.jpg',
    });
    this._meta.updateTag({
      name: 'keywords',
      content:
        'Sophrologie, séances de sophrologie, Saint-Aignan-Sur-Ry, Anne Avenel Dubois, contact, rendez-vous, demande de renseignements, qualité de vie',
    });
    this._meta.updateTag({
      name: 'twitter:card',
      content: 'summary',
    });
  }
}
