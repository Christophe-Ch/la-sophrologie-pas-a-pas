import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SophrologiePageComponent } from './sophrologie-page.component';

describe('SophrologiePageComponent', () => {
  let component: SophrologiePageComponent;
  let fixture: ComponentFixture<SophrologiePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SophrologiePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SophrologiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
