import { Injectable } from '@angular/core';
import { IdOnly } from '../models/IdOnly';
import { HttpClient } from '@angular/common/http';
import { Statistics } from '../models/Statistics';


@Injectable({
  providedIn: 'root',
})
export class BackEndService {
  baseUrl: string = '';
  UserS: Statistics = new Statistics();
  sended: boolean = false;

  idClass: IdOnly = new IdOnly();


  constructor(private http: HttpClient) {

  }

  createUser(): void {
    this.http.post<IdOnly>('/api/Statistics/CreateUser', null).subscribe({
      next: (value) => {
        if (value?.id != undefined) {
          this.idClass.id = (value?.id as string) || ' ';
          this.UserS.id = (value?.id as string) ?? ' ';
        } else {
          console.log('un');
        } 
      },
    });
  }
 
  AddClick() {
    this.http.post('/api/Statistics/AddClickEvent', this.idClass).subscribe({});
  }
  AddDownload() {
    this.http.post('/api/Statistics/AddDownload', this.idClass).subscribe({});
  }
  AddCity(_city: string) {
    this.UserS.city = _city;
    this.http.post('/api/Statistics/AddDownload', this.UserS).subscribe();
  }

  // login(info) {
  //   this.http.get('http://localhost:5023/api/Admin/login', info).subscribe({
  //     next: (value) => {},
  //   });
  // }


}
