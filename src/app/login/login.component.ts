import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
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
    private auth: AuthService
  ) {
    addIcons({ flash, person, book, eyeOutline, chevronForwardOutline });
  }

  login() {
    this.auth.login(this.username, this.password)
      .subscribe({
        next: (res) => {
          this.auth.saveSession(res.token);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          alert(err?.error?.message || 'Error al iniciar sesión');
        }
      });
  }
}
