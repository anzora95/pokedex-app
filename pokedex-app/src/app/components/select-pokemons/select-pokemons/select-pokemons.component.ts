import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'app-select-pokemons',
  templateUrl: './select-pokemons.component.html',
  styleUrls: ['./select-pokemons.component.scss']
})
export class SelectPokemonsComponent implements OnInit{

  isFetching: boolean = false;
  trainer: Trainer;
  private profileDataSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private trainerService: TrainerService, ){ }

  ngOnInit(): void {
    this.getProfileDataSubscription();
  }

  private getProfileDataSubscription(): void {
    this.profileDataSubscription = this.activatedRoute.data.subscribe(({trainer}: { trainer: Trainer })=>{
      this.trainer = trainer;
      setTimeout(() => {
        this.isFetching = false;
      }, 1000);  //simular 1 segundo de tiempo de carga de datos
      // this.preselectPokemons();
    });
  }

}
