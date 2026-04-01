import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';
import { CanonicalService } from '../canonical.service';

@Component({
  selector: 'app-seniors-page',
  templateUrl: './seniors-page.component.html',
  styleUrls: ['./seniors-page.component.scss'],
})
export class SeniorsPageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    private readonly _canonicalService: CanonicalService
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologie pour les séniors');
    this._canonicalService.setCanonical('/seniors');
    this._meta.updateTag({
      name: 'description',
      content:
        'Des techniques de relaxation adaptées aux séniors pour réduire le stress, améliorer le bien-être et favoriser une vie équilibrée.',
    });
    this._meta.updateTag({
      name: 'keywords',
      content:
        'sophrologie séniors, sophrologie personnes âgées, bien-être senior, relaxation séniors, Seine-Maritime, Saint-Aignan-Sur-Ry',
    });
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ property: 'og:title', content: 'Sophrologie pour les séniors — Anne Avenel Dubois' });
    this._meta.updateTag({ property: 'og:description', content: 'Des techniques de relaxation adaptées aux séniors pour réduire le stress, améliorer le bien-être et favoriser une vie équilibrée.' });
    this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/seniors.jpg' });
    this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/seniors' });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
    this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });
  }
}
