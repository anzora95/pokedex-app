import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';


@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss']
})
export class TrainerProfileComponent implements OnInit {

  isFetching: boolean = false;
  trainer: Trainer;
  profileDataSubscription: Subscription;
  pokemons: Pokemon[];

  constructor(private activatedRoute: ActivatedRoute,
    private trainerService: TrainerService, private router: Router){}

  ngOnInit(): void {
    this.getProfileDataSubscription();
  }

  private getProfileDataSubscription(): void {

    console.log("this trainer information")
    this.profileDataSubscription = this.activatedRoute.data.subscribe(({trainer}: { trainer: Trainer })=>{
      this.trainer = trainer;
      this.isFetching = false;
      this.pokemons = trainer.pokemons_owned;
     
      // console.log(this.trainer);
      /* 
      setTimeout(() => {
        this.isFetching = false;
      }, 1000);  //simular 1 segundo de tiempo de carga de datos */
    });
  }

  onProfileEditButton() {
    this.router.navigate(['/configuration']);
  }

  onPokemonEditButton() {
    this.router.navigate(['/configuration/pokemon-selection']);
  }


}
