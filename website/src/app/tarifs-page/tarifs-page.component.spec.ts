import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifsPageComponent } from './tarifs-page.component';

describe('TarifsPageComponent', () => {
  let component: TarifsPageComponent;
  let fixture: ComponentFixture<TarifsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
