import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Mission } from '../models/mission';
import { Ninja } from '../models/ninja';
@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMissions(status?: string) {
    let url = `${this.API}/missions`;
    if (status) url += `?status=${status}`;
    return this.http.get<{ data: Mission[] }>(url);
  }

  getMyStats() {
    return this.http.get<{ profile: Ninja, stats: any }>(`${this.API}/ninjas/me/stats`);
  }

  acceptMission(missionId: string) {
    return this.http.patch(`${this.API}/missions/${missionId}/accept`, {});
  }

  submitReport(missionId: string, reportText: string, evidenceImageUrl: string) {
    return this.http.post(`${this.API}/missions/${missionId}/report`, {
      reportText,
      evidenceImageUrl
    });
  }

  abandonMission(missionId: string) {
    return this.http.delete(`${this.API}/missions/${missionId}/abandon`);
  }
}