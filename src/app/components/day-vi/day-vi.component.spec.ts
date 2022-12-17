import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayVIComponent } from './day-vi.component';

describe('DayVIComponent', () => {
  let component: DayVIComponent;
  let fixture: ComponentFixture<DayVIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayVIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayVIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
