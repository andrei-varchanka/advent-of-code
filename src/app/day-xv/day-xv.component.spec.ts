import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXVComponent } from './day-xv.component';

describe('DayXVComponent', () => {
  let component: DayXVComponent;
  let fixture: ComponentFixture<DayXVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
