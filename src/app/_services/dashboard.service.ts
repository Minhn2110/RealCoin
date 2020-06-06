import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor(
    private http: HttpClient
  ) {

  }

  getMemberHousehold(householderId: number): Observable<any> {
    return this.http.get<any>(`api/memberunavailables/householdavailability?householderId=` + householderId);
  }

}