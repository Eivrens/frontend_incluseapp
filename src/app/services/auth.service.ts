import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'COORDINATOR' | 'TEACHER' | 'PARENT' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  private mockDatabase: Record<
    string,
    { token: string; user: User; password: string }
  > = {
    '123.456.789-00': {
      token: 'mock_token_parent_abc123',
      user: {
        id: 'usr_001',
        name: 'Maria Betânia da Silva',
        cpf: '123.456.789-00',
        email: 'maria.silva@email.com',
        role: 'PARENT',
      },
      password: 'Maria#19820225',
    },
    '987.654.321-00': {
      token: 'mock_token_coordinator_xyz789',
      user: {
        id: 'usr_002',
        name: 'Lívia Villar',
        cpf: '987.654.321-00',
        email: 'livia.villar@escola.edu.br',
        role: 'COORDINATOR',
      },
      password: 'Livia#19711208',
    },
    '111.222.333-44': {
      token: 'mock_token_teacher_def456',
      user: {
        id: 'usr_003',
        name: 'Carlos Eduardo Santos',
        cpf: '111.222.333-44',
        email: 'carlos.santos@escola.edu.br',
        role: 'TEACHER',
      },
      password: 'Teacher#123456',
    },
    '590.167.064-70': {
      // Coordenador real
      token: 'mock_token_coordinator_livia',
      user: {
        id: 'usr_004',
        name: 'Lívia Villar',
        cpf: '590.167.064-70',
        email: 'livia.villar@email.com',
        role: 'COORDINATOR',
      },
      password: 'Livia#19711208',
    },
    '093.149.994-16': {
      // Responsável
      token: 'mock_token_parent_maria',
      user: {
        id: 'usr_005',
        name: 'Maria Betânia da Silva',
        cpf: '093.149.994-16',
        email: 'maria.silva@email.com',
        role: 'PARENT',
      },
      password: 'Maria#19820225',
    },
    '116.293.034-96': {
      // Estudante
      token: 'mock_token_student_mauricio',
      user: {
        id: 'usr_006',
        name: 'Maurício Fabrício da Silva',
        cpf: '116.293.034-96',
        email: 'mauricio.silva@email.com',
        role: 'STUDENT',
      },
      password: 'Mauricio#20130503',
    },
  };

  constructor() {
    const storedUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.getToken();
  }

  get userRole(): UserRole | null {
    return this.currentUserValue?.role || null;
  }

  hasRole(role: UserRole): boolean {
    return this.userRole === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  login(cpf: string, password: string, _userType: string): boolean {
    const normalizedCpf = cpf.replace(/\D/g, '');
    const formattedCpf = this.formatCpf(normalizedCpf);

    const authRecord = this.mockDatabase[formattedCpf];

    if (authRecord && authRecord.password === password) {
      this.setAuthSession({ token: authRecord.token, user: authRecord.user });
      return true;
    }

    return false;
  }

  logout(): void {
    this.clearAuthSession();
  }

  private setAuthSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    this.currentUserSubject.next(authResponse.user);
  }

  private clearAuthSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  private getUserFromStorage(): User | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userJson = localStorage.getItem(this.USER_KEY);

    if (!token || !userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson) as User;
    } catch {
      this.clearAuthSession();
      return null;
    }
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private formatCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
