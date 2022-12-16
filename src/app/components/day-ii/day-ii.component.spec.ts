import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayIiComponent } from './day-ii.component';

describe('DayIiComponent', () => {
  let component: DayIiComponent;
  let fixture: ComponentFixture<DayIiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayIiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
