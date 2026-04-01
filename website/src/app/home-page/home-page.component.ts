import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';
import { CanonicalService } from '../canonical.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    private readonly _canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologue à Saint-Aignan-sur-Ry — Anne Avenel Dubois', false);
    this._canonicalService.setCanonical('/');
    this._meta.updateTag({
      name: 'description',
      content:
        'Découvrez la sophrologie avec Anne Avenel Dubois. Séances personnalisées pour gérer le stress et améliorer votre bien-être.',
    });
    this._meta.updateTag({
      name: 'keywords',
      content:
        'Sophrologie, séances de sophrologie, Saint-Aignan-Sur-Ry, Anne Avenel Dubois, contact, rendez-vous, demande de renseignements, qualité de vie',
    });
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ property: 'og:title', content: 'Sophrologue à Saint-Aignan-sur-Ry — Anne Avenel Dubois' });
    this._meta.updateTag({ property: 'og:description', content: 'Découvrez la sophrologie avec Anne Avenel Dubois. Séances personnalisées pour gérer le stress et améliorer votre bien-être.' });
    this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/home.jpg' });
    this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/' });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
    this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });
  }
}
