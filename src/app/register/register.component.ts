import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { flash, person, book, eyeOutline, chevronForwardOutline, map, chevronDownOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule],
})
export class RegisterComponent {

  username = '';
  password = '';
  rank = 'Academy';

  // 👇 CORREGIDO
  ranks = [
    { name: 'Academy' },
    { name: 'Genin' },
    { name: 'Chunin' },
    { name: 'Jonin' },
    { name: 'Kage' }
  ];

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    addIcons({ flash, person, book, eyeOutline, chevronForwardOutline, map, chevronDownOutline });
  }

  register() {
    this.auth.register(this.username, this.password, this.rank)
      .subscribe({
        next: (res) => {
          this.auth.saveSession(res.token);
          this.router.navigate(['/home']);
        },
        error: (err: any) => {
          alert(err?.error?.message || 'Error al registrarse');
        }
      });
  }
}
