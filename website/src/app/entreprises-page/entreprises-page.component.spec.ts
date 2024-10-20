import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorsPageComponent } from './seniors-page.component';

describe('QuiSuisJePageComponent', () => {
  let component: SeniorsPageComponent;
  let fixture: ComponentFixture<SeniorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeniorsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeniorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
