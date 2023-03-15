import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-qui-suis-je-page',
  templateUrl: './qui-suis-je-page.component.html',
  styleUrls: ['./qui-suis-je-page.component.scss']
})
export class QuiSuisJePageComponent {
  constructor(titleService: TitleService) {
    titleService.setTitle('Qui suis-je ?');
  }
}
