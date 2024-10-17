import { NgModule } from '@angular/core';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'configuration', component: AccountFormComponent, },
  {path: '', pathMatch: 'full', redirectTo: 'profile'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
