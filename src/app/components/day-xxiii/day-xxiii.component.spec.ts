import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXXIIIComponent } from './day-xxiii.component';

describe('DayXXIIIComponent', () => {
  let component: DayXXIIIComponent;
  let fixture: ComponentFixture<DayXXIIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXXIIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXXIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
