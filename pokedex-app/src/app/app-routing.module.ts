import { NgModule } from '@angular/core';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { SelectPokemonsComponent } from './components/select-pokemons/select-pokemons/select-pokemons.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';
import { Routes,RouterModule } from '@angular/router';
import { profileGuard } from './guards/profile.guard';
import { ProfileDataResolver } from './resolvers/profile-data.resolvers';

const routes: Routes = [
  {path: 'configuration', component: AccountFormComponent, resolve: {trainer: ProfileDataResolver} },
  {path: 'configuration/pokemon-selection', component: SelectPokemonsComponent, canActivate: [profileGuard], resolve: {trainer: ProfileDataResolver}},
  {path: 'profile', component: TrainerProfileComponent, resolve: {trainer: ProfileDataResolver}, canActivate: [profileGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'profile'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
