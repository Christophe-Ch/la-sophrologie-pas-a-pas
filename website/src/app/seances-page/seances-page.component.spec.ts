import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancesPageComponent } from './seances-page.component';

describe('SeancesPageComponent', () => {
  let component: SeancesPageComponent;
  let fixture: ComponentFixture<SeancesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeancesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeancesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
