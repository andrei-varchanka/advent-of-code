import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXIIComponent } from './day-xii.component';

describe('DayXIIComponent', () => {
  let component: DayXIIComponent;
  let fixture: ComponentFixture<DayXIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
