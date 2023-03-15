import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private _route: ActivatedRoute, titleService: TitleService) {
    titleService.setTitle('Tarifs');
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('modalOpen')) {
        this.modalOpen = true;
        document.body.classList.add('modal-open');
      }
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }
}
