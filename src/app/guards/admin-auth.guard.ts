import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authSvc.appUser$.pipe(map((appUser) => appUser.isAdmin));
  }
}
