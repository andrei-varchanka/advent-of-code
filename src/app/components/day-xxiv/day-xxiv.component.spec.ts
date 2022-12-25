import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXXIVComponent } from './day-xxiv.component';

describe('DayXXIVComponent', () => {
  let component: DayXXIVComponent;
  let fixture: ComponentFixture<DayXXIVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXXIVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXXIVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
