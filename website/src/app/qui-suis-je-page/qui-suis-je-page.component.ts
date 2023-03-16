import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-qui-suis-je-page',
  templateUrl: './qui-suis-je-page.component.html',
  styleUrls: ['./qui-suis-je-page.component.scss']
})
export class QuiSuisJePageComponent implements OnInit {
  constructor(private readonly _titleService: TitleService, private readonly _meta: Meta) { }

  ngOnInit(): void {
    this._titleService.setTitle('Qui suis-je ?');
    this._meta.updateTag({
      name: 'description',
      content: 'Découvrez le parcours et les compétences d\'Anne Avenel Dubois, sophrologue à Saint-Aignan-Sur-Ry.'
    });
    this._meta.updateTag({
      name: 'og:description',
      content: 'Découvrez le parcours et les compétences d\'Anne Avenel Dubois, sophrologue à Saint-Aignan-Sur-Ry.'
    });
    this._meta.updateTag({
      name: 'og:image',
      content: '/assets/home.jpg'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'Anne Avenel Dubois, sophrologue, Saint-Aignan-Sur-Ry, parcours, compétences, expérience, formation, séances de sophrologie, relaxation, bien-être, gestion du stress, techniques de respiration, méditation'
    });
    this._meta.updateTag({
      name: 'twitter:card',
      content: 'summary'
    });
  }
}
