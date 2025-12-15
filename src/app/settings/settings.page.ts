import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { 
  arrowBack, personOutline, notificationsOutline, 
  lockClosedOutline, logOutOutline, chevronForward, helpCircleOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  notificationsEnabled: boolean = true;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {
    addIcons({ 
      arrowBack, personOutline, notificationsOutline, 
      lockClosedOutline, logOutOutline, chevronForward, helpCircleOutline 
    });
  }

  ngOnInit() { }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  async toggleNotifications() {
    const message = this.notificationsEnabled ? 'Notificações Ativadas' : 'Notificações Desativadas';
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  async onLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Sair da Conta',
      message: 'Tem certeza que deseja sair do aplicativo?',
      cssClass: 'custom-logout-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Sair',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.authService.logout();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });
    await alert.present();
  }
}