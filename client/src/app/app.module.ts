import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { WelocomePageComponent } from './components/welocome-page/welocome-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService,} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormInputComponent } from './components/form-input/form-input.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { FormOutputComponent } from './components/form-output/form-output.component';
import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
//import {MenuItem} from 'primeng/api';                  //api
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditorModule } from 'primeng/editor';
import { StepsModule } from 'primeng/steps';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { GetDatePipe } from './pipes/get-date.pipe';
import { InputMaskModule } from 'primeng/inputmask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './components/login/login.component';
import { PasswordModule } from 'primeng/password';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PresentsResumeComponent } from './components/presents-resume/presents-resume.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CardModule } from 'primeng/card';
import { FormattedPostedDatePipe } from './pipes/formatted-posted-date.pipe';
import { FormatYearPipe } from './pipes/format-year.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelocomePageComponent,
    FormInputComponent,
    FormOutputComponent,
    GetDatePipe,
    LoginComponent,
    PrivacyComponent,
    FooterComponent,
    ProfileComponent,
    PresentsResumeComponent,
    JobsComponent,
    FormattedPostedDatePipe,
    FormatYearPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSliderModule,
    AccordionModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    CalendarModule,
    MatProgressBarModule,
    CascadeSelectModule,
    StepsModule,
    EditorModule,
    InputMaskModule,
    ProgressSpinnerModule,
    ToastModule,
    RippleModule,
    PasswordModule,
    CardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [TranslateService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
