import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule, ModalController } from '@ionic/angular'
import { addIcons } from 'ionicons'
import {
  closeOutline,
  peopleOutline,
  mailOutline,
  callOutline,
  cardOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons'

@Component({
  selector: 'app-parent-register-modal',
  templateUrl: './parent-register-modal.component.html',
  styleUrls: ['./parent-register-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ParentRegisterModalComponent {
  parent = {
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    relationship: '',
    password: '',
    confirmPassword: ''
  }

  showPassword = false
  showConfirmPassword = false

  constructor(private modalCtrl: ModalController) {
    addIcons({
      closeOutline,
      peopleOutline,
      mailOutline,
      callOutline,
      cardOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      checkmarkCircleOutline
    })
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword
    } else {
      this.showConfirmPassword = !this.showConfirmPassword
    }
  }

  formatPhone(event: any, fieldName: string) {
    let value = event.target.value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
    this.parent.phone = value
  }

  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    this.parent.cpf = value
  }

  save() {
    this.modalCtrl.dismiss(this.parent, 'confirm')
  }
}