import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TitleService } from '../title.service';
import { CanonicalService } from '../canonical.service';

export enum SessionType {
  INDIVIDUAL = "individuelle",
  GROUP_ADULT = "groupe-pour-adulte",
  GROUP_TEENAGER = "groupe-pour-adolescent",
  GROUP_EXAM = "preparer-un-examen",
  GROUP_KID = "groupe-pour-enfant"
}

@Component({
  selector: 'app-seances-page',
  templateUrl: './seances-page.component.html',
  styleUrls: ['./seances-page.component.scss']
})
export class SeancesPageComponent implements OnInit, OnDestroy {
  modalType = SessionType;

  openModalType?: SessionType;
  previousScroll = 0;
  private _schemaScript: HTMLScriptElement | null = null;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    private readonly _canonicalService: CanonicalService,
    @Inject(DOCUMENT) private readonly _document: Document
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle('Séances de sophrologie — Saint-Aignan-sur-Ry — Anne Avenel Dubois');
    this._canonicalService.setCanonical('/seances');
    this._meta.updateTag({
      name: 'description',
      content: 'Je propose différents types de séances de sophrologie adaptées à vos besoins. Vous pouvez bénéficier de séances individuelles pour une attention personnalisée, ou rejoindre l\'un de mes groupes de sophrologie pour partager une expérience de relaxation et de développement personnel avec d\'autres. Mes séances comprennent la gestion du stress, la relaxation, la préparation mentale, le développement personnel et plus encore.'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'séances de sophrologie, gestion du stress, relaxation, préparation mentale, développement personnel, sophrologie pour enfants, sophrologie pour adultes'
    });
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ property: 'og:title', content: 'Séances de sophrologie — Saint-Aignan-sur-Ry — Anne Avenel Dubois' });
    this._meta.updateTag({ property: 'og:description', content: 'Je propose différents types de séances de sophrologie adaptées à vos besoins : individuelles ou en groupe, pour la gestion du stress, la relaxation et le développement personnel.' });
    this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/home.jpg' });
    this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/seances' });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
    this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });

    this._injectSchema();

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.openModalType = params.get('type') as SessionType;
      if (this.openModalType !== null) {
        this._document.body.classList.add('modal-open')
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
            { '@type': 'ListItem', position: 2, name: 'Déroulement des séances', item: 'https://www.lasophrologiepasapas.fr/seances' }
          ]
        },
        {
          '@type': 'Service',
          name: 'Séance individuelle de sophrologie',
          description: "Séance d'une heure comprenant dialogue préalable, relaxation dynamique, respiration, relâchement musculaire et visualisation positive.",
          provider: { '@id': 'https://www.lasophrologiepasapas.fr/#business' },
          serviceType: 'Sophrologie',
          offers: {
            '@type': 'Offer',
            price: '45.00',
            priceCurrency: 'EUR'
          }
        },
        {
          '@type': 'Service',
          name: 'Séance de groupe de sophrologie',
          description: 'Séances de sophrologie en groupe pour adultes, adolescents, enfants et préparation aux examens.',
          provider: { '@id': 'https://www.lasophrologiepasapas.fr/#business' },
          serviceType: 'Sophrologie'
        }
      ]
    });
    this._document.head.appendChild(script);
  }
}
