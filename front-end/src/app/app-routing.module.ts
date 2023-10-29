import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { DataComponent } from './pages/data/data.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'data', component:DataComponent},
  {path: 'log-in', component:LogInComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
