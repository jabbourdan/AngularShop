import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from './services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private loggerService: LoggerService, private router: Router) {}

  canActivate(): boolean {
    if (!this.loggerService.isLoggedIn()) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true; 
  }
}
