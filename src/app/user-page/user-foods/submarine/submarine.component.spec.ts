import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmarineComponent } from './submarine.component';

describe('SubmarineComponent', () => {
  let component: SubmarineComponent;
  let fixture: ComponentFixture<SubmarineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmarineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmarineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
