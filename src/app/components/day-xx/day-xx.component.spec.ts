import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXXComponent } from './day-xx.component';

describe('DayXXComponent', () => {
  let component: DayXXComponent;
  let fixture: ComponentFixture<DayXXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
