import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParentRegisterModalComponent } from './parent-register-modal.component';

describe('ParentRegisterModalComponent', () => {
  let component: ParentRegisterModalComponent;
  let fixture: ComponentFixture<ParentRegisterModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ParentRegisterModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
