import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular'; // Importar ToastController
import { addIcons } from 'ionicons';
import { flash, person, book, eyeOutline, chevronForwardOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule],
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastController: ToastController
  ) {
    addIcons({ flash, person, book, eyeOutline, chevronForwardOutline });
  }

  async login() {
    if (!this.username || !this.password) {
      this.presentToast('Faltan credenciales ninja.', 'warning');
      return;
    }

    this.auth.login(this.username, this.password)
      .subscribe({
        next: async (res) => {
          this.auth.saveSession(res.token);
          await this.presentToast(`Bienvenido de nuevo, ${this.username}.`, 'success');
          this.router.navigate(['/home']);
        },
        error: async (err: any) => {
          const msg = err?.error?.message || 'Credenciales incorrectas.';
          await this.presentToast(msg, 'danger');
        }
      });
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      icon: color === 'success' ? 'shield-checkmark' : 'close-circle'
    });
    await toast.present();
  }
}