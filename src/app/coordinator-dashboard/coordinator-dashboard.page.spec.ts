import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordinatorDashboardPage } from './coordinator-dashboard.page';

describe('CoordinatorDashboardPage', () => {
  let component: CoordinatorDashboardPage;
  let fixture: ComponentFixture<CoordinatorDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
