import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
/* IMPORTA ESTOS ICONOS NUEVOS */
import { 
  listOutline, optionsOutline, search, skull, cashOutline, 
  locationOutline, hourglassOutline, fingerPrintOutline, 
  fileTrayOutline 
} from 'ionicons/icons';
import { MisionAceptarComponent } from '../mision-aceptar/mision-aceptar.component';
import { Mission } from '../models/mission.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {
  segmentValue: string = 'available';
  
  // Colores ajustados al diseño
  rankColors: any = { 
    'S': '#ea1d24', // Rojo Shinobi
    'A': '#ffa500', // Naranja
    'B': '#00bfff', // Azul electrico
    'C': '#32cd32', // Verde
    'D': '#aaaaaa'  // Gris
  };

  missions: Mission[] = [
    { 
      id: 'm1', 
      title: 'Infiltración en la Lluvia', 
      rank: 'S', 
      reward: 250000, 
      status: 'available', 
      isAvailable: true,
      sector: 'Amegakure',
      dangerLevel: 5,
      expirationTime: '12h'
    },
    { 
      id: 'm4', 
      title: 'Defensa del Perímetro', 
      rank: 'B', 
      reward: 45000, 
      status: 'in-progress', 
      isAvailable: false, 
      assignee: { name: 'Itachi', photoUrl: 'assets/ninja-avatar.jpg' },
      sector: 'Muro Norte',
      dangerLevel: 2
    }
  ];

  constructor(private modalCtrl: ModalController, private router: Router) {
    // REGISTRA LOS ICONOS AQUI
    addIcons({ 
      listOutline, optionsOutline, search, skull, cashOutline, 
      locationOutline, hourglassOutline, fingerPrintOutline, 
      fileTrayOutline 
    });
  }

  get filteredMissions() {
    return this.missions.filter(m => m.status === this.segmentValue);
  }

  async openAcceptModal(mission: Mission) {
    const modal = await this.modalCtrl.create({
      component: MisionAceptarComponent,
      componentProps: { mission },
      cssClass: 'mission-accept-modal',
      backdropDismiss: true
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data === 'accepted') {
      this.goToDetails(mission.id);
    }
  }

  goToDetails(missionId: string) {
    this.router.navigate(['/shinobi/mision', missionId]);
  }
}