import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';
import { CanonicalService } from '../canonical.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qui-suis-je-page',
  templateUrl: './qui-suis-je-page.component.html',
  styleUrls: ['./qui-suis-je-page.component.scss'],
})
export class QuiSuisJePageComponent implements OnInit, OnDestroy {
  public reviews: Review[] = [];
  public reviewIndex = 0;
  private _schemaScript: HTMLScriptElement | null = null;

  constructor(
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    private readonly _canonicalService: CanonicalService,
    private readonly _http: HttpClient,
    @Inject(DOCUMENT) private readonly _document: Document
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle('Qui suis-je ?');
    this._canonicalService.setCanonical('/qui-suis-je');
    this._meta.updateTag({
      name: 'description',
      content:
        "Découvrez le parcours et les compétences d'Anne Avenel Dubois, sophrologue à Saint-Aignan-Sur-Ry.",
    });
    this._meta.updateTag({
      name: 'keywords',
      content:
        'Anne Avenel Dubois, sophrologue, Saint-Aignan-Sur-Ry, parcours, compétences, expérience, formation, séances de sophrologie, relaxation, bien-être, gestion du stress, techniques de respiration, méditation',
    });
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ property: 'og:title', content: 'Qui suis-je ? — Anne Avenel Dubois, Sophrologue' });
    this._meta.updateTag({ property: 'og:description', content: "Découvrez le parcours et les compétences d'Anne Avenel Dubois, sophrologue à Saint-Aignan-Sur-Ry." });
    this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/me.jpg' });
    this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/qui-suis-je' });
    this._meta.updateTag({ property: 'og:type', content: 'website' });
    this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
    this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });

    this._injectSchema();

    this._http
      .get(
        'https://europe-west1-anne-avenel-site.cloudfunctions.net/get-reviews'
      )
      .subscribe((result: any) => {
        this.reviews = result.reviews as Review[];
      });
  }

  previousReview(): void {
    if (this.reviewIndex - 1 < 0) {
      this.reviewIndex = this.reviews.length - 1;
    } else {
      this.reviewIndex = this.reviewIndex - 1;
    }
  }

  nextReview(): void {
    if (this.reviewIndex + 1 === this.reviews.length) {
      this.reviewIndex = 0;
    } else {
      this.reviewIndex = this.reviewIndex + 1;
    }
  }

  ngOnDestroy(): void {
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
            { '@type': 'ListItem', position: 2, name: 'Qui suis-je ?', item: 'https://www.lasophrologiepasapas.fr/qui-suis-je' }
          ]
        },
        {
          '@type': 'Person',
          '@id': 'https://www.lasophrologiepasapas.fr/#person',
          name: 'Anne Avenel Dubois',
          givenName: 'Anne',
          familyName: 'Avenel Dubois',
          jobTitle: 'Sophrologue',
          url: 'https://www.lasophrologiepasapas.fr/qui-suis-je',
          image: 'https://www.lasophrologiepasapas.fr/assets/me.jpg',
          telephone: '+33620818268',
          email: 'anne.avenel.sophrologie@laposte.net',
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            name: 'Certification RNCP Sophrologue',
            credentialCategory: 'Certification professionnelle',
            recognizedBy: { '@type': 'Organization', name: 'France Compétences (RNCP)' }
          },
          memberOf: {
            '@type': 'Organization',
            name: 'Chambre Syndicale de Sophrologie',
            url: 'https://www.chambre-syndicale-sophrologie.fr/'
          },
          worksFor: { '@id': 'https://www.lasophrologiepasapas.fr/#business' }
        }
      ]
    });
    this._document.head.appendChild(script);
  }
}

interface Review {
  author_name: string;
  text: string;
  rating: number;
}
