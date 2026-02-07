import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonIcon, IonButton, ToastController, LoadingController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, documentTextOutline, imageOutline, cloudUploadOutline, closeCircleOutline, checkmarkCircle } from 'ionicons/icons';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mision-detalle',
  templateUrl: './mision-detalle.component.html',
  styleUrls: ['./mision-detalle.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonIcon, IonButton]
})
export class MisionDetalleComponent implements OnInit {
  missionId: string = '';
  mission: any = null;
  
  reportText: string = '';
  // Simularemos la subida de imagen con un string
  evidenceUrl: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    addIcons({ arrowBack, documentTextOutline, imageOutline, cloudUploadOutline, closeCircleOutline, checkmarkCircle });
  }

  ngOnInit() {
    this.missionId = this.route.snapshot.paramMap.get('id') || '';
    this.loadMissionDetails();
  }

  loadMissionDetails() {
    // Como tu API no tiene GET /missions/:id, bajamos todas y filtramos localmente
    // Idealmente: this.missionService.getMissionById(this.missionId)...
    this.missionService.getMissions('ALL').subscribe(res => {
      this.mission = res.data.find((m: any) => m.id === this.missionId);
    });
  }

  async submitReport() {
    if(!this.reportText) {
      this.presentToast('Informe de misión requerido.', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Encrypting & Sending...' });
    await loading.present();

    // Llamamos a tu API
    this.missionService.submitReport(this.missionId, this.reportText, 'https://via.placeholder.com/300') // Placeholder img
      .subscribe({
        next: async () => {
          await loading.dismiss();
          await this.presentToast('Misión completada con honor.', 'success');
          this.router.navigate(['/home']);
        },
        error: async () => {
          await loading.dismiss();
          this.presentToast('Error al enviar reporte.', 'danger');
        }
      });
  }

  async abandonMission() {
    const loading = await this.loadingCtrl.create({ message: 'Retirándose...' });
    await loading.present();

    this.missionService.abandonMission(this.missionId).subscribe({
      next: async () => {
        await loading.dismiss();
        this.router.navigate(['/home']);
      },
      error: async () => {
        await loading.dismiss();
      }
    });
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000, color: color, position: 'bottom' });
    toast.present();
  }
}