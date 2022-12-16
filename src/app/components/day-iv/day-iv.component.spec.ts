import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayIVComponent } from './day-iv.component';

describe('DayIVComponent', () => {
  let component: DayIVComponent;
  let fixture: ComponentFixture<DayIVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayIVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayIVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
