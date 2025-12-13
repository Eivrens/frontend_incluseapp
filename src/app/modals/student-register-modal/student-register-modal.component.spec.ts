import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentRegisterModalComponent } from './student-register-modal.component';

describe('StudentRegisterModalComponent', () => {
  let component: StudentRegisterModalComponent;
  let fixture: ComponentFixture<StudentRegisterModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StudentRegisterModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
