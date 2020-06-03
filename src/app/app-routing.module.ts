import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GoogleAssistComponent } from './google-assist/google-assist.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'real-time-assist', component: GoogleAssistComponent, loadChildren: './google-assist/google-assist.module#GoogleAssistModule' },
  { path: '**', redirectTo: 'real-time-assist' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
