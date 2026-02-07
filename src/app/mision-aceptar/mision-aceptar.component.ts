import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { timeOutline, skullOutline, mapOutline, returnUpBackOutline, flame } from 'ionicons/icons';

@Component({
  selector: 'app-mission-accept-modal',
  templateUrl: './mision-aceptar.component.html',
  styleUrls: ['./mision-aceptar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MisionAceptarComponent {
  @Input() mission: any;

  constructor(private modalCtrl: ModalController) {
    addIcons({ timeOutline, skullOutline, mapOutline, returnUpBackOutline, flame });
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  accept() {
    this.modalCtrl.dismiss(this.mission, 'confirm');
  }
}