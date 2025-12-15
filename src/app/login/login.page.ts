import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LoginPage {

  selectedType = 'student';
  isSuccess = false;
  
  credentials = {
    cpf: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    this.credentials.cpf = value;
    event.target.value = value;
  }

  async onLogin() {
    const isLogged = this.authService.login(
      this.credentials.cpf,
      this.credentials.password,
      this.selectedType
    );

    if (isLogged) {
      this.isSuccess = true;

      setTimeout(() => {
        const userRole = this.authService.userRole;

        if (userRole === 'COORDINATOR') {
          this.navCtrl.navigateForward('/coordinator-dashboard');
        } else {
          this.navCtrl.navigateForward('/home');
        }

        setTimeout(() => this.isSuccess = false, 500);
      }, 1000);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Usuário ou senha inválidos.',
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      });
      toast.present();
    }
  }
}