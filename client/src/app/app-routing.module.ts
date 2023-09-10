import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveMangerGuard } from './active-manger.guard';
import { FormInputComponent } from './components/form-input/form-input.component';
import { LoginComponent } from './components/login/login.component';
import { PresentsResumeComponent } from './components/presents-resume/presents-resume.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelocomePageComponent } from './components/welocome-page/welocome-page.component';
import { JobsComponent } from './components/jobs/jobs.component';

const routes: Routes = [
{path:"welcome",component:WelocomePageComponent},
{path:"welcome/login",component:WelocomePageComponent},
{path:"main",component:FormInputComponent},
{path:"login",component:LoginComponent},
{path:"privacy",component:PrivacyComponent},
{path:"resume/:id",component:PresentsResumeComponent},
{path:"profile",component:ProfileComponent},
{path:"jobs/:job/:country",component:JobsComponent},
//{path:"job/:id",component:OnePageJobComponent},
{path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[ActiveMangerGuard] },
{path:"",component:WelocomePageComponent},
{path:"**" ,redirectTo:'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
