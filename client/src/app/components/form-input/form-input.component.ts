import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import OpenAI, { Completion } from 'openai-api';
import { BusyService } from 'src/app/services/busy.service';
import { MessageServiceClient } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { ChangeLangugeSService } from 'src/app/services/change-languge-s.service';
import { BackEndService } from 'src/app/services/back-end.service';
import { DataService } from 'src/app/services/data.service';
import { IdentificationService } from 'src/app/services/identification.service';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent {
  public text = '';
  public suggestions: string[] = [];
  private openai: OpenAI;

  items: MenuItem[];

  infoForm: FormGroup;

  activeIndex: number = 0;
  hideDow: boolean = true;

  firstTime: boolean = false;
  closeAiicon: string = 'chevron_left';
  suggestionsOpen: boolean = true;
  suggestionsBool: boolean[] = [false, false, false];
  Languagertl: boolean = false;
  requriedEditor: boolean = false;
  @ViewChild('copyText') copyTextElement: ElementRef;
  @ViewChild('response1') myList: ElementRef;
  @ViewChild('imgaiClick') imgaiClick: ElementRef;
  flagFirst: boolean = false;
  constructor(
    private _busyService: BusyService,
    private _massege: MessageServiceClient,
    private LanguageS: ChangeLangugeSService,
    private _backStatic: BackEndService,
    private dataUser: DataService,
    private Identification: IdentificationService
  ) {}

  async ngOnInit() {
    this.ChangeLanguage();
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

    //steps
    // this.SetIttemsEnglish();
    //    this.ChangeLanguage();

    document.addEventListener('click', this.onDocumentClick.bind(this));
    this.OnChenge();

    //opan ai
    this.openai = new OpenAI(environment.OpanAiKey);

    //send data to server before closing
    window.addEventListener('beforeunload', (ev) => {
      //this.sendStatic.SendStatistics();
      ev.returnValue = 'are you sure you want to live?';
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

  changeTab(a: number) {
    this.activeIndex = a;
    this.dataUser.SaveInfoWOResponse();
  }

  OnChenge() {
    if (!this.flagFirst || this.Identification.userSubject.value != null) {

      if (sessionStorage.getItem('page1')) {
        let p1  = JSON.parse(sessionStorage.getItem('page1'));

          this.infoForm.get('page1').get('FullName').setValue(p1.FullName);
          this.infoForm.get('page1').get('About').setValue(p1.About);
          this.infoForm.get('page1').get('Phone').setValue(p1.Phone);
          this.infoForm.get('page1').get('Email').setValue(p1.Email);
          this.infoForm.get('page1').get('LinkedIn').setValue(p1.LinkedIn);
      }

      if (sessionStorage.getItem('page2')) {
        let p2=  JSON.parse(sessionStorage.getItem('page2'));
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
            this.infoForm
              .get('page2')
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

      if (sessionStorage.getItem('page3')) {
        let p3= JSON.parse(sessionStorage.getItem('page3'));

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
      this.flagFirst = true;
    }
    //page1
    this.infoForm.get('page1').valueChanges.subscribe((p1) => {
      sessionStorage.setItem('page1', JSON.stringify(p1));
    });

    //page2
    this.infoForm.get('page2').valueChanges.subscribe((p2) => {
      sessionStorage.setItem('page2', JSON.stringify(p2));
    });

    //page3
    this.infoForm.get('page3').valueChanges.subscribe((p3) => {
      sessionStorage.setItem('page3', JSON.stringify(p3));
    });
  }

  ChangeLanguage() {
    this.LanguageS.getLanguage().subscribe({
      next: (l) => {
        if (l == 'en') {
          this.SetIttemsEnglish();
          this.Languagertl = false;
        } else if (l == 'he') {
          this.SetIttemsHebrew();
          this.Languagertl = true;
        } else {
          this.SetIttemsEnglish();
          this.Languagertl = false;
        }
      },
      error: (e) => {
        this.SetIttemsEnglish();
        this.Languagertl = false;
      },
    });
  }
  SetIttemsEnglish() {
    this.items = [
      {
        label: 'Personal',
        command: (event: any) => {
          this.activeIndex = 0;
        },
      },
      {
        label: 'Skills',
        command: (event: any) => {
          this.activeIndex = 1;
        },
      },
      {
        label: 'Experience',
        command: (event: any) => {
          this.activeIndex = 2;
        },
      },
      {
        label: 'Download',
        command: (event: any) => {
          this.activeIndex = 3;
        },
      },
    ];
  }

  SetIttemsHebrew() {
    this.items = [
      {
        label: 'פרטים אישיים',
        command: (event: any) => {
          this.activeIndex = 0;
        },
      },
      {
        label: 'מקצועות',
        command: (event: any) => {
          this.activeIndex = 1;
        },
      },
      {
        label: 'ניסיון',
        command: (event: any) => {
          this.activeIndex = 2;
        },
      },
      {
        label: 'הורדה',
        command: (event: any) => {
          this.activeIndex = 3;
        },
      },
    ];
  }

  getSuggestion(_input: string, num: number) {
    this._busyService.On();
    this.firstTime = true;
    this.suggestionsBool = [false, false, false];
    const parser = new DOMParser();
    const doc = parser.parseFromString(_input, 'text/html');

    let y = doc.body.textContent.split(' ');

    if (y.find((p) => p != '') && doc.body.textContent != null) {
      this.onTextChanged(doc.body.textContent || '', num);
      this.requriedEditor = false;
    } else {
      this.requriedEditor = true;
      this._busyService.Off();
      this._massege.showInfo('Please make sure you have written something');
      return;
    }
  }

  public async onTextChanged(_input: string, num: number): Promise<void> {
    this._backStatic.AddClick();

    let _text = '';
    if (num == 1) {
      _text = 'improve this summary in resume.\n:' + _input;
    } else if (num == 2) {
      _text = 'improve this description in the resume.\n:' + _input;
    }

    try {
      const completions = await this.openai.complete({
        engine: 'davinci',
        prompt: _text,
        maxTokens: 85,
        n: 2,
        stop: null,
        temperature: 0.5,
      });
      this.suggestionsOpen = true;
      this.suggestions = completions.data.choices.map((choice) =>
        choice.text.trim()
      );
      this._busyService.Off();
    } catch (error) {
      this._busyService.Off();
      this._massege.showError(
        'something went wrong with the openai server, please try again in few minutes'
      );
    }

    this.closeAiicon = 'chevron_left';
  }

  closeSuggestions() {
    this.suggestionsOpen = !this.suggestionsOpen;

    if (this.suggestionsOpen) {
      this.closeAiicon = 'chevron_left';
      return;
    }
    this.closeAiicon = 'chevron_right';
  }

  copy_response(item: string, place: number) {
    this.suggestionsBool[place] = true;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = item;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // Click occurred outside of UL element, so close the list here
  onDocumentClick(event) {
    if (
      this.myList &&
      !this.myList.nativeElement.contains(event.target) &&
      !this.imgaiClick?.nativeElement?.contains(event?.target)
    ) {
      this.suggestionsOpen = false;
      this.closeAiicon = 'chevron_right';
    }
  }
}
