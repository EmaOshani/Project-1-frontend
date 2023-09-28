import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBevarageComponent } from './admin-bevarage.component';

describe('AdminBevarageComponent', () => {
  let component: AdminBevarageComponent;
  let fixture: ComponentFixture<AdminBevarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBevarageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBevarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
