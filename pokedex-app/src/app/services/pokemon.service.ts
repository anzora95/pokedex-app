import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokelist } from '../models/pokelist';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2/'; 

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number = 20) {
    return this.http.get<Pokelist[]>(this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit).pipe(
        map((x: any) => x.results)
      )
  }

  getPokemonDetail(pokemon: number | string) : Observable<Pokemon> {
    return this.http.get<Pokemon>(this.baseUrl + 'pokemon/' + pokemon);
  }
}
