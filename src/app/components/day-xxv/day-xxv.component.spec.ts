import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXXVComponent } from './day-xxv.component';

describe('DayXXVComponent', () => {
  let component: DayXXVComponent;
  let fixture: ComponentFixture<DayXXVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXXVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXXVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
