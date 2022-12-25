import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXXIIComponent } from './day-xxii.component';

describe('DayXXIIComponent', () => {
  let component: DayXXIIComponent;
  let fixture: ComponentFixture<DayXXIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXXIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXXIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
