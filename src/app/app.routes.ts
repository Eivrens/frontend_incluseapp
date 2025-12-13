import { Routes } from '@angular/router';
import { CoordinatorGuard } from './guards/coordinator.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.page').then(m => m.ChatPage)
  },
  {
    path: 'chat-detail',
    loadComponent: () => import('./chat-detail/chat-detail.page').then(m => m.ChatDetailPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.page').then(m => m.CalendarPage)
  },
  {
    path: 'coordinator-dashboard',
    loadComponent: () => import('./coordinator-dashboard/coordinator-dashboard.page').then(m => m.CoordinatorDashboardPage),
    canActivate: [CoordinatorGuard]
  },
];