import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { AppUser } from 'src/app/models/app-user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  appUser: AppUser | null = null;

  constructor(private authSvc: AuthService) {
    authSvc.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }

  logout() {
    this.authSvc.logout();
  }
}
