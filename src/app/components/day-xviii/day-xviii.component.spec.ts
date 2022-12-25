import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXVIIIComponent } from './day-xviii.component';

describe('DayXVIIIComponent', () => {
  let component: DayXVIIIComponent;
  let fixture: ComponentFixture<DayXVIIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXVIIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXVIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
