import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayIXComponent } from './day-ix.component';

describe('DayIXComponent', () => {
  let component: DayIXComponent;
  let fixture: ComponentFixture<DayIXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayIXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayIXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
