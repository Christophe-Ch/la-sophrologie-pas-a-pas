import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsLegalesPageComponent } from './mentions-legales-page.component';

describe('MentionsLegalesPageComponent', () => {
  let component: MentionsLegalesPageComponent;
  let fixture: ComponentFixture<MentionsLegalesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionsLegalesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentionsLegalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
