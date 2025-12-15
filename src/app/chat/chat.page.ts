import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  ellipsisVertical,
  person,
  chatbubbles,
  calendar,
  helpCircle,
  chevronBack,
  menuOutline
} from 'ionicons/icons';

interface ChatConversation {
  id: number;
  name: string;
  avatar: string;
  isGroup: boolean;
  lastMessage: string;
  senderName?: string;
  time: string;
  unreadCount: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ChatPage implements OnInit {

  conversations: ChatConversation[] = [];
  isMenuOpen = false;

  constructor(private navCtrl: NavController) {
    addIcons({ ellipsisVertical, person, chatbubbles, calendar, helpCircle, chevronBack, menuOutline });
  }

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.conversations = [
      {
        id: 1,
        name: 'Diretora Lívia Villar',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        isGroup: false,
        lastMessage: 'Bom dia, Maria! Tudo bem? Conseguiu os documentos p...',
        time: '09:55',
        unreadCount: 1
      },
      {
        id: 2,
        name: 'Psicóloga Adelaide Hamej',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        isGroup: false,
        lastMessage: 'Sim, se possível pegar todos esses listados, é melhor ain...',
        time: '08:12',
        unreadCount: 1
      },
      {
        id: 3,
        name: 'Turma 6º Ano - D',
        avatar: '6D',
        isGroup: true,
        senderName: 'Michelle Souza',
        lastMessage: 'Lívia me disse ontem. Mesmo assim obri...',
        time: 'Ontem',
        unreadCount: 0
      },
      {
        id: 4,
        name: 'Festa do Dia das Crianças - 6º D',
        avatar: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80',
        isGroup: false,
        senderName: 'Lívia Villar',
        lastMessage: 'Lembrando que é importante a presença de ...',
        time: 'Ontem',
        unreadCount: 1
      }
    ];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToHome() {
    this.navCtrl.navigateBack('/home');
  }

  goToCalendar() {
    this.navCtrl.navigateForward('/calendar');
  }

  openChat(chat: ChatConversation) {
    let navigationExtras: NavigationExtras = {
      state: {
        conversation: chat
      }
    };
    this.navCtrl.navigateForward(['chat-detail'], navigationExtras);
  }
}