# SEO Action Plan — lasophrologiepasapas.fr
**Audit date:** 2026-04-01 | **Score actuel : 36 / 100**

---

## Sprint 1 — Critique (une demi-journée)

### ~~Étape 1 — Activer la compression gzip dans `server.ts`~~ ✅

```bash
cd website
npm install compression @types/compression --save
```

Dans `website/server.ts`, ajouter en haut des imports :

```typescript
import compression from 'compression';
```

Et juste après `const server = express();` :

```typescript
server.use(compression());
```

**Impact :** LCP mobile passe de 10s à ~6.5s. Économie de 3.45s (464KB JS + 176KB CSS non compressés).

---

### ~~Étape 2 — Créer `robots.txt` et corriger le `sitemap.xml`~~ ✅

**2a. Créer `website/src/robots.txt`** (à la racine `src/`, pas dans `assets/`) :

```
User-agent: *
Allow: /

Sitemap: https://www.lasophrologiepasapas.fr/sitemap.xml
```

**2b. Déplacer le sitemap** : copier `website/src/assets/sitemap.xml` vers `website/src/sitemap.xml`.

**2c. Mettre à jour `angular.json`** — dans la section `assets` de la build, s'assurer que les fichiers racine sont inclus. Chercher le tableau `"assets"` et vérifier que `"src/robots.txt"` et `"src/sitemap.xml"` y sont (ou que `"src"` est listé comme source avec glob `**/*`).

**2d. Ajouter les routes Express dans `website/server.ts`** — avant le middleware statique existant (`express.static`) :

```typescript
server.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(join(browserDistFolder, 'robots.txt'));
});

server.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(join(browserDistFolder, 'sitemap.xml'));
});
```

---

### ~~Étape 3 — Corriger `lang="en"` → `lang="fr"`~~ ✅

Fichier : `website/src/index.html`, ligne 2.

```html
<!-- Avant -->
<html lang="en">

<!-- Après -->
<html lang="fr">
```

---

### ~~Étape 4 — Ajouter les security headers dans `server.ts`~~ ✅

Dans `website/server.ts`, ajouter avant le middleware statique :

```typescript
server.use((_, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
```

---

### ~~Étape 5 — Injecter le JSON-LD `LocalBusiness` sur la homepage~~ ✅

Fichier : `website/src/app/home-page/home-page.component.ts`

Ajouter `DOCUMENT` dans les imports et injecter le schema dans `ngOnInit` :

```typescript
import { DOCUMENT } from '@angular/common';

// Dans le constructeur, ajouter :
@Inject(DOCUMENT) private readonly _document: Document

// Ajouter cette méthode :
private injectSchema(): void {
  const script = this._document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.lasophrologiepasapas.fr/#website",
        "url": "https://www.lasophrologiepasapas.fr/",
        "name": "La sophrologie pas à pas",
        "description": "Séances de sophrologie avec Anne Avenel Dubois, sophrologue certifiée RNCP à Saint-Aignan-Sur-Ry.",
        "publisher": { "@id": "https://www.lasophrologiepasapas.fr/#business" },
        "inLanguage": "fr-FR"
      },
      {
        "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
        "@id": "https://www.lasophrologiepasapas.fr/#business",
        "name": "La sophrologie pas à pas — Anne Avenel Dubois",
        "alternateName": "Anne Avenel Dubois Sophrologue",
        "url": "https://www.lasophrologiepasapas.fr/",
        "logo": "https://www.lasophrologiepasapas.fr/assets/home.jpg",
        "image": "https://www.lasophrologiepasapas.fr/assets/home.jpg",
        "description": "Séances de sophrologie individuelles et en groupe pour adultes, adolescents et enfants. Gestion du stress, relaxation et développement personnel à Saint-Aignan-Sur-Ry.",
        "telephone": "+33620818268",
        "email": "anne.avenel.sophrologie@laposte.net",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "140 Rue Sainte-Anne",
          "addressLocality": "Saint-Aignan-Sur-Ry",
          "postalCode": "76116",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 49.50327,
          "longitude": 1.35126
        },
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Chèque, Virement bancaire",
        "founder": { "@id": "https://www.lasophrologiepasapas.fr/#person" }
      }
    ]
  });
  this._document.head.appendChild(script);
}
```

