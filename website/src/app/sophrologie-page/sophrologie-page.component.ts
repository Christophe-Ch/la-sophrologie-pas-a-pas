import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-sophrologie-page',
  templateUrl: './sophrologie-page.component.html',
  styleUrls: ['./sophrologie-page.component.scss']
})
export class SophrologiePageComponent implements OnInit {
  constructor(private readonly _titleService: TitleService, private readonly _meta: Meta) { }

  ngOnInit(): void {
    this._titleService.setTitle('Sophrologie');
    this._meta.updateTag({
      name: 'description',
      content: 'Découvrez la sophrologie et ses bienfaits sur le corps et l\'esprit. Cette méthode de relaxation et de développement personnel peut aider à réduire le stress, améliorer le sommeil, augmenter la confiance en soi et plus encore. La sophrologie s\'adresse à tous, des enfants aux adultes.'
    });
    this._meta.updateTag({
      name: 'keywords',
      content: 'sophrologie, relaxation, développement personnel, stress, sommeil, confiance en soi, enfants, adultes'
    });
  }
}
