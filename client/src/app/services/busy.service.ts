import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busy:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  On(){
    this.busy.next(true);
  }
  Off(){
    this.busy.next(false);
  }

  register():Observable<boolean>{
    return this.busy;
  } 
}
