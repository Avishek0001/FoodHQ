import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
const router = inject(Router)

  const isAuthenticated = localStorage.getItem('uid') !== null;
  if(!isAuthenticated){
    router.navigate(['/login']);
    return false;
  }
  return true;

  
};