Appeler `this.injectSchema()` dans `ngOnInit()`.

> Note : ajouter `aggregateRating` dynamiquement une fois les avis SSR corrigés (étape 12).

---

## Sprint 2 — High (1-2 semaines)

### ~~Étape 6 — Créer un `CanonicalService` partagé~~ ✅

Créer `website/src/app/canonical.service.ts` :

```typescript
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  setCanonical(path: string): void {
    const base = 'https://www.lasophrologiepasapas.fr';
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = `${base}${path}`;
  }
}
```

Appeler depuis chaque composant dans `ngOnInit` :
- Home : `this._canonicalService.setCanonical('/')`
- Qui suis-je : `this._canonicalService.setCanonical('/qui-suis-je')`
- Sophrologie : `this._canonicalService.setCanonical('/sophrologie')`
- Séances : `this._canonicalService.setCanonical('/seances')`
- Tarifs : `this._canonicalService.setCanonical('/tarifs')`
- Contact : `this._canonicalService.setCanonical('/contact')`
- Seniors : `this._canonicalService.setCanonical('/seniors')`
- Entreprises : `this._canonicalService.setCanonical('/entreprises')`

---

### ~~Étape 7 — Corriger les balises OG (`name=` → `property=`) et les compléter~~ ✅

Dans **tous les composants `.ts`**, remplacer :

```typescript
// Avant (incorrect — rendu comme <meta name="og:...">)
this._meta.updateTag({ name: 'og:description', content: '...' });
this._meta.updateTag({ name: 'og:image', content: '/assets/home.jpg' });

// Après (correct)
this._meta.updateTag({ property: 'og:description', content: '...' });
this._meta.updateTag({ property: 'og:image', content: 'https://www.lasophrologiepasapas.fr/assets/home.jpg' });
```

Ajouter sur **chaque page** les balises manquantes :

```typescript
this._meta.updateTag({ property: 'og:title', content: 'TITRE DE LA PAGE' });
this._meta.updateTag({ property: 'og:url', content: 'https://www.lasophrologiepasapas.fr/CHEMIN' });
this._meta.updateTag({ property: 'og:type', content: 'website' });
this._meta.updateTag({ property: 'og:site_name', content: 'La sophrologie pas à pas' });
this._meta.updateTag({ property: 'og:locale', content: 'fr_FR' });
```

Images OG par page (remplacer `home.jpg` générique) :
- `/qui-suis-je` → `https://www.lasophrologiepasapas.fr/assets/me.jpg`
- `/seniors` → `https://www.lasophrologiepasapas.fr/assets/seniors.jpg`
- `/entreprises` → `https://www.lasophrologiepasapas.fr/assets/entreprise.jpg`

---

### ~~Étape 8 — Ajouter des keywords locaux dans les titres et headings~~ ✅

Modifier `TitleService` ou les appels `setTitle` dans chaque composant :

| Page | Titre actuel | Titre suggéré |
|---|---|---|
| Home | `Anne Avenel Dubois - Sophrologue` | `Sophrologue à Saint-Aignan-sur-Ry — Anne Avenel Dubois` |
| Séances | `Déroulement des séances - Anne Avenel Dubois` | `Séances de sophrologie — Saint-Aignan-sur-Ry — Anne Avenel Dubois` |
| Contact | `Contact - Anne Avenel Dubois` | `Contact — Sophrologue Saint-Aignan-sur-Ry` |
| Tarifs | `Tarifs - Anne Avenel Dubois` | `Tarifs sophrologie — Saint-Aignan-sur-Ry` |

Ajouter dans le body text de la homepage un paragraphe d'intro (~60 mots) mentionnant nom, titre, ville et services.

---

### ~~Étape 9 — Ajouter le JSON-LD `Person` sur `/qui-suis-je`~~ ✅

Fichier : `website/src/app/qui-suis-je-page/qui-suis-je-page.component.ts`

Même pattern que l'étape 5. JSON-LD à injecter :

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.lasophrologiepasapas.fr/" },
        { "@type": "ListItem", "position": 2, "name": "Qui suis-je ?", "item": "https://www.lasophrologiepasapas.fr/qui-suis-je" }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.lasophrologiepasapas.fr/#person",
      "name": "Anne Avenel Dubois",
      "givenName": "Anne",
      "familyName": "Avenel Dubois",
      "jobTitle": "Sophrologue",
      "url": "https://www.lasophrologiepasapas.fr/qui-suis-je",
      "image": "https://www.lasophrologiepasapas.fr/assets/me.jpg",
      "telephone": "+33620818268",
      "email": "anne.avenel.sophrologie@laposte.net",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Certification RNCP Sophrologue",
        "credentialCategory": "Certification professionnelle",
        "recognizedBy": { "@type": "Organization", "name": "France Compétences (RNCP)" }
      },
      "memberOf": {
        "@type": "Organization",
        "name": "Chambre Syndicale de Sophrologie",
        "url": "https://www.chambre-syndicale-sophrologie.fr/"
      },
      "worksFor": { "@id": "https://www.lasophrologiepasapas.fr/#business" }
    }
  ]
}
```

---

### ~~Étape 10 — Ajouter le JSON-LD `Service` sur `/seances` et `Offer` sur `/tarifs`~~ ✅

**`/seances`** — injecter dans `seances-page.component.ts` :

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.lasophrologiepasapas.fr/" },
        { "@type": "ListItem", "position": 2, "name": "Déroulement des séances", "item": "https://www.lasophrologiepasapas.fr/seances" }
      ]
    },
    {
      "@type": "Service",
      "name": "Séance individuelle de sophrologie",
      "description": "Séance d'une heure comprenant dialogue préalable, relaxation dynamique, respiration, relâchement musculaire et visualisation positive.",
      "provider": { "@id": "https://www.lasophrologiepasapas.fr/#business" },
      "serviceType": "Sophrologie",
      "offers": {
        "@type": "Offer",
        "price": "45.00",
        "priceCurrency": "EUR"
      }
    },
    {
      "@type": "Service",
      "name": "Séance de groupe de sophrologie",
      "description": "Séances de sophrologie en groupe pour adultes, adolescents, enfants et préparation aux examens.",
      "provider": { "@id": "https://www.lasophrologiepasapas.fr/#business" },
      "serviceType": "Sophrologie"
    }
  ]
}
```

**`/tarifs`** — injecter dans `tarifs-page.component.ts` :

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.lasophrologiepasapas.fr/" },
        { "@type": "ListItem", "position": 2, "name": "Tarifs", "item": "https://www.lasophrologiepasapas.fr/tarifs" }
      ]
    },
    {
      "@type": "Offer",
      "name": "Séance individuelle de sophrologie — Adulte",
      "price": "45.00",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": { "@id": "https://www.lasophrologiepasapas.fr/#business" }
    },
    {
      "@type": "Offer",
      "name": "Séance individuelle de sophrologie — Enfant",
      "price": "35.00",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": { "@id": "https://www.lasophrologiepasapas.fr/#business" }
    }
  ]
}
```

---

### ~~Étape 11 — Optimiser l'image hero pour le LCP mobile~~ ✅

~~Fichier : `website/src/app/home-page/home-page.component.html`~~ ✅

```html
<!-- Avant -->
<img src="/assets/home.jpg" alt="Femme marchant sur la plage">

<!-- Après -->
<img src="/assets/home.jpg"
     alt="Femme marchant sur la plage"
     fetchpriority="high"
     width="1200"
     height="800">
```

Pour **toutes les autres images** du site, ajouter `loading="lazy"` et les attributs `width`/`height` :

```html
<img src="/assets/seniors.jpg" alt="..." loading="lazy" width="600" height="400">
```

Corriger l'alt manquant dans `sophrologie-page.component.html` (image `sophrologie2.jpg`).

---

### ~~Étape 12 — Rendre le téléphone et l'email cliquables~~ ✅

Fichier : `website/src/app/contact-page/contact-page.component.html`

```html
<!-- Téléphone -->
<!-- Avant : -->
06 20 81 82 68
<!-- Après : -->
<a href="tel:+33620818268">06 20 81 82 68</a>

<!-- Email -->
<!-- Avant : -->
anne.avenel.sophrologie&#64;laposte.net
<!-- Après : -->
<a href="mailto:anne.avenel.sophrologie@laposte.net">anne.avenel.sophrologie@laposte.net</a>
```

---

## Sprint 3 — Medium (1 mois)

### Étape 13 — Nettoyer le sitemap

Fichier : `website/src/sitemap.xml` (après déplacement à l'étape 2)

- ~~Supprimer les 18 entrées `lasophrologiepasapas.fr` (non-www)~~ ✅
- Supprimer les trailing slashes des URLs pour correspondre au router Angular (ex. `/tarifs` pas `/tarifs/`)
- Mettre à jour les dates `lastmod` (toutes figées à `2024-10-24`)
- Supprimer les balises `<priority>` et `<changefreq>` (ignorées par Google)

---

### Étape 14 — Standardiser le NAP (Nom / Adresse / Téléphone)

Choisir cette forme canonique et l'appliquer partout :
```
140 Rue Sainte-Anne, 76116 Saint-Aignan-Sur-Ry
```

Pages à corriger :
- `contact-page.component.html` — "140 Rue Sainte-Anne" ✓ mais "76 116" → "76116"
- `mentions-legales-page.component.html` — "140 rue Sainte-Anne" → "140 Rue Sainte-Anne"
- `seances-page.component.html` (modals) — "140 rue Sainte Anne" → "140 Rue Sainte-Anne"

---

### Étape 15 — Corriger les meta descriptions trop longues

| Page | Longueur actuelle | Action |
|---|---|---|
| `/seances` | ~500 chars | Réécrire à < 155 chars |
| `/sophrologie` | 229 chars | Réécrire à < 155 chars |
| `/tarifs` | 198 chars | Réécrire à < 155 chars |

---

### ~~Étape 16 — Corriger les keywords copiés-collés~~ ✅

Pages avec les keywords de `/qui-suis-je` copiés par erreur :
- `seniors-page.component.ts` → remplacer par : `"sophrologie séniors, sophrologie personnes âgées, bien-être senior, relaxation séniors, Seine-Maritime, Saint-Aignan-Sur-Ry"`
- `entreprises-page.component.ts` → remplacer par : `"sophrologie entreprise, sophrologie Rouen, prévention RPS, QVT, bien-être au travail, stress entreprise, Seine-Maritime"`
- `tarifs-page.component.ts` → remplacer par : `"tarifs sophrologie, prix séance sophrologie, sophrologie Saint-Aignan-Sur-Ry, séance individuelle, séance groupe"`

---

### Étape 17 — Déplacer le script Axeptio hors du `<head>` inline

Fichier : `website/src/index.html`

Le bloc Axeptio inline bloque le rendu. Le déplacer vers la fin du `<body>` ou l'injecter depuis `AppComponent` après le premier rendu.

---

### Étape 18 — Ajouter `noindex` aux pages légales

Dans les composants `mentions-legales`, `politique-de-cookies`, `politique-de-confidentialite` :

```typescript
this._meta.updateTag({ name: 'robots', content: 'noindex, follow' });
```

---

### Étape 19 — Corriger les `<span>` → `<h3>` sur la page sophrologie

Fichier : `website/src/app/sophrologie-page/sophrologie-page.component.html`

Les trois sous-titres "Retrouver le bien-être", "Développer ses capacités", "Mieux vivre au quotidien" sont des `<span class="fw_bold why-header">`. Les remplacer par `<h3>`.

---

### Étape 20 — Créer `llms.txt`

Créer `website/src/llms.txt` (servi comme fichier statique, même pattern que robots.txt) :

```
# La Sophrologie Pas à Pas — Anne Avenel Dubois

## Praticienne
Nom : Anne Avenel Dubois
Titre : Sophrologue certifiée RNCP
Formation : Institut de Formation en Sophrologie de Catherine Aliotta (Paris X)
Membre : Chambre Syndicale de Sophrologie
Spécialité : Sophrologie pour l'enfance

## Localisation
Adresse : 140 Rue Sainte-Anne, 76116 Saint-Aignan-Sur-Ry (Seine-Maritime, Normandie)
Téléphone : +33 6 20 81 82 68
Email : anne.avenel.sophrologie@laposte.net
Coordonnées GPS : 49.50327, 1.35126

