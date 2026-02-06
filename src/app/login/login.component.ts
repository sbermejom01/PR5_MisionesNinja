import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { flash, person, book, eyeOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class LoginComponent {
  constructor(private router: Router) {
    addIcons({ flash, person, book, eyeOutline, chevronForwardOutline });
  }

  login() {
    
  }
}