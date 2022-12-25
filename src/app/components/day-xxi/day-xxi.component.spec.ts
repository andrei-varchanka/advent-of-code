import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXXIComponent } from './day-xxi.component';

describe('DayXXIComponent', () => {
  let component: DayXXIComponent;
  let fixture: ComponentFixture<DayXXIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXXIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXXIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
