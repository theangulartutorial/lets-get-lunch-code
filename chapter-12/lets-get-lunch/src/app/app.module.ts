import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Ng2Webstorage } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2Webstorage
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
