import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';

// material components
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PokemonListComponent } from './components/select-pokemons/pokemon-list/pokemon-list.component';
import { ProfileCardComponent } from './components/select-pokemons/profile-card/profile-card.component';
import { SelectPokemonsComponent } from './components/select-pokemons/select-pokemons/select-pokemons.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';
import { PokemonTeamComponent } from './components/trainer-profile/pokemon-team/pokemon-team.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';
import { PokemonStatBarComponent } from './extra/pokemon-stat-bar/pokemon-stat-bar.component';
import { LoadingComponent } from './extra/loading/loading/loading.component';


// import Provi

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountFormComponent,
    PokemonListComponent,
    ProfileCardComponent,
    SelectPokemonsComponent,
    PokemonTeamComponent,
    TrainerProfileComponent,
    PokemonStatBarComponent,
    LoadingComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    HttpClientModule
  ],
  providers: [provideNgxMask(), PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
