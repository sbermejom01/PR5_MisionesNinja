import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonInput, IonButton, IonIcon, IonSelect, IonSelectOption, 
  IonText, ToastController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { flash, person, book, eyeOutline, chevronForwardOutline, map, chevronDownOutline, checkmarkCircle, alertCircle } from 'ionicons/icons';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ CommonModule, RouterLink, FormsModule, IonContent, IonItem, IonInput, IonButton, IonIcon, IonSelect, IonSelectOption, IonText ],
})
export class RegisterComponent {

  username = '';
  password = '';
  rank = 'Academy';

  ranks = [
    { name: 'Academy' },
    { name: 'Genin' },
    { name: 'Chunin' },
    { name: 'Jonin' },
    { name: 'Kage' }
  ];

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastController: ToastController
  ) {
    addIcons({ flash, person, book, eyeOutline, chevronForwardOutline, map, chevronDownOutline, checkmarkCircle, alertCircle });
  }

  async register() {

    if (!this.username || !this.password) {
      this.presentToast('Debes completar el nombre y la contraseña', 'warning');
      return;
    }

    this.auth.register(this.username, this.password, this.rank)
      .subscribe({
        next: async (res) => {
          if(res.token) this.auth.saveSession(res.token);
          
          this.presentToast('¡Bienvenido a la Academia! Inicia sesión.', 'success');
          
          this.router.navigate(['/login']);
        },
        error: async (err: any) => {
          console.error('Error:', err);
          const msg = err?.error?.message || 'Error al firmar el contrato.';
          this.presentToast(msg, 'danger');
        }
      });
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',
      color: color,
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle',
      cssClass: 'custom-toast'
    });
    
    toast.present(); 
  }
}