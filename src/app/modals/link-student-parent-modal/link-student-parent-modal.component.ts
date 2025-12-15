import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline, checkmarkCircleOutline, linkOutline, personOutline, peopleOutline, searchOutline } from 'ionicons/icons';

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

@Component({
  selector: 'app-link-student-parent-modal',
  templateUrl: './link-student-parent-modal.component.html',
  styleUrls: ['./link-student-parent-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LinkStudentParentModalComponent implements OnInit {

  @Input() students: Student[] = [];
  @Input() parents: Parent[] = [];

  selectedParent: Parent | null = null;
  selectedStudents: string[] = [];
  
  searchTermParent: string = '';
  searchTermStudent: string = '';
  
  filteredParents: Parent[] = [];
  filteredStudents: Student[] = [];

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    addIcons({ 
      closeOutline, checkmarkCircleOutline, linkOutline, 
      personOutline, peopleOutline, searchOutline 
    });
  }

  ngOnInit() {
    this.filteredParents = [...this.parents];
    this.filteredStudents = [...this.students];
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onParentSearch() {
    if (this.searchTermParent) {
      const term = this.searchTermParent.toLowerCase();
      this.filteredParents = this.parents.filter(p =>
        p.name.toLowerCase().includes(term) || 
        p.cpf.includes(term) ||
        p.email.toLowerCase().includes(term)
      );
    } else {
      this.filteredParents = [...this.parents];
    }
  }

  onStudentSearch() {
    if (this.searchTermStudent) {
      const term = this.searchTermStudent.toLowerCase();
      this.filteredStudents = this.students.filter(s =>
        s.name.toLowerCase().includes(term) || 
        s.class.toLowerCase().includes(term)
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  selectParent(parent: Parent) {
    this.selectedParent = parent;
  }

  toggleStudent(studentId: string) {
    const index = this.selectedStudents.indexOf(studentId);
    if (index > -1) {
      this.selectedStudents.splice(index, 1);
    } else {
      this.selectedStudents.push(studentId);
    }
  }

  isStudentSelected(studentId: string): boolean {
    return this.selectedStudents.includes(studentId);
  }

  async save() {
    if (!this.selectedParent) {
      const toast = await this.toastCtrl.create({
        message: 'Selecione um responsável',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    if (this.selectedStudents.length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Selecione pelo menos um aluno',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }

    // Sucesso
    const toast = await this.toastCtrl.create({
      message: `${this.selectedStudents.length} aluno(s) vinculado(s) com sucesso!`,
      duration: 2000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    toast.present();

    this.modalCtrl.dismiss({
      parentId: this.selectedParent.id,
      studentIds: this.selectedStudents
    });
  }
}

// TEMPLATE HTML: link-student-parent-modal.component.html
/*
<ion-header class="ion-no-border">
  <ion-toolbar class="modal-toolbar">
    <ion-title>Vincular Aluno ao Responsável</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="dismiss()">
        <ion-icon name="close-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="modal-content">
  <div class="link-form">
    
    <!-- SELEÇÃO DE RESPONSÁVEL -->
    <div class="form-section">
      <h3 class="section-title">
        <ion-icon name="people-outline"></ion-icon>
        1. Selecione o Responsável
      </h3>

      <ion-searchbar
        [(ngModel)]="searchTermParent"
        (ionInput)="onParentSearch()"
        placeholder="Buscar por nome, CPF ou e-mail..."
        mode="ios"
        class="custom-searchbar">
      </ion-searchbar>

      <div class="selection-area">
        <div 
          class="parent-card" 
          *ngFor="let parent of filteredParents"
          [class.selected]="selectedParent?.id === parent.id"
          (click)="selectParent(parent)">
          
          <div class="parent-info">
            <div class="parent-avatar">
              <ion-icon name="person-outline"></ion-icon>
            </div>
            <div class="parent-details">
              <h4>{{ parent.name }}</h4>
              <p>{{ parent.cpf }}</p>
              <p class="email">{{ parent.email }}</p>
            </div>
          </div>

          <div class="check-indicator" *ngIf="selectedParent?.id === parent.id">
            <ion-icon name="checkmark-circle"></ion-icon>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredParents.length === 0">
          <ion-icon name="people-outline"></ion-icon>
          <p>Nenhum responsável encontrado</p>
        </div>
      </div>

      <div class="selected-info" *ngIf="selectedParent">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
        <span>Responsável selecionado: <strong>{{ selectedParent.name }}</strong></span>
      </div>
    </div>

    <!-- SELEÇÃO DE ALUNOS -->
    <div class="form-section" [class.disabled]="!selectedParent">
      <h3 class="section-title">
        <ion-icon name="school-outline"></ion-icon>
        2. Selecione os Alunos
      </h3>

      <ion-searchbar
        [(ngModel)]="searchTermStudent"
        (ionInput)="onStudentSearch()"
        placeholder="Buscar por nome ou turma..."
        mode="ios"
        class="custom-searchbar"
        [disabled]="!selectedParent">
      </ion-searchbar>

      <div class="selection-area" [class.disabled-area]="!selectedParent">
        <div 
          class="student-card" 
          *ngFor="let student of filteredStudents"
          [class.selected]="isStudentSelected(student.id)"
          (click)="selectedParent && toggleStudent(student.id)">
          
          <ion-checkbox 
            [checked]="isStudentSelected(student.id)"
            [disabled]="!selectedParent">
          </ion-checkbox>

          <ion-avatar>
            <img [src]="student.avatar" [alt]="student.name" />
          </ion-avatar>

          <div class="student-info">
            <h4>{{ student.name }}</h4>
            <p>{{ student.class }}</p>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredStudents.length === 0 && selectedParent">
          <ion-icon name="school-outline"></ion-icon>
          <p>Nenhum aluno encontrado</p>
        </div>

        <div class="empty-state" *ngIf="!selectedParent">
          <ion-icon name="arrow-up-outline"></ion-icon>
          <p>Selecione um responsável primeiro</p>
        </div>
      </div>

      <div class="selected-count" *ngIf="selectedStudents.length > 0">
        <ion-badge color="success">{{ selectedStudents.length }}</ion-badge>
        <span>aluno(s) selecionado(s)</span>
      </div>
    </div>

  </div>
</ion-content>

<ion-footer class="ion-no-border">
  <ion-toolbar class="footer-toolbar">
    <ion-button 
      expand="block" 
      class="save-btn"
      [disabled]="!selectedParent || selectedStudents.length === 0"
      (click)="save()">
      <ion-icon name="link-outline" slot="start"></ion-icon>
      Vincular {{ selectedStudents.length }} Aluno(s)
    </ion-button>
  </ion-toolbar>
</ion-footer>
*/

// STYLES SCSS: link-student-parent-modal.component.scss
/*
$primary-color: #2C3E50;
$accent-color: #9B59B6;
$success-color: #27AE60;
$text-dark: #2C3E50;
$text-light: #7F8C8D;
$light-bg: #F8F9FA;

.modal-toolbar {
  --background: #{$primary-color};
  --color: white;

  ion-title {
    font-weight: 700;
    font-size: 1rem;
  }

  ion-icon {
    font-size: 24px;
  }
}

.modal-content {
  --background: #{$light-bg};
}

.link-form {
  padding: 20px;
}

.form-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &.disabled {
    opacity: 0.6;
  }

  .section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: $text-dark;
    margin: 0 0 15px 0;
    display: flex;
    align-items: center;
    gap: 10px;

    ion-icon {
      font-size: 1.3rem;
      color: $accent-color;
    }
  }

  .custom-searchbar {
    --background: #{$light-bg};
    --border-radius: 12px;
    --box-shadow: none;
    margin-bottom: 15px;
    padding: 0;
  }

  .selection-area {
    max-height: 300px;
    overflow-y: auto;
    padding: 5px;

    &.disabled-area {
      pointer-events: none;
      opacity: 0.5;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: $light-bg;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #BDC3C7;
      border-radius: 10px;
    }

    .parent-card {
      background: $light-bg;
      border-radius: 12px;
      padding: 15px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      &.selected {
        border-color: $success-color;
        background: rgba(39, 174, 96, 0.05);
      }

      .parent-info {
        display: flex;
        gap: 15px;
        align-items: center;
        flex: 1;

        .parent-avatar {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid $accent-color;

          ion-icon {
            font-size: 1.5rem;
            color: $accent-color;
          }
        }

        .parent-details {
          h4 {
            margin: 0 0 4px 0;
            font-size: 0.95rem;
            font-weight: 700;
            color: $text-dark;
          }

          p {
            margin: 2px 0;
            font-size: 0.8rem;
            color: $text-light;

            &.email {
              font-size: 0.75rem;
            }
          }
        }
      }

      .check-indicator {
        ion-icon {
          font-size: 2rem;
          color: $success-color;
        }
      }
    }

    .student-card {
      background: $light-bg;
      border-radius: 12px;
      padding: 12px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid transparent;
      display: flex;
      align-items: center;
      gap: 15px;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      &.selected {
        border-color: $success-color;
        background: rgba(39, 174, 96, 0.05);
      }

      ion-checkbox {
        --size: 24px;
        --checkbox-background-checked: #{$success-color};
      }

      ion-avatar {
        width: 45px;
        height: 45px;
        border: 2px solid $accent-color;
      }

      .student-info {
        flex: 1;

        h4 {
          margin: 0 0 4px 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: $text-dark;
        }

        p {
          margin: 0;
          font-size: 0.8rem;
          color: $text-light;
        }
      }
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: $text-light;

      ion-icon {
        font-size: 3rem;
        opacity: 0.3;
        margin-bottom: 10px;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }

  .selected-info {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 15px;
    background: rgba(39, 174, 96, 0.1);
    border-radius: 8px;
    margin-top: 15px;

    ion-icon {
      font-size: 1.3rem;
      color: $success-color;
    }

    span {
      font-size: 0.85rem;
      color: $text-dark;

      strong {
        color: $success-color;
      }
    }
  }

  .selected-count {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 15px;
    background: rgba(39, 174, 96, 0.1);
    border-radius: 8px;
    margin-top: 15px;

    ion-badge {
      font-size: 1rem;
      padding: 5px 10px;
    }

    span {
      font-size: 0.85rem;
      color: $text-dark;
      font-weight: 600;
    }
  }
}

.footer-toolbar {
  --background: white;
  padding: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);

  .save-btn {
    --background: #{$success-color};
    --background-activated: #{darken($success-color, 10%)};
    --color: white;
    --border-radius: 12px;
    --box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
    height: 50px;
    font-weight: 700;
    text-transform: none;

    &:disabled {
      --background: #BDC3C7;
      --box-shadow: none;
    }
  }
}
*/