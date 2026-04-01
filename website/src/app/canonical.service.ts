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
