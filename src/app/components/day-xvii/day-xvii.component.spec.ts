import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXVIIComponent } from './day-xvii.component';

describe('DayXVIIComponent', () => {
  let component: DayXVIIComponent;
  let fixture: ComponentFixture<DayXVIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXVIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXVIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
