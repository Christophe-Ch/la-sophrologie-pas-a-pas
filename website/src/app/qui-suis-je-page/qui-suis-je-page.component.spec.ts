import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiSuisJePageComponent } from './qui-suis-je-page.component';

describe('QuiSuisJePageComponent', () => {
  let component: QuiSuisJePageComponent;
  let fixture: ComponentFixture<QuiSuisJePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuiSuisJePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuiSuisJePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
