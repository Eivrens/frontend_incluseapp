import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { send, arrowBack, ellipsisVertical } from 'ionicons/icons';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatDetailPage implements OnInit {
  
  @ViewChild(IonContent) content: IonContent | any;

  // Dados do contato recebido da tela anterior
  contact: any = {
    name: 'Usuário',
    avatar: 'assets/icon/favicon.png',
    isGroup: false
  };

  newMessage: string = '';
  
  // Mensagens iniciais fictícias
  messages = [
    { user: 'other', text: 'Olá! Como posso ajudar hoje?', time: '09:00' },
  ];

  constructor(private navCtrl: NavController, private router: Router) {
    addIcons({ send, arrowBack, ellipsisVertical });

    // Pega os dados passados pela navegação
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.contact = navigation.extras.state['conversation'];
    }
  }

  ngOnInit() { }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Adiciona mensagem na tela (Simulação)
    this.messages.push({
      user: 'me',
      text: this.newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.newMessage = '';

    // Rola para baixo
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 100);
  }

  goBack() {
    this.navCtrl.navigateBack('/chat');
  }
}