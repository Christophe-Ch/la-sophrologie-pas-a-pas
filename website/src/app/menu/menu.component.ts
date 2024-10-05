import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild('close') private _closeToggle!: ElementRef;
  @ViewChild('submenuToggle') private _submenuToggle!: ElementRef;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        (this._closeToggle.nativeElement as HTMLInputElement).checked = false;
      });
  }

  showSubmenu(): void {
    (this._submenuToggle.nativeElement as HTMLInputElement).checked = true;
  }

  closeSubmenu(): void {
    (this._submenuToggle.nativeElement as HTMLInputElement).checked = false;
  }
}
