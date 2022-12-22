import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXIComponent } from './day-xi.component';

describe('DayXIComponent', () => {
  let component: DayXIComponent;
  let fixture: ComponentFixture<DayXIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
