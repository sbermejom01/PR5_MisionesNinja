import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, closeCircle, send, camera, documentText, cloudUploadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mision-detalles.component.html',
  styleUrls: ['./mision-detalles.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MisionDetallesComponent implements OnInit {
  missionId: string | null = null;
  
  // Datos mock para visualización
  mission = {
    title: 'OPERACIÓN: SILENT GALE',
    description: 'El objetivo está ubicado dentro de la fortaleza Shogun. Infíltrate, recupera los pergaminos y no dejes rastro.',
    rank: 'S'
  };

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {
    addIcons({ arrowBack, closeCircle, send, camera, documentText, cloudUploadOutline });
  }

  ngOnInit() {
    // Capturamos el ID de la URL
    this.missionId = this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    // Usamos NavController para volver atrás en el historial de navegación de Ionic
    this.navCtrl.back();
  }
}