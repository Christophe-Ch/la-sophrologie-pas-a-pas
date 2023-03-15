import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-sophrologie-page',
  templateUrl: './sophrologie-page.component.html',
  styleUrls: ['./sophrologie-page.component.scss']
})
export class SophrologiePageComponent {
  constructor(titleService: TitleService) {
    titleService.setTitle('Sophrologie');
  }
}
