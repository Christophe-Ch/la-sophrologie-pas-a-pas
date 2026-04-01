import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';
import { CanonicalService } from '../canonical.service';

@Component({
  selector: 'app-entreprises-page',
  templateUrl: './entreprises-page.component.html',
  styleUrls: ['./entreprises-page.component.scss'],
})
export class EntreprisesPageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    private readonly _canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologie en entreprise');
    this._canonicalService.setCanonical('/entreprises');
    this._meta.updateTag({
      name: 'description',
      content:
        'Apportez bien-être à vos salariés avec la sophrologie en entreprise : réduisez le stress et améliorez la qualité de vie au travail.',
    });
    this._meta.updateTag({
      name: 'keywords',
      content:
        'sophrologie entreprise, sophrologie Rouen, prévention RPS, QVT, bien-être au travail, stress entreprise, Seine-Maritime',
    });
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ property: 'og:title', content: 'Sophrologie en entreprise — Anne Avenel Dubois' });
    this._meta.updateTag({ property: 'og:description', content: 'Apportez bien-être à vos salariés avec la sophrologie en entreprise : réduisez le stress et améliorez la qualité de vie au travail.' });
    this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/entreprise.jpg' });
    this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/entreprises' });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
    this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });
  }
}
