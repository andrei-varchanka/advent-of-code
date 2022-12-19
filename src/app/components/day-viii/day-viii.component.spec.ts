import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayVIIIComponent } from './day-viii.component';

describe('DayVIIIComponent', () => {
  let component: DayVIIIComponent;
  let fixture: ComponentFixture<DayVIIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayVIIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayVIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
