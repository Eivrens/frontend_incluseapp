import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommitmentModalComponent } from './commitment-modal.component';

describe('CommitmentModalComponent', () => {
  let component: CommitmentModalComponent;
  let fixture: ComponentFixture<CommitmentModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommitmentModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommitmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
