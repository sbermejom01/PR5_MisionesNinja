import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, 
  IonButton, IonIcon, IonBadge, IonSegment, IonSegmentButton, IonLabel, 
  IonAvatar, ToastController, LoadingController, ModalController 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  compass, flame, newspaperOutline, shieldCheckmark, skull, 
  wallet, barChart, person, filter, logOutOutline, apertureOutline 
} from 'ionicons/icons';

import { MissionService } from '../services/mission.service';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router'; 
import { MisionAceptarComponent } from '../mision-aceptar/mision-aceptar.component'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, IonHeader, IonToolbar, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonButton, IonIcon, IonBadge, IonSegment, IonSegmentButton, IonLabel,
    IonAvatar
  ]
})
export class HomeComponent implements OnInit {
  
  missions: any[] = []; 
  filteredMissions: any[] = [];
  ninjaProfile: any = null;
  ninjaStats: any = null;
  currentFilter = 'DISPONIBLE'; 

  constructor(
    private missionService: MissionService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private router: Router
  ) {
    addIcons({ 
      compass, flame, newspaperOutline, shieldCheckmark, skull, wallet, barChart, person, filter, 'log-out-outline': logOutOutline, 'shuriken': apertureOutline
    });  
  }
    
  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.missionService.getMyStats().subscribe(res => {
      this.ninjaProfile = res.profile;
      this.ninjaStats = res.stats;
    });
    this.loadMissions();
  }

  loadMissions() {
    this.missionService.getMissions().subscribe(res => {
      this.missions = res.data;
      this.applyFilter(this.currentFilter);
    });
  }

  applyFilter(status: any) {
    const filterValue = status ? status.toString() : 'DISPONIBLE';
    this.currentFilter = filterValue;
    if (filterValue === 'ALL') {
      this.filteredMissions = this.missions;
    } else {
      this.filteredMissions = this.missions.filter(m => m.status === filterValue);
    }
  }

  canAccept(missionRank: string): boolean {
    if (!this.ninjaProfile) return false;
    const rankValues: any = { 'Academy': 0, 'Genin': 1, 'Chunin': 2, 'Jonin': 3, 'Kage': 4 };
    const missionValues: any = { 'D': 0, 'C': 1, 'B': 2, 'A': 3, 'S': 4 };
    const myRankVal = rankValues[this.ninjaProfile.rank];
    const missionRankVal = missionValues[missionRank];
    return myRankVal >= missionRankVal;
  }

  async acceptMission(mission: any) {
    const modal = await this.modalCtrl.create({
      component: MisionAceptarComponent,
      componentProps: { mission },
      cssClass: 'mission-modal-class'
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      const loading = await this.loadingController.create({ message: 'Sellando pacto...' });
      await loading.present();
      this.missionService.acceptMission(mission.id).subscribe({
        next: async () => {
          await loading.dismiss();
          this.presentToast('Pacto sellado.', 'success');
          this.router.navigate(['/mision-detalle', mission.id]);
        },
        error: async (err) => {
          await loading.dismiss();
          this.presentToast(err.error?.message || 'Error al aceptar', 'danger');
        }
      });
    }
  }

  goToDetail(missionId: string) {
    this.router.navigate(['/mision-detalle', missionId]);
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
  
  logout() {
      this.auth.logout();
      window.location.reload();
  }
}