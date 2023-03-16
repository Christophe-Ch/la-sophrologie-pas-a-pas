import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TitleService } from '../title.service';

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

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _titleService: TitleService,
    private readonly _meta: Meta,
    @Inject(DOCUMENT) private readonly _document: Document
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle('Déroulement des séances');
    this._meta.updateTag({
      name: 'description',
      content: 'Je propose différents types de séances de sophrologie adaptées à vos besoins. Vous pouvez bénéficier de séances individuelles pour une attention personnalisée, ou rejoindre l\'un de mes groupes de sophrologie pour partager une expérience de relaxation et de développement personnel avec d\'autres. Mes séances comprennent la gestion du stress, la relaxation, la préparation mentale, le développement personnel et plus encore.'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'séances de sophrologie, gestion du stress, relaxation, préparation mentale, développement personnel, sophrologie pour enfants, sophrologie pour adultes'
    });

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.openModalType = params.get('type') as SessionType;
      if (this.openModalType !== null) {
        this._document.body.classList.add('modal-open')
      }
    });
  }

  ngOnDestroy(): void {
    this._document.body.classList.remove('modal-open');
  }
}
