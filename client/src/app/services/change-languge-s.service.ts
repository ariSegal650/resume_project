import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeLangugeSService {
  languge:BehaviorSubject<string>;
  constructor() {
   
    this.languge=new BehaviorSubject('en');
   }
   

   
   getLanguage():Observable<string>{
    return this.languge;
   }
   setLanguage(a:string){
    this.languge.next(a);
    sessionStorage.setItem('languge',a);
   }
}
