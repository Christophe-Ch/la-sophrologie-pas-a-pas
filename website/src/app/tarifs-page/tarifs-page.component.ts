import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SessionType } from '../seances-page/seances-page.component';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-tarifs-page',
  templateUrl: './tarifs-page.component.html',
  styleUrls: ['./tarifs-page.component.scss']
})
export class TarifsPageComponent implements OnInit, OnDestroy {
  sessionType = SessionType;
  modalOpen = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    @Inject(DOCUMENT) private readonly _document: Document
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle('Tarifs');
    this._meta.updateTag({
      name: 'description',
      content: 'Consultez mes tarifs de sophrologie pour bénéficier de séances adaptées à tous les âges et à tous les besoins. N\'hésitez pas à me contacter pour plus d\'informations et pour prendre rendez-vous.'
    });
    this._meta.updateTag({
      name: 'og:description',
      content: 'Consultez mes tarifs de sophrologie pour bénéficier de séances adaptées à tous les âges et à tous les besoins. N\'hésitez pas à me contacter pour plus d\'informations et pour prendre rendez-vous.'
    });
    this._meta.updateTag({
      name: 'og:image',
      content: '/assets/home.jpg'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'tarifs sophrologie, prix séances sophrologie, sophrologue Saint-Aignan-Sur-Ry, sophrologie pour enfants, sophrologie pour adultes'
    });
    this._meta.updateTag({
      name: 'twitter:card',
      content: 'summary'
    });

    this._route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('modalOpen')) {
        this.modalOpen = true;
        this._document.body.classList.add('modal-open');
      }
    });
  }

  ngOnDestroy(): void {
    this._document.body.classList.remove('modal-open');
  }
}
