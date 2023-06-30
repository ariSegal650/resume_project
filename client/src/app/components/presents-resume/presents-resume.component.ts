import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MessageServiceClient } from 'src/app/services/message.service';

@Component({
  selector: 'app-presents-resume',
  templateUrl: './presents-resume.component.html',
  styleUrls: ['./presents-resume.component.css'],
})
export class PresentsResumeComponent {
  infoForm: FormGroup;
  userInfo:any;
  constructor(private route: ActivatedRoute, private dataUser: DataService,
    private _massege: MessageServiceClient,private r:Router) {}

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('id')) {
      this.dataUser.GetResume(this.route.snapshot.paramMap.get('id')).subscribe({
        next:(value)=> {
          this.userInfo=value;
          this.OnChenge();
        },
        error:(err)=> {
          console.log(err);
          this._massege.showError(err?.error);
          this.r.navigateByUrl('')
        },
      })
    }
    this.infoForm = new FormGroup({
      page1: new FormGroup({
        FullName: new FormControl(''),
        About: new FormControl(''),
        Phone: new FormControl(''),
        Email: new FormControl('', Validators.email),
        LinkedIn: new FormControl(''),
      }),
      page2: new FormGroup({
        arrLanguage: new FormArray([this.tamplateLanguage()]),
        arrSkils: new FormArray([this.tamplateSkill()]),
      }),
      page3: new FormGroup({
        ArrEducation: new FormArray([
          new FormGroup({
            Headline: new FormControl('Experience'),
            Data: new FormArray([this.tamplateEducation()]),
          }),
          new FormGroup({
            Headline: new FormControl('Education'),
            Data: new FormArray([this.tamplateEducation()]),
          }),
        ]),
      }),
    });
  }

  tamplateLanguage() {
    return new FormGroup({
      Name: new FormControl(''),
      Value: new FormControl(100),
    });
  }
  tamplateSkill() {
    return new FormGroup({
      Name: new FormControl(''),
      Value: new FormControl(100),
    });
  }

  tamplateSection() {
    return new FormGroup({
      Headline: new FormControl(''),
      Data: new FormArray([this.tamplateEducation()]),
    });
  }

  tamplateEducation() {
    let a22 = new Date(2023, 1, 16);
    return new FormGroup({
      StartWork: new FormControl(a22),
      EndWork: new FormControl(a22),
      EducationName: new FormControl(''),
      EducationAddres: new FormControl(''),
      Position: new FormControl(''),
      Content: new FormControl(''),
    });
  }

  addLanguage() {
    (<FormArray>this.infoForm.get('page2').get('arrLanguage')).push(
      this.tamplateLanguage()
    );
  }

  addSkill() {
    (<FormArray>this.infoForm.get('page2').get('arrSkils')).push(
      this.tamplateSkill()
    );
  }

  addEducation(place) {
    const control = <FormArray>(
      this.infoForm
        .get('page3')
        .get('ArrEducation')
        ['controls'][place].get('Data')
    );
    control.push(this.tamplateEducation());
  }

  addSection() {
    const control = <FormArray>(
      this.infoForm.get('page3').get('ArrEducation')['controls']
    );
    control.push(this.tamplateSection());
  }

  getTamplateEducation(form) {
    return form.controls.Data.controls;
  }

  GetArrEducation() {
    return this.infoForm.get('page3').get('ArrEducation')['controls'];
  }



  OnChenge() {
      if (this.userInfo.page1) {
        let p1  = JSON.parse(this.userInfo.page1);

          this.infoForm.get('page1').get('FullName').setValue(p1.FullName);
          this.infoForm.get('page1').get('About').setValue(p1.About);
          this.infoForm.get('page1').get('Phone').setValue(p1.Phone);
          this.infoForm.get('page1').get('Email').setValue(p1.Email);
          this.infoForm.get('page1').get('LinkedIn').setValue(p1.LinkedIn);
      }

      if (this.userInfo.page2) {
        let p2  = JSON.parse(this.userInfo.page2);
        for (let index = 0; index < p2.arrLanguage.length; index++) {
          if (p2.arrLanguage[index].Name.split(' ')[0].length > 0) {
            this.infoForm.get('page2').get('arrLanguage').get([index]).get('Name').setValue(p2.arrLanguage[index].Name);
            this.infoForm.get('page2').get('arrLanguage').get([index]).get('Value').setValue(p2.arrLanguage[index].Value);
          }
          if (index + 1 != p2.arrLanguage.length) {
            this.addLanguage();
          }
        }

        for (let index = 0; index < p2.arrSkils.length; index++) {
          if (p2.arrSkils[index].Name.split(' ')[0].length > 0) {
            this.infoForm.get('page2')
              .get('arrSkils')
              .get([index])
              .get('Name')
              .setValue(p2.arrSkils[index].Name);
            this.infoForm
              .get('page2')
              .get('arrSkils')
              .get([index])
              .get('Value')
              .setValue(p2.arrSkils[index].Value);
          }
          if (index + 1 != p2.arrSkils.length) {
            this.addSkill();
          }
        }
      }

      if (this.userInfo.page3) {
        let p3= JSON.parse(this.userInfo.page3);

        for (let index = 0; index < p3.ArrEducation.length; index++) {
          let ArrEd = this.infoForm
            .get('page3')
            .get('ArrEducation')
            .get([index]);

          if (p3.ArrEducation[index].Headline.split(' ')[0].length > 0) {
            ArrEd.get('Headline').setValue(p3.ArrEducation[index].Headline);

            for (let inD = 0; inD < p3.ArrEducation[index].Data.length; inD++) {
              // if(p3.ArrEducation[index].Data[inD].EducationName.split(' ')[0].length>0 ||
              //     p3.ArrEducation[index].Data[inD].Content.split(' ')[0].length>0)
              //   {
              if (inD > 0) {
                this.addEducation(index);
              }
              let data = ArrEd.get('Data').get([inD]);

              let de = new Date(p3.ArrEducation[index].Data[inD].EndWork);
              let ds = new Date(p3.ArrEducation[index].Data[inD].StartWork);

              data.get('EducationName')
                .setValue(p3.ArrEducation[index].Data[inD].EducationName);
              data.get('Content')
                .setValue(p3.ArrEducation[index].Data[inD].Content);
              data
                .get('EducationAddres')
                .setValue(p3.ArrEducation[index].Data[inD].EducationAddres);
              data.get('EndWork').setValue(de);
              data
                .get('Position')
                .setValue(p3.ArrEducation[index].Data[inD].Position);
              data.get('StartWork').setValue(ds);

              // }
            }
            if (index >= 1 && index + 1 != p3.ArrEducation.length) {
              this.addSection();
            }
          }
        }
      }
    }


}
