import { Component } from '@angular/core';
import {  Route, Router } from '@angular/router';
import { IdentificationService } from 'src/app/services/identification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user:any;

constructor(private Identification:IdentificationService,private route:Router) {}
  ngOnInit(): void {
    if(!this.Identification.getNextUser()){

      this.route.navigateByUrl('login')
    }
    this.Identification.getUser().subscribe(value=>{
      this.user=value
    })
  }

  gotolink(){
    window.open("https://resume-ai.net/resume/"+this.user.url)
  }
}
