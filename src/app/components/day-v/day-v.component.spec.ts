import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayVComponent } from './day-v.component';

describe('DayVComponent', () => {
  let component: DayVComponent;
  let fixture: ComponentFixture<DayVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
