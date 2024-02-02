import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  let routes = inject(Router)
  let admin = JSON.parse(localStorage['current_admin'])

  if (!admin) {
    routes.navigate(['/adminligin'])
  }
  
  return true;
};
