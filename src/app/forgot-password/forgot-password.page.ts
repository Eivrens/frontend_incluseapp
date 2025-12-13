import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mailOutline, chevronBackOutline, alertCircleOutline, checkmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordPage {

  email: string = '';
  isSent: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    addIcons({ mailOutline, chevronBackOutline, alertCircleOutline, checkmarkOutline });
  }

  get isValidEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.email);
  }

  async onRecover() {
    if (this.isValidEmail) {
      this.isSent = true;
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, digite um e-mail válido.',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/login');
  }
}