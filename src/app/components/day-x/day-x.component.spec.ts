import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXComponent } from './day-x.component';

describe('DayXComponent', () => {
  let component: DayXComponent;
  let fixture: ComponentFixture<DayXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
