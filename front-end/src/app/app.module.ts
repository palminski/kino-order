import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DataComponent } from './pages/data/data.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataComponent,
    NavigationComponent,
    SignUpFormComponent,
    LogInComponent,
    LogInFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
