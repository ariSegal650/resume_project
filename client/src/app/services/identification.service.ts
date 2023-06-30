import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LinkedinDto } from '../models/codeLinkedin';
import { MessageServiceClient } from './message.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class IdentificationService {
  public userSubject = new BehaviorSubject<any>(null);
  UserValue:any;
  admin: BehaviorSubject<boolean>;
  _code: LinkedinDto = new LinkedinDto();
  googleToken: LinkedinDto = new LinkedinDto();

  private auth2: any;
  count:number=0;
  constructor(private http: HttpClient, private r: Router,private message:MessageServiceClient,private dataUser:DataService) {
    this.admin = new BehaviorSubject<boolean>(false);
  
    this.getUser().subscribe(user=>{
      this.UserValue=user;

    })
  }

  // async signInGoogle(auth2):Promise<void> {
  //   try {
  //     await auth2.signIn().then((googleUser: any) => {
  //       this.googleToken.code=googleUser.Bc.id_token;
  //        this.http.post('/api/Identification/CheckTokenGoogle', this.googleToken).subscribe({
  //         next: (value) => {
  //          localStorage.setItem('GoogleToken',this.googleToken.code);
  //          this.userSubject.next(value);
  //          this.dataUser.formatData(value);
  //         },
  //         error: (Error) => {
  //           this.message.showError(Error?.error)
  //         },
  //       });
  //     });
  //   } catch (error) {
  //     this.count++;
  //     if(this.count<3){
  //       this.signInGoogle(this.auth2);
  //     }

  //   }

  // }
  async signInGoogle(token:string):Promise<void> {
    this.googleToken.code=token;
           this.http.post('/api/Identification/CheckTokenGoogle', this.googleToken).subscribe({
            next: (value) => {
             localStorage.setItem('GoogleToken',this.googleToken.code);
             this.userSubject.next(value);
             this.dataUser.formatData(value);
            },
            error: (Error) => {
              this.message.showError(Error?.error)
            },
          });
  }


  signOut(auth2) {
    this.auth2.signOut().then(() => {
      this.userSubject.next(null);
    });
  }




  linkedin(code: string) {
    this._code.code = code;

    this.http.post<any>('/api/Identification/loginLinkedin', this._code)
      .subscribe({
        next: (value) => {
          if(value?.admin==true){
            this.admin.next(true);
            this.r.navigateByUrl('admin');
          }
          else{
            this.dataUser.formatData(value);
          }
          if(value?.token){

            localStorage.setItem('linkedinToken',(value.token));
          }

         this.userSubject.next(value);
        },
        error: (Error) => {
          this.message.showError(Error?.error)
        },
      });
  }

  checkTokenlinkedin() {
    this._code.code = localStorage.getItem('linkedinToken');

    this.http.post<any>('/api/Identification/checkTokenLinkedin', this._code)
      .subscribe({
        next: (value) => {
          if(value?.admin==true){
            this.admin.next(true);
            this.r.navigateByUrl('admin');
          }
          else{
            this.dataUser.formatData(value);
          }
         this.userSubject.next(value);
        },
        error: (Error) => {
        },
      });
  }
  checkTokenGoogle() {
    this.googleToken.code=localStorage.getItem('GoogleToken');
    this.http.post('/api/Identification/CheckTokenGoogle', this.googleToken)
      .subscribe({
        next: (value) => {
          localStorage.setItem('GoogleToken',this.googleToken.code);
          this.userSubject.next(value);
          this.dataUser.formatData(value);
        },
        error: (Error) => {
        },
      });
  }

  getUser() {
    return this.userSubject.asObservable();
  }
  getNextUser() {

    return this.UserValue;
  }
    getAdmin() {
    return this.admin.asObservable();
  }
}
