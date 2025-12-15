import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  closeOutline, checkmarkCircleOutline, calendarOutline, 
  timeOutline, schoolOutline, alertCircleOutline 
} from 'ionicons/icons';

interface Class {
  id: string;
  name: string;
  year: string;
  students: number;
}

interface CommitmentForm {
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'exam' | 'meeting' | 'event' | 'activity' | '';
  classes: string[];
  location: string;
  notifyParents: boolean;
}

@Component({
  selector: 'app-commitment-modal',
  templateUrl: './commitment-modal.component.html',
  styleUrls: ['./commitment-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CommitmentModalComponent implements OnInit {

  @Input() classes: Class[] = [];

  commitment: CommitmentForm = {
    title: '',
    description: '',
    date: '',
    time: '',
    type: '',
    classes: [],
    location: '',
    notifyParents: true
  };

  commitmentTypes = [
    { value: 'exam', label: 'Prova/Avaliação', emoji: '📝', icon: 'document-text-outline', color: 'danger' },
    { value: 'meeting', label: 'Reunião', emoji: '👥', icon: 'people-outline', color: 'primary' },
    { value: 'event', label: 'Evento', emoji: '🎉', icon: 'calendar-outline', color: 'warning' },
    { value: 'activity', label: 'Atividade', emoji: '📚', icon: 'clipboard-outline', color: 'success' }
  ];

  allClassesSelected = false;
  minDate: string = '';
  maxDate: string = '';

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    addIcons({ 
      closeOutline, checkmarkCircleOutline, calendarOutline, 
      timeOutline, schoolOutline, alertCircleOutline 
    });
  }

  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
    const maxDateObj = new Date();
    maxDateObj.setFullYear(today.getFullYear() + 5);
    this.maxDate = maxDateObj.toISOString().split('T')[0];
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  selectType(type: string) {
    this.commitment.type = type as any;
  }

  toggleAllClasses() {
    if (this.allClassesSelected) {
      this.commitment.classes = [];
      this.allClassesSelected = false;
    } else {
      this.commitment.classes = this.classes.map(c => c.id);
      this.allClassesSelected = true;
    }
  }

  toggleClass(classId: string) {
    const index = this.commitment.classes.indexOf(classId);
    if (index > -1) {
      this.commitment.classes.splice(index, 1);
    } else {
      this.commitment.classes.push(classId);
    }
    
    this.allClassesSelected = this.commitment.classes.length === this.classes.length;
  }

  isClassSelected(classId: string): boolean {
    return this.commitment.classes.includes(classId);
  }

  getSelectedClassesText(): string {
    if (this.allClassesSelected) {
      return 'Todas as turmas';
    }
    if (this.commitment.classes.length === 0) {
      return 'Nenhuma turma selecionada';
    }
    return `${this.commitment.classes.length} turma(s) selecionada(s)`;
  }

  async save() {
    if (!this.commitment.title) {
      const toast = await this.toastCtrl.create({
        message: 'Digite o título do compromisso',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    if (!this.commitment.date) {
      const toast = await this.toastCtrl.create({
        message: 'Selecione a data',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    if (!this.commitment.time) {
      const toast = await this.toastCtrl.create({
        message: 'Selecione o horário',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    if (!this.commitment.type) {
      const toast = await this.toastCtrl.create({
        message: 'Selecione o tipo de compromisso',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    if (this.commitment.classes.length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Selecione pelo menos uma turma',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    const toast = await this.toastCtrl.create({
      message: 'Compromisso criado com sucesso!',
      duration: 2000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    toast.present();

    this.modalCtrl.dismiss(this.commitment);
  }
}