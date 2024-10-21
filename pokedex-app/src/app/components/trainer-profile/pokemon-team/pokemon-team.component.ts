import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit {

  @Input() pokemon: Pokemon;
  imageUrl: string;

  ngOnInit(): void {
    this.imageUrl = this.pokemon.sprites.front_default;
  }

  getPokemonType(list: any[], index: number) {

    console.log(list.filter(x => x.slot === index)[0]?.type.name);
    return list.filter(x => x.slot === index)[0]?.type.name;
  }

}
