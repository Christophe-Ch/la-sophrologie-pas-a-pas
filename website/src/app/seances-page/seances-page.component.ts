import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

enum ModalType {
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
  modalType = ModalType;

  openModalType?: ModalType;
  previousScroll = 0;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.openModalType = params.get('type') as ModalType;
      if (this.openModalType !== null) {
        document.body.classList.add('modal-open')
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }
}
