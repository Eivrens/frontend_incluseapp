import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinkStudentParentModalComponent } from './link-student-parent-modal.component';

describe('LinkStudentParentModalComponent', () => {
  let component: LinkStudentParentModalComponent;
  let fixture: ComponentFixture<LinkStudentParentModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LinkStudentParentModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkStudentParentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
