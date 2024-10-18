import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainerService } from '../services/trainer.service';

export const profileGuard: CanActivateFn = (    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | UrlTree | boolean => {
  const trainer = inject(TrainerService).getTrainer();

  if (trainer) {
      return true
  } else {
      return inject(Router).createUrlTree(['/configuration'])
  }
};
