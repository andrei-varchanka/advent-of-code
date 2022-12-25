import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXVIComponent } from './day-xvi.component';

describe('DayXVIComponent', () => {
  let component: DayXVIComponent;
  let fixture: ComponentFixture<DayXVIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXVIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXVIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
