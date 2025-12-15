import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  chevronBack, ellipsisVertical, timeOutline, locationOutline, 
  person, chatbubbles, calendar, helpCircle, menuOutline, 
  alertCircle, chevronForward, caretDownOutline, calendarClearOutline 
} from 'ionicons/icons';

interface ScheduleItem {
  dateStr: string; // Formato YYYY-MM-DD para facilitar o filtro
  timeStart: string;
  timeEnd: string;
  title: string;
  location: string;
  type: 'class' | 'exam' | 'activity';
  status: 'now' | 'pending' | 'future';
  duration?: string;
  alert?: string;
}

interface DaySlot {
  fullDate: Date;
  dayNumber: string;
  weekDay: string;
  active: boolean;
  hasEvent: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarPage implements OnInit {

  isMenuOpen = false;
  
  // Controle de Data
  selectedDateISO: string = new Date().toISOString();
  currentMonth: string = '';
  
  // Dados para o Template
  days: DaySlot[] = []; // Régua de dias
  filteredSchedule: ScheduleItem[] = []; // Lista de eventos filtrada

  // Banco de Dados Simulado (Datas no formato YYYY-MM-DD)
  private allEvents: ScheduleItem[] = [];

  constructor(private navCtrl: NavController) {
    addIcons({ 
      chevronBack, ellipsisVertical, timeOutline, locationOutline, person, 
      chatbubbles, calendar, helpCircle, menuOutline, alertCircle, 
      chevronForward, caretDownOutline, calendarClearOutline 
    });
  }

  ngOnInit() {
    this.initializeFakeData();
    this.updateView(new Date()); // Inicia com a data de hoje
  }

  // Cria dados fictícios baseados na data de HOJE para você ver funcionando
  initializeFakeData() {
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    
    this.allEvents = [
      { 
        dateStr: this.formatDate(today),
        timeStart: '09:10', timeEnd: '10:00',
        title: 'Matemática - Álgebra', location: 'Sala 101', 
        type: 'class', status: 'now', duration: 'Agora'
      },
      { 
        dateStr: this.formatDate(today),
        timeStart: '10:10', timeEnd: '11:00',
        title: 'História Geral', location: 'Sala 302', 
        type: 'class', status: 'pending', duration: 'em 10min'
      },
      { 
        dateStr: this.formatDate(today),
        timeStart: '11:10', timeEnd: '12:00',
        title: 'Entrega de Trabalho', location: 'Secretaria', 
        type: 'activity', status: 'future', alert: 'Pendente'
      },
      { 
        dateStr: this.formatDate(tomorrow),
        timeStart: '08:00', timeEnd: '09:30',
        title: 'Educação Física', location: 'Quadra', 
        type: 'activity', status: 'future', duration: '08:00'
      },
      // Exemplo de data passada fixa
      { 
        dateStr: '2023-10-18',
        timeStart: '14:00', timeEnd: '16:00',
        title: 'Prova Antiga', location: 'Lab 2', 
        type: 'exam', status: 'future'
      }
    ];
  }

  // Formata Data para YYYY-MM-DD (Local)
  formatDate(date: Date): string {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - (offset * 60 * 1000));
    return local.toISOString().split('T')[0];
  }

  // Chamado pelo DatePicker
  onDateChange(event: any) {
    if (event.detail.value) {
      this.updateView(new Date(event.detail.value));
    }
  }

  // Atualiza tudo na tela (Régua e Lista)
  updateView(date: Date) {
    this.selectedDateISO = date.toISOString();
    
    // Atualiza Título do Mês
    const monthName = date.toLocaleDateString('pt-BR', { month: 'long' });
    this.currentMonth = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${date.getFullYear()}`;

    this.generateDaysStrip(date);
    this.filterSchedule(date);
  }

  // Gera a régua de 5 dias (2 antes, selecionado, 2 depois)
  generateDaysStrip(centerDate: Date) {
    this.days = [];
    for (let i = -2; i <= 2; i++) {
      const d = new Date(centerDate);
      d.setDate(centerDate.getDate() + i);
      const dStr = this.formatDate(d);
      
      const hasEvent = this.allEvents.some(e => e.dateStr === dStr);

      this.days.push({
        fullDate: d,
        dayNumber: d.getDate().toString(),
        weekDay: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
        active: i === 0, // O dia do centro é o ativo
        hasEvent: hasEvent
      });
    }
  }

  // Ao clicar num dia da régua
  selectDay(daySlot: DaySlot) {
    this.updateView(daySlot.fullDate);
  }

  // Filtra os eventos para exibir
  filterSchedule(date: Date) {
    const dateStr = this.formatDate(date);
    this.filteredSchedule = this.allEvents.filter(e => e.dateStr === dateStr);
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  goBack() { this.navCtrl.navigateBack('/home'); }
  goToChat() { this.navCtrl.navigateForward('/chat'); }
}