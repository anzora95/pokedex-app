import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trainer } from '../models/trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  trainerDataChanged = new Subject<Trainer>();
  private trainer: Trainer;

  constructor() { }

  getTrainer(): Trainer {
    const storedTrainer = sessionStorage.getItem("PokemonTrainer");
    return storedTrainer ? JSON.parse(storedTrainer) : null;
  }

  storeTrainer(trainer: Trainer): void {
    sessionStorage.setItem("PokemonTrainer", JSON.stringify(trainer))
  }
}
