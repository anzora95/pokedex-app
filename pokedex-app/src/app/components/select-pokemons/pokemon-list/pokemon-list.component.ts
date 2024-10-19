import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';
import { Pokelist } from 'src/app/models/pokelist';
import { forkJoin, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  private profileDataSubscription: Subscription;
  search: FormControl = new FormControl('');
  isLastPage = false;
  pokemons: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  allowSave: boolean = false;
  trainer: Trainer;

  constructor( private trainerService: TrainerService, private pokemonService: PokemonService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.getPage();
    this.getProfileDataSubscription();
    
  }

  getPage() {
    if(!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService.getPokemonList(0,151)
      .subscribe((list: Pokelist[]) => {
        if(list.length === 0) {
          this.isLastPage = true;
        }

        if(!this.isLastPage) {
          this.getPokemon(list);
        }
      })
      
    }
  }
  private getProfileDataSubscription(): void {
    this.profileDataSubscription = this.activatedRoute.data.subscribe(({trainer}: { trainer: Trainer })=>{
      this.trainer = trainer;
      // setTimeout(() => {
      //   this.isFetching = false;
      // }, 1000);  //simular 1 segundo de tiempo de carga de datos
      this.preselectPokemons();
    });
  }

  isCardDisabled(pokemon: Pokemon): boolean {
    const selectedCount = this.pokemons.filter(p => p.isSelected).length;
    return selectedCount >= 3 && !pokemon.isSelected;
  }

  private getPokemon(list: Pokelist[]) {
    const arr: Observable<Pokemon>[] = [];
    list.map((value: Pokelist)=> {
      arr.push(this.pokemonService.getPokemonDetail(value.name))
    });

    forkJoin([...arr]).subscribe((pokemons: Pokemon[]) => {
      this.pokemons.push(...pokemons);
      this.allPokemons = [...this.pokemons];
      this.isLoading = false;
      // this.preselectPokemons();
      // this.updateAllowSave();
    });
  }

  filterPokemons(): void {
    const searchTerm = this.search.value.toLowerCase();
    if (searchTerm) {
        this.pokemons = this.allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm) ||
            pokemon.id.toString().includes(searchTerm)
        );
    } else {
        this.pokemons = [...this.allPokemons];
    }
    this.updateAllowSave();
  }

  handlePokemonSelection(pokemon: Pokemon): void {
    if (!pokemon.isSelected) {
      const selectedCount = this.pokemons.filter(p => p.isSelected).length;
      if (selectedCount < 3) {
        pokemon.isSelected = true;
      } else {
        // this.snackbar.open('Solo puedes seleccionar un máximo de 3 pokemones', 'OK', { duration: 3000 });
        console.log("Solo puedes seleccionar un máximo de 3 pokemons");
        
      }
    } else {
      pokemon.isSelected = false;
    }
    this.updateAllowSave();
  }

  private preselectPokemons(): void {
    if (this.trainer && this.trainer.pokemons_owned) {
      this.pokemons.forEach(pokemon => {
        if (this.trainer.pokemons_owned.some(ownedPokemon => ownedPokemon.id === pokemon.id)) {
          pokemon.isSelected = true;
        }
      });
    }
  }

  private updateAllowSave(): void {
    const selectedCount = this.pokemons.filter(p => p.isSelected).length;
    this.allowSave = selectedCount < 3;
  }

  submitSelection(): void {
    this.trainer.pokemons_owned = this.pokemons.filter(p => p.isSelected);
    console.log("seleccionados", this.pokemons.filter(p => p.isSelected))
    this.trainerService.storeTrainer(this.trainer);
    console.log(this.trainer);
    // this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.profileDataSubscription.unsubscribe();
  }


}
