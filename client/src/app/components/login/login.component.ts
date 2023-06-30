import * as gapi from 'gapi-client';
import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentificationService } from 'src/app/services/identification.service';
import { DataService } from 'src/app/services/data.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  code: string = '';
  user: any;
  private auth2: any;
  http: any;

  constructor(
    private loginService: IdentificationService,
    private router: ActivatedRoute,
    private dataUser: DataService,
    private route: Router,
    private _ngZone: NgZone
  ) {

  }

  async ngOnInit() {
   //this.initGoogleSignIn();
 
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
    });

    (window as any).onGoogleLibraryLoad = () => {
      // @ts-ignore
      
       google.accounts.id.initialize({
        client_id: "942574139585-90aq76ru79jfns9rca80n3q15pcapqa0.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
     
      // @ts-ignore
       google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: 100 }
      );
      // @ts-ignore
       google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };

    this.router.queryParamMap.subscribe((params) => {
      if (params.get('code')) {
        this.loginService.linkedin(params.get('code').toString());
      }
    });
    this.loginService.getUser().subscribe((value) => {
      if (value?.url) {
        this.route.navigateByUrl('profile');
      }
    });
  }

  async handleCredentialResponse(response: CredentialResponse) {
    console.log(response);
    this.loginService.signInGoogle(response?.credential)
  }
  
}
