import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrispyComponent } from './crispy.component';

describe('CrispyComponent', () => {
  let component: CrispyComponent;
  let fixture: ComponentFixture<CrispyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrispyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrispyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
