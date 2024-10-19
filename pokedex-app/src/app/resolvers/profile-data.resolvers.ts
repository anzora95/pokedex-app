import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TrainerService } from '../services/trainer.service';
import { Trainer } from '../models/trainer';

export const ProfileDataResolver: ResolveFn<Trainer> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {

    // console.log("se esta ejecuatando el resolver")
    
    return inject(TrainerService).getTrainer();
}