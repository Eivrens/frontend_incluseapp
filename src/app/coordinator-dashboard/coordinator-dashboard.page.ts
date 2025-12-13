import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personAddOutline,
  peopleOutline,
  linkOutline,
  calendarOutline,
  chevronBack,
  searchOutline,
  addCircleOutline,
  schoolOutline,
  statsChartOutline,
  notificationsOutline,
  closeOutline,
  checkmarkCircleOutline,
  trashOutline,
  createOutline,
  documentLockOutline  // ADICIONADO: ícone de prova
} from 'ionicons/icons';

// Modal Components (serão importados quando criados)
import { StudentRegisterModalComponent } from '../modals/student-register-modal/student-register-modal.component';
import { ParentRegisterModalComponent } from '../modals/parent-register-modal/parent-register-modal.component';
import { LinkStudentParentModalComponent } from '../modals/link-student-parent-modal/link-student-parent-modal.component';
import { CommitmentModalComponent } from '../modals/commitment-modal/commitment-modal.component';

interface Class {
  id: string;
  name: string;
  year: string;
  students: number;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  class: string;
  status: 'active' | 'inactive';
}

interface Parent {
  id: string;
  name: string;
  email: string;
  cpf: string;
  students: string[];
}

interface Commitment {
  id: string;
  title: string;
  date: string;
  time: string;
  class: string;
  type: 'exam' | 'meeting' | 'event' | 'activity';
}

interface DashboardStats {
  totalStudents: number;
  totalParents: number;
  activeCommitments: number;
  pendingLinks: number;
}

@Component({
  selector: 'app-coordinator-dashboard',
  templateUrl: './coordinator-dashboard.page.html',
  styleUrls: ['./coordinator-dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CoordinatorDashboardPage implements OnInit {

  // Dados do Dashboard
  selectedClass: string = 'all';
  searchTerm: string = '';
  
  classes: Class[] = [];
  students: Student[] = [];
  parents: Parent[] = [];
  commitments: Commitment[] = [];
  stats: DashboardStats = {
    totalStudents: 0,
    totalParents: 0,
    activeCommitments: 0,
    pendingLinks: 0
  };

  // Dados filtrados
  filteredStudents: Student[] = [];
  filteredCommitments: Commitment[] = [];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
    addIcons({
      personAddOutline,
      peopleOutline,
      linkOutline,
      calendarOutline,
      chevronBack,
      searchOutline,
      addCircleOutline,
      schoolOutline,
      statsChartOutline,
      notificationsOutline,
      closeOutline,
      checkmarkCircleOutline,
      trashOutline,
      createOutline,
      documentLockOutline  // ADICIONADO
    });
  }

  ngOnInit() {
    this.loadMockData();
    this.updateFilters();
  }

  // Carrega dados mockados (será substituído por API)
  loadMockData() {
    // Turmas
    this.classes = [
      { id: '1', name: '6º Ano - A', year: '2025', students: 28 },
      { id: '2', name: '6º Ano - B', year: '2025', students: 30 },
      { id: '3', name: '6º Ano - C', year: '2025', students: 26 },
      { id: '4', name: '6º Ano - D', year: '2025', students: 32 },
      { id: '5', name: '7º Ano - A', year: '2025', students: 25 }
    ];

    // Alunos
    this.students = [
      {
        id: '1',
        name: 'Maurício Fabrício da Silva',
        avatar: 'https://i.pinimg.com/736x/78/7f/b4/787fb4d6d5085e2c34d71611a0219d16.jpg',
        class: '6º Ano - D',
        status: 'active'
      },
      {
        id: '2',
        name: 'Ana Carolina Santos',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        class: '6º Ano - D',
        status: 'active'
      },
      {
        id: '3',
        name: 'Pedro Henrique Oliveira',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        class: '6º Ano - A',
        status: 'active'
      },
      {
        id: '4',
        name: 'Julia Ferreira Lima',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        class: '7º Ano - A',
        status: 'active'
      }
    ];

    // Responsáveis
    this.parents = [
      {
        id: '1',
        name: 'Maria Betânia da Silva',
        email: 'maria.silva@email.com',
        cpf: '123.456.789-00',
        students: ['1']
      },
      {
        id: '2',
        name: 'João Santos',
        email: 'joao.santos@email.com',
        cpf: '987.654.321-00',
        students: ['2']
      }
    ];

    // Compromissos
    this.commitments = [
      {
        id: '1',
        title: 'Reunião de Pais - 6º Ano D',
        date: '2025-12-15',
        time: '14:00',
        class: '6º Ano - D',
        type: 'meeting'
      },
      {
        id: '2',
        title: 'Prova de Matemática',
        date: '2025-12-18',
        time: '09:00',
        class: '6º Ano - D',
        type: 'exam'
      },
      {
        id: '3',
        title: 'Festa de Encerramento',
        date: '2025-12-20',
        time: '15:00',
        class: 'Todas',
        type: 'event'
      }
    ];

    // Estatísticas
    this.stats = {
      totalStudents: this.students.length,
      totalParents: this.parents.length,
      activeCommitments: this.commitments.length,
      pendingLinks: 2
    };
  }

  // Atualiza filtros
  updateFilters() {
    // Filtrar por turma
    if (this.selectedClass === 'all') {
      this.filteredStudents = this.students;
      this.filteredCommitments = this.commitments;
    } else {
      const className = this.classes.find(c => c.id === this.selectedClass)?.name;
      this.filteredStudents = this.students.filter(s => s.class === className);
      this.filteredCommitments = this.commitments.filter(c => 
        c.class === className || c.class === 'Todas'
      );
    }

    // Filtrar por busca
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.filteredStudents = this.filteredStudents.filter(s =>
        s.name.toLowerCase().includes(term)
      );
    }
  }

  onClassChange() {
    this.updateFilters();
  }

  onSearch() {
    this.updateFilters();
  }

  // Abrir Modais
  async openStudentRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: StudentRegisterModalComponent,
      cssClass: 'custom-modal'
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        // Adicionar novo aluno
        console.log('Novo aluno:', result.data);
        this.loadMockData(); // Recarregar dados
      }
    });

    return await modal.present();
  }

  async openParentRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: ParentRegisterModalComponent,
      cssClass: 'custom-modal'
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Novo responsável:', result.data);
        this.loadMockData();
      }
    });

    return await modal.present();
  }

  async openLinkModal() {
    const modal = await this.modalCtrl.create({
      component: LinkStudentParentModalComponent,
      cssClass: 'custom-modal',
      componentProps: {
        students: this.students,
        parents: this.parents
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Vínculo criado:', result.data);
        this.loadMockData();
      }
    });

    return await modal.present();
  }

  async openCommitmentModal() {
    const modal = await this.modalCtrl.create({
      component: CommitmentModalComponent,
      cssClass: 'custom-modal',
      componentProps: {
        classes: this.classes
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Novo compromisso:', result.data);
        this.loadMockData();
      }
    });

    return await modal.present();
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

  // Retorna o ícone adequado para cada tipo de compromisso
  getCommitmentIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'exam': 'document-lock-outline',        // PROVA/AVALIAÇÃO
      'meeting': 'people-outline',            // REUNIÃO
      'event': 'calendar-outline',            // EVENTO
      'activity': 'create-outline'            // ATIVIDADE
    };
    return icons[type] || 'calendar-outline';
  }
}