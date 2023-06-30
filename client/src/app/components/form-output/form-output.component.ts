import { Component, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import * as html2pdf from 'html2pdf.js';
import { BackEndService } from 'src/app/services/back-end.service';
import { BusyService } from 'src/app/services/busy.service';
import { MessageServiceClient } from 'src/app/services/message.service';



@Component({
  selector: 'app-form-output',
  templateUrl: './form-output.component.html',
  styleUrls: ['./form-output.component.css']
})
export class FormOutputComponent {



  colors: string[] = ["#666699", "#0069B5", "#cc6699", "#996666", "#999966", "#669999", "#317FA0", "#666666", "#002244"]
  Pcolor:number=8;
  downloadClick:boolean=false
  @Input() form = new FormGroup({});
  element:any;

  constructor(private _busyService:BusyService,private _massege:MessageServiceClient,
    private _BackEndService:BackEndService) { }


  ngOnInit() {
    this.element = document.getElementById('output1');
  }

  chengeColor(color:string,p:number){
    this.Pcolor=p;
  }

  async download() {

    this._busyService.On();
    let p=0,x=0;
    if(this.form.get('page3').get('ArrEducation').get(p.toString()).get('Data').get(x.toString()).get('EndWork').touched){
      this._BackEndService.AddCity( this.form.get('page3').get('ArrEducation').get(p.toString()).get('Data').get(x.toString()).get('EndWork').value)
    }

    this._BackEndService.AddDownload();

    try {
      this.downloadClick=true;
      const options = {
        margin: [0, 0, 0, 0],
        filename: 'Cv-'+this.form.get('page1').get('FullName').value+'.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 5 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().from(this.element).set(options).save();



    } catch (error) {
      this._busyService.Off();
      this._massege.showError("something went wrong  please try again ");
    }

    setTimeout(() => {
      this.downloadClick=false;
      this._busyService.Off();
    }, 500);

  }

}










