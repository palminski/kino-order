import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { DataComponent } from './pages/data/data.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'data', component:DataComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
