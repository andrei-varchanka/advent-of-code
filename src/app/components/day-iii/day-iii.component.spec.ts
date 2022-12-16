import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayIIIComponent } from './day-iii.component';

describe('DayIIIComponent', () => {
  let component: DayIIIComponent;
  let fixture: ComponentFixture<DayIIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayIIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
