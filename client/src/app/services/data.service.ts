import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataSave } from '../models/Data';
import { IdOnly } from '../models/IdOnly';
import { async } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private r: Router) {}

   GetResume(id:string) {
    let user= new IdOnly();
    user.id=id;
   return  this.http.post("/api/Data/GetResume",user);
  }

  async formatData(value){
    console.log(value);

    sessionStorage.setItem('page1',value?.page1);
    sessionStorage.setItem('page2',value?.page2);
    sessionStorage.setItem('page3',value?.page3);
  }

 async SaveInfoWOResponse() {
    let data = new UserDataSave();
    if (sessionStorage.getItem('page1')) {
      data.page1 = sessionStorage.getItem('page1');
    }
    if (sessionStorage.getItem('page2')) {
      data.page2 = sessionStorage.getItem('page2');
    }
    if (sessionStorage.getItem('page3')) {
      data.page3 = sessionStorage.getItem('page3');
    }

    //get the token form localStorage
    if (localStorage.getItem('linkedinToken')) {
      data.Token=localStorage.getItem('linkedinToken');
      data.type="linkedinToken"
    }
    else if (localStorage.getItem('GoogleToken')) {
      data.Token=localStorage.getItem('GoogleToken');
      data.type="GoogleToken"
    }
    else{
      return;
    }
    this.http.post("/api/Data/saveInfo",data).subscribe(result=>{;
    })



  }
}
