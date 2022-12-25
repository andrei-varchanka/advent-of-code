import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXIVComponent } from './day-xiv.component';

describe('DayXIVComponent', () => {
  let component: DayXIVComponent;
  let fixture: ComponentFixture<DayXIVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXIVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXIVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
