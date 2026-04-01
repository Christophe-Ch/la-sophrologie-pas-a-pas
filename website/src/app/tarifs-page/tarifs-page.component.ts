import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SessionType } from '../seances-page/seances-page.component';
import { TitleService } from '../title.service';
import { CanonicalService } from '../canonical.service';

@Component({
  selector: 'app-tarifs-page',
  templateUrl: './tarifs-page.component.html',
  styleUrls: ['./tarifs-page.component.scss']
})
export class TarifsPageComponent implements OnInit, OnDestroy {
  sessionType = SessionType;
  modalOpen = false;
  private _schemaScript: HTMLScriptElement | null = null;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    private readonly _canonicalService: CanonicalService,
    @Inject(DOCUMENT) private readonly _document: Document
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle('Tarifs sophrologie — Saint-Aignan-sur-Ry');
    this._canonicalService.setCanonical('/tarifs');
    this._meta.updateTag({
      name: 'description',
      content: 'Tarifs des séances de sophrologie à Saint-Aignan-sur-Ry — individuel adulte 45€, enfant 35€, séances de groupe dès 60€/trimestre.'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'tarifs sophrologie, prix séance sophrologie, sophrologie Saint-Aignan-Sur-Ry, séance individuelle, séance groupe'
    });
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ property: 'og:title', content: 'Tarifs sophrologie — Saint-Aignan-sur-Ry' });
    this._meta.updateTag({ property: 'og:description', content: 'Consultez mes tarifs de sophrologie pour bénéficier de séances adaptées à tous les âges et à tous les besoins.' });
    this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/home.jpg' });
    this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/tarifs' });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
    this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });

    this._injectSchema();

    this._route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('modalOpen')) {
        this.modalOpen = true;
        this._document.body.classList.add('modal-open');
      }
    });
  }

  ngOnDestroy(): void {
    this._document.body.classList.remove('modal-open');
    this._schemaScript?.remove();
  }

  private _injectSchema(): void {
    this._schemaScript = this._document.createElement('script');
    const script = this._schemaScript;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.lasophrologiepasapas.fr/' },
            { '@type': 'ListItem', position: 2, name: 'Tarifs', item: 'https://www.lasophrologiepasapas.fr/tarifs' }
          ]
        },
        {
          '@type': 'Offer',
          name: 'Séance individuelle de sophrologie — Adulte',
          price: '45.00',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          seller: { '@id': 'https://www.lasophrologiepasapas.fr/#business' }
        },
        {
          '@type': 'Offer',
          name: 'Séance individuelle de sophrologie — Enfant',
          price: '35.00',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          seller: { '@id': 'https://www.lasophrologiepasapas.fr/#business' }
        }
      ]
    });
    this._document.head.appendChild(script);
  }
}
