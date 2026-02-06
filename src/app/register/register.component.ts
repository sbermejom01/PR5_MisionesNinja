import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Importante para ngModel
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { flash, person, book, eyeOutline, chevronForwardOutline, map, chevronDownOutline } from 'ionicons/icons';
import { Village } from '../models/village.model'; // Asegúrate de tener este modelo o defínelo aquí

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule],
})
export class RegisterComponent {
  selectedVillage: string = '';
  villages: any[] = [
    { id: 'konoha', name: 'Konohagakure (Hoja)' },
    { id: 'suna', name: 'Sunagakure (Arena)' },
    { id: 'kiri', name: 'Kirigakure (Niebla)' },
    { id: 'akatsuki', name: 'Akatsuki (Renegado)' }
  ];

  constructor(private router: Router) {
    addIcons({ flash, person, book, eyeOutline, chevronForwardOutline, map, chevronDownOutline });
  }

  onRegister() {
    // Simular registro y entrar al dashboard
    this.router.navigate(['/shinobi/dashboard']);
  }
}