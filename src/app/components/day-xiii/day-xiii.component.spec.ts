import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXIIIComponent } from './day-xiii.component';

describe('DayXIIIComponent', () => {
  let component: DayXIIIComponent;
  let fixture: ComponentFixture<DayXIIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXIIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
