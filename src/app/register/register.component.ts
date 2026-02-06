import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { flash, person, book, eyeOutline, chevronForwardOutline, map, chevronDownOutline } from 'ionicons/icons';

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

  register() {

  }
}