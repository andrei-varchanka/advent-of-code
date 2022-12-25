import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayXIXComponent } from './day-xix.component';

describe('DayXIXComponent', () => {
  let component: DayXIXComponent;
  let fixture: ComponentFixture<DayXIXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayXIXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayXIXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
