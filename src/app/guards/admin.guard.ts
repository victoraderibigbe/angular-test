import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  let routes = inject(Router)
  return (localStorage['current_admin']) ? true : routes.navigate(['./adminlogin'])
};
