import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { flash, person, book, eyeOutline, chevronForwardOutline, shieldCheckmark, closeCircle } from 'ionicons/icons';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [ CommonModule, RouterLink, FormsModule, IonContent, IonIcon ],
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastController: ToastController
  ) {
    addIcons({ flash, person, book, eyeOutline, chevronForwardOutline, shieldCheckmark, closeCircle });
  }

  async login() {
    if (!this.username || !this.password) {
      this.presentToast('Faltan credenciales ninja.', 'warning');
      return;
    }

    this.auth.login(this.username, this.password)
      .subscribe({
        next: async (res) => {
          if(res.token) {
            this.auth.saveSession(res.token);
          }
          
          this.presentToast(`Bienvenido de nuevo, ${this.username}.`, 'success');
          
          this.router.navigate(['/home']);
        },
        error: async (err: any) => {
          console.error(err);
          const msg = err?.error?.message || 'Credenciales incorrectas.';
          this.presentToast(msg, 'danger');
        }
      });
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      icon: color === 'success' ? 'shield-checkmark' : 'close-circle',
      cssClass: 'custom-toast'
    });
    
    toast.present();
  }
}