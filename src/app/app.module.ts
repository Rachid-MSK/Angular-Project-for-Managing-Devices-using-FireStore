import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonPremierComponent } from './mon-premier/mon-premier.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppareilService } from './services/appareil.service';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './apparei-view/appareil-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes= [
  {path: '', component: AppareilViewComponent},
  {path: 'appareils', canActivate: [AuthGuardService], component: AppareilViewComponent},
  {path: 'appareils/:id', canActivate: [AuthGuardService], component: SingleAppareilComponent},
  {path: 'edit', canActivate: [AuthGuardService], component: EditAppareilComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'users', canActivate: [AuthGuardService], component: UserListComponent},
  {path: 'new-user', canActivate: [AuthGuardService], component: NewUserComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    NotFoundComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //pour utiliser two ways binding avec [(ngModel)]
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppareilService, AuthService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
