import { Component, OnInit } from '@angular/core';
import { JobModel } from 'src/app/models/JobModel';
import { JobsSearchService } from 'src/app/services/jobs-search.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{

  list_Jobs:JobModel[]=[];
  selectJob:boolean=false
  selectedJob:JobModel;
  constructor(private jobService:JobsSearchService){}

  ngOnInit(): void {
    this.GetJobs("55");
    
  }
  GetJobs(job_Details:string){
    this.list_Jobs = this.jobService.getJobs(job_Details) as unknown as JobModel[];
  }
  presentJob(item:JobModel){
    this.selectedJob=item;
    this.selectJob=true;
    console.log("asd");
    
  }
}