## Services
- Séances individuelles : adultes 45€ (1h), adolescents 45€ (45min-1h), enfants 35€ (30-45min)
- Séances de groupe : adultes, adolescents, enfants, préparation aux examens
- Interventions en entreprise (programme sur mesure)
- Sophrologie pour séniors

## Description
La sophrologie est une méthode psychocorporelle créée en 1960 par Alfonso Caycedo.
Anne Avenel Dubois propose des séances adaptées à tous les âges pour la gestion du stress,
l'amélioration du sommeil, la confiance en soi et le développement personnel.

## Site web
https://www.lasophrologiepasapas.fr/
```

Ajouter la route Express dans `server.ts` :
```typescript
server.get('/llms.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(join(browserDistFolder, 'llms.txt'));
});
```

---

## Backlog — Low priority

### Étape 21 — Ajouter un Google Maps embed sur `/contact`

Remplacer ou compléter la carte OpenLayers par un embed Google Maps pointant vers le GBP de la praticienne. La carte OSM ne produit aucun signal GBP pour Google.

---

### Étape 22 — Vérifier / créer le Google Business Profile

- Revendiquer le profil GBP si ce n'est pas fait
- Catégorie primaire : "Sophrologue" ou "Thérapeute en relaxation"
- Ajouter photos, horaires, description, lien vers le site
- Lier le GBP depuis la page `/contact` du site

---

### Étape 23 — Corriger le lien CTA entreprises

Fichier : `website/src/app/entreprises-page/entreprises-page.component.html`

```html
<!-- Avant -->
<a href="/contact" class="btn btn-primary">Prendre contact</a>

<!-- Après -->
<a routerLink="/contact" class="btn btn-primary">Prendre contact</a>
```

---

### Étape 24 — Enrichir le contenu homepage

Ajouter un paragraphe d'intro (~60-80 mots) sous le H1, mentionnant :
- Nom complet et titre
- Certification RNCP
- Localisation (Saint-Aignan-Sur-Ry / région Rouennaise)
- Services principaux
- Lien vers `/qui-suis-je`

---

### Étape 25 — Ajouter des citations dans l'annuaire

Créer / vérifier les fiches sur :
1. PagesJaunes.fr
2. Annuaire de la Chambre Syndicale de Sophrologie (lien depuis le site)
3. Therapeutes.com

NAP identique partout : `140 Rue Sainte-Anne, 76116 Saint-Aignan-Sur-Ry | +33 6 20 81 82 68`

---

## Récapitulatif des fichiers à modifier

| Fichier | Étapes |
|---|---|
| `website/server.ts` | 1, 2d, 4, 20 |
| `website/src/index.html` | 3, 17 |
| `website/src/robots.txt` *(nouveau)* | 2a |
| `website/src/sitemap.xml` *(déplacé)* | 2b, 13 |
| `website/src/llms.txt` *(nouveau)* | 20 |
| `website/angular.json` | 2c |
| `website/src/app/home-page/home-page.component.ts` | 5 |
| `website/src/app/home-page/home-page.component.html` | 11, 24 |
| `website/src/app/qui-suis-je-page/qui-suis-je-page.component.ts` | 6, 7, 9 |
| `website/src/app/seances-page/seances-page.component.ts` | 6, 7, 10 |
| `website/src/app/tarifs-page/tarifs-page.component.ts` | 6, 7, 10, 16 |
| `website/src/app/contact-page/contact-page.component.ts` | 6, 7 |
| `website/src/app/contact-page/contact-page.component.html` | 12, 14, 21 |
| `website/src/app/seniors-page/seniors-page.component.ts` | 6, 7, 16 |
| `website/src/app/entreprises-page/entreprises-page.component.ts` | 6, 7, 16 |
| `website/src/app/entreprises-page/entreprises-page.component.html` | 23 |
| `website/src/app/sophrologie-page/sophrologie-page.component.html` | 19 |
| `website/src/app/mentions-legales-page/mentions-legales-page.component.ts` | 14, 18 |
| `website/src/app/canonical.service.ts` *(nouveau)* | 6 |
| Tous les composants `.html` | 11 (`loading="lazy"` sur images) |
