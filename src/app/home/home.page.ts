import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import {
  settingsSharp,
  listOutline,
  barChartOutline,
  star,
  checkmarkCircleOutline,
  chatbubbleEllipsesOutline,
  chevronForwardCircle,
  menuOutline,
  person,
  chatbubbles,
  calendar,
  helpCircle,
  chevronBack,
  briefcaseOutline
} from 'ionicons/icons';

interface DashboardData {
  user: {
    name: string;
    avatar: string;
  };
  student: {
    name: string;
    school: string;
    class: string;
    avatar: string;
  };
  stats: {
    pendingTasks: number;
    nextClassDate: string;
    averageGrade: number;
    nextExam: string;
    messages: number;
  };
  commitments: {
    date: string;
    title: string;
    type: 'party' | 'exam' | 'meeting';
  }[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {

  data: DashboardData | null = null;
  isMenuOpen = false;
  isCoordinator = false;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {
    addIcons({
      settingsSharp,
      listOutline,
      barChartOutline,
      star,
      checkmarkCircleOutline,
      chatbubbleEllipsesOutline,
      chevronForwardCircle,
      menuOutline,
      person,
      chatbubbles,
      calendar,
      helpCircle,
      chevronBack,
      briefcaseOutline
    });
  }

  ngOnInit() {
    this.checkUserRole();
    this.loadDashboard();
    this.checkAccessDenied();
  }

  checkUserRole() {
    this.isCoordinator = this.authService.hasRole('COORDINATOR');
  }

  async checkAccessDenied() {
    this.route.queryParams.subscribe(async params => {
      if (params['accessDenied'] === 'true') {
        await this.showAccessDeniedAlert(params['requiredRole']);
        this.navCtrl.navigateRoot('/home', { replaceUrl: true });
      }
    });
  }

  async showAccessDeniedAlert(requiredRole?: string) {
    const alert = await this.alertCtrl.create({
      header: 'Acesso Negado',
      message: `Você não possui permissão para acessar esta área. ${requiredRole ? `Esta funcionalidade requer perfil de ${requiredRole}.` : 'Acesso restrito a administradores.'}`,
      cssClass: 'access-denied-alert',
      buttons: [
        {
          text: 'Entendi',
          cssClass: 'alert-button-confirm',
          role: 'cancel'
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  loadDashboard() {
    const currentUser = this.authService.currentUserValue;

    this.data = {
      user: {
        name: currentUser?.name || 'Usuário',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
      },
      student: {
        name: 'Maurício Fabrício da Silva',
        school: 'Escola Estadual Djalma',
        class: '6 Ano D',
        avatar: 'https://i.pinimg.com/736x/78/7f/b4/787fb4d6d5085e2c34d71611a0219d16.jpg'
      },
      stats: {
        pendingTasks: 2,
        nextClassDate: '08/10/2025',
        averageGrade: 8.2,
        nextExam: '15/10 • Prova de Matemática 2TRI',
        messages: 4
      },
      commitments: [
        { date: '11/10', title: 'Festa do Dia das Crianças da turma 6D', type: 'party' },
        { date: '14/10', title: 'Sessão bimestral com psicóloga', type: 'meeting' },
        { date: '20/10', title: 'Entrega do Trabalho de História', type: 'exam' }
      ]
    };
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToChat() {
    this.navCtrl.navigateForward('/chat');
  }

  goToSettings() {
    this.navCtrl.navigateForward('/settings');
  }

  goToCalendar() {
    this.navCtrl.navigateForward('/calendar');
  }

  goToCoordinatorDashboard() {
    this.navCtrl.navigateForward('/coordinator-dashboard');
  }
}