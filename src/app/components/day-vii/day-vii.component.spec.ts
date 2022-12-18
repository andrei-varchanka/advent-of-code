import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayVIIComponent } from './day-vii.component';

describe('DayVIIComponent', () => {
  let component: DayVIIComponent;
  let fixture: ComponentFixture<DayVIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayVIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayVIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
