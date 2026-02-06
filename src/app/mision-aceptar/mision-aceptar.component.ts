import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Mission, RANK_COLORS } from '../models/mission.model';

@Component({
  selector: 'app-mision-aceptar',
  template: ``,
  styles: [``],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MisionAceptarComponent {
  @Input() mission!: Mission;
  rankColors = RANK_COLORS;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss('accepted', 'confirm');
  }
}