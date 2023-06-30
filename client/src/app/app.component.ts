import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLangugeSService } from './services/change-languge-s.service';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BusyService } from './services/busy.service';
import { BackEndService } from './services/back-end.service';
import { DataService } from './services/data.service';
import { IdentificationService } from './services/identification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  displayBusy: boolean = false;

  constructor(
    private translet: TranslateService,
    private languege: ChangeLangugeSService,
    private primengConfig: PrimeNGConfig,
    private busyService: BusyService,
    private Identification: IdentificationService,
    private backEnd: BackEndService,
  ) {
    this.translet.setDefaultLang('en');
    translet.addLangs(['en', 'he']);

    languege.getLanguage().subscribe((lang) => {
      this.translet.use(lang);
      document.documentElement.lang = lang;
    });
  }

  async ngOnInit() {
    this.primengConfig.ripple = true;
     this.backEnd.createUser();

    this.busyService.register().subscribe((_busy) => {
      this.displayBusy = _busy;
    });
    if (localStorage.getItem('linkedinToken')) {
      this.Identification.checkTokenlinkedin();
    }
    else if (localStorage.getItem('GoogleToken')) {
      this.Identification.checkTokenGoogle();
    }
  }
}
