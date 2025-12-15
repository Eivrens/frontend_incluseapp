import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline, checkmarkCircleOutline, personOutline, calendarOutline, schoolOutline } from 'ionicons/icons';

interface StudentForm {
  fullName: string;
  cpf: string;
  birthDate: string;
  class: string;
  gender: string;
  address: string;
  specialNeeds: string;
  allergies: string;
  medications: string;
  observations: string;
}

@Component({
  selector: 'app-student-register-modal',
  templateUrl: './student-register-modal.component.html',
  styleUrls: ['./student-register-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StudentRegisterModalComponent implements OnInit {

  student: StudentForm = {
    fullName: '',
    cpf: '',
    birthDate: '',
    class: '',
    gender: '',
    address: '',
    specialNeeds: '',
    allergies: '',
    medications: '',
    observations: ''
  };

  maxBirthDate: string = '';
  minBirthDate: string = '';

  classes = [
    '6º Ano - A',
    '6º Ano - B',
    '6º Ano - C',
    '6º Ano - D',
    '7º Ano - A',
    '7º Ano - B',
    '8º Ano - A',
    '9º Ano - A'
  ];

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    addIcons({ closeOutline, checkmarkCircleOutline, personOutline, calendarOutline, schoolOutline });
  }

  ngOnInit() {
    const today = new Date();
    this.maxBirthDate = today.toISOString().split('T')[0];
    
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100);
    this.minBirthDate = minDate.toISOString().split('T')[0];
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.student.cpf = value;
    event.target.value = value;
  }

  async save() {
    if (!this.student.fullName || !this.student.cpf || !this.student.birthDate || !this.student.class) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos obrigatórios',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    const toast = await this.toastCtrl.create({
      message: 'Aluno cadastrado com sucesso!',
      duration: 2000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    toast.present();

    this.modalCtrl.dismiss(this.student);
  }
}