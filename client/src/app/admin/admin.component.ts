import { Component } from '@angular/core';
import { MangerInfo } from '../models/manger';
import { BackEndService } from '../services/back-end.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  basicData: any;
  basicOptions: any;
  Ms: MangerInfo = new MangerInfo();

 constructor(private _service:AdminService){}
  ngOnInit(): void {
  //   this.basicData = {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //       {
  //         label: 'users',
  //         backgroundColor: '#42A5F5',
  //         data: [this.Ms.users[0]*10, this.Ms.users[1]*10,this.Ms.users[2]*10,this.Ms.users[3]*10,this.Ms.users[4]],
  //       },
  //       {
  //         label: 'My Second dataset',
  //         backgroundColor: '#FFA726',
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //       },
  //     ],
  //   };
  this.getStatistics();
   }

  getStatistics(){
    this._service.getStatistics().subscribe({
      next: (value) => {
        console.log(value);
        this.Ms.downloads = value.downloads;
        this.Ms.monthUsers = value.monthUsers;
        this.Ms.monthDownloads = value.monthDownloads;
        this.Ms.users=value.users;
        console.log(this.Ms);

        this.tamplete();
      },
      error(err) {
        console.log(err);
      },
    });

  }
  tamplete(){
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'users',
          backgroundColor: '#42A5F5',
          data: [this.Ms.monthUsers[0], this.Ms.monthUsers[1],this.Ms.monthUsers[2],this.Ms.monthUsers[3],this.Ms.monthUsers[4]],
        },
        {
          label: 'downloads',
          backgroundColor: '#FFA726',
          data: [this.Ms.monthDownloads[0], this.Ms.monthDownloads[1],this.Ms.monthDownloads[2],this.Ms.monthDownloads[3],this.Ms.monthDownloads[4]],
        },
      ],
    };
  }
}
