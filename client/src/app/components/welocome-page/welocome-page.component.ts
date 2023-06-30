import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackEndService } from 'src/app/services/back-end.service';
import { ChangeLangugeSService } from 'src/app/services/change-languge-s.service';
import { IdentificationService } from 'src/app/services/identification.service';

@Component({
  selector: 'app-welocome-page',
  templateUrl: './welocome-page.component.html',
  styleUrls: ['./welocome-page.component.css']
})
export class WelocomePageComponent {
  languge = 'English';
  langugeChange: boolean = false;
  imglanguge = '../../../assets/images/flagUsa.jpg';
  codeLink = '';
  body: any = '';
  @ViewChild('languge1') myList: ElementRef;

  loginComponent:boolean;
  userEmail:string="";
  constructor(private router: ActivatedRoute,private changeService:ChangeLangugeSService,private Identification:IdentificationService,private r:Router,private http:HttpClient) {
    this.loginComponent=true;
  }

  async ngOnInit(): Promise<void> {
    //check the selected languege
    if (sessionStorage.getItem('languge')) {
      this.changeL(sessionStorage.getItem('languge')as string);
    }

    document.addEventListener('click', this.onDocumentClick.bind(this));

    this.observeUserInfo();
  }

  //display the list of languege
  openL() {
    this.langugeChange = !this.langugeChange
  }

  //chenge the languege
  changeL(languge1:string) {
    if (languge1 === 'en') {
      this.languge = "English";
      this.imglanguge = '../../../assets/images/flagUsa.jpg'
    }
    else {
      this.languge = "Hebrew";
      this.imglanguge = '../../../assets/images/glagIsrael.jpg'
    }


    this.changeService.setLanguage(languge1)
    this.langugeChange = false;
  }

  // Click occurred outside of UL element, so close the list here
  onDocumentClick(event) {

    if (!this.myList.nativeElement.contains(event.target)) {
      this.langugeChange=false
    }

  }

  closeLogin(){
    this.loginComponent=false;
  }
  async observeUserInfo(){
    this.Identification.getUser().subscribe(user=>{
      if(user!= null){
        this.loginComponent=false;
        this.userEmail=user.email;
        this.router.url.subscribe(parms=>{
          parms.forEach(p => {
            if(p.path=="login"){
                this.r.navigateByUrl('welcome')
            }
          });

      })
      }
    })
  }
}


