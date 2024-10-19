import { NgModule } from '@angular/core';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { SelectPokemonsComponent } from './components/select-pokemons/select-pokemons/select-pokemons.component';
import { Routes,RouterModule } from '@angular/router';
import { profileGuard } from './guards/profile.guard';
import { ProfileDataResolver } from './resolvers/profile-data.resolvers';

const routes: Routes = [
  {path: 'configuration', component: AccountFormComponent },
  {path: 'configuration/pokemon-selection', component: SelectPokemonsComponent, canActivate: [profileGuard], resolve: {trainer: ProfileDataResolver}},
  {path: '', pathMatch: 'full', redirectTo: 'profile'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
