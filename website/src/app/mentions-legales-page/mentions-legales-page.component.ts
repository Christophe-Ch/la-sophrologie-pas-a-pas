import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-mentions-legales-page',
  templateUrl: './mentions-legales-page.component.html',
  styleUrls: ['./mentions-legales-page.component.scss']
})
export class MentionsLegalesPageComponent {
  constructor(titleService: TitleService) {
    titleService.setTitle('Mentions légales');
  }
}
