import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkedinDto } from 'src/app/models/codeLinkedin';
import { MangerInfo } from 'src/app/models/manger';
import { BackEndService } from 'src/app/services/back-end.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  a: LinkedinDto = new LinkedinDto();
  constructor(private http: HttpClient) {}

  getStatistics() {
    this.a.code = localStorage.getItem('token');
   return this.http.post<any>('/api/Admin/getStatistics', this.a)
  }
}
