import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private readonly _titleService: TitleService, private readonly _meta: Meta) { }

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologue');
    this._meta.updateTag({
      name: 'description',
      content: 'Découvrez les séances de sophrologie proposées par Anne Avenel Dubois, sophrologue basée sur Saint-Aignan-Sur-Ry. Je propose des séances pour tous les âges et besoins pour vous aider à gérer votre stress, retrouver votre équilibre et vous reconnecter à vous-même. Contactez-moi pour prendre rendez-vous dès maintenant.'
    });
    this._meta.updateTag({
      name: 'og:description',
      content: 'Découvrez les séances de sophrologie proposées par Anne Avenel Dubois, sophrologue basée sur Saint-Aignan-Sur-Ry. Je propose des séances pour tous les âges et besoins pour vous aider à gérer votre stress, retrouver votre équilibre et vous reconnecter à vous-même. Contactez-moi pour prendre rendez-vous dès maintenant.'
    });
    this._meta.updateTag({
      name: 'og:image',
      content: '/assets/home.jpg'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'Sophrologie, séances de sophrologie, Saint-Aignan-Sur-Ry, Anne Avenel Dubois, contact, rendez-vous, demande de renseignements, qualité de vie'
    });
    this._meta.updateTag({
      name: 'twitter:card',
      content: 'summary'
    });
  }
}
