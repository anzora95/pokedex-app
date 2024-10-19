import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { Pokelist } from 'src/app/models/pokelist';
import { forkJoin, Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  isLoading: boolean;
  search: FormControl = new FormControl('');
  isLastPage = false;
  pokemons: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  allowSave: boolean = false;

  constructor( private trainerService: TrainerService, private pokemonService: PokemonService){}

  ngOnInit(): void {

    this.getPage();
    
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

  private updateAllowSave(): void {
    const selectedCount = this.pokemons.filter(p => p.isSelected).length;
    this.allowSave = selectedCount < 3;
  }


}
