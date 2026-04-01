import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';
import { CanonicalService } from '../canonical.service';

@Component({
  selector: 'app-sophrologie-page',
  templateUrl: './sophrologie-page.component.html',
  styleUrls: ['./sophrologie-page.component.scss']
})
export class SophrologiePageComponent implements OnInit {
  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    private readonly _canonicalService: CanonicalService
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologie');
    this._canonicalService.setCanonical('/sophrologie');
    this._meta.updateTag({
      name: 'description',
      content: 'La sophrologie est une méthode de relaxation et développement personnel. Adaptée à tous les âges pour gérer le stress, améliorer le sommeil et la confiance en soi.'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'sophrologie, relaxation, développement personnel, stress, sommeil, confiance en soi, enfants, adultes'
    });
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ property: 'og:title', content: 'La sophrologie — Anne Avenel Dubois' });
    this._meta.updateTag({ property: 'og:description', content: 'Découvrez la sophrologie et ses bienfaits sur le corps et l\'esprit. Méthode de relaxation et de développement personnel pour enfants et adultes.' });
    this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/home.jpg' });
    this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/sophrologie' });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
    this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });
  }
}
