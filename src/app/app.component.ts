import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngShop';

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private userSvc: UserService
  ) {
    this.authSvc.user$.subscribe((user) => {
      if (!user) return;

      userSvc.save(user);
      let returnUrl = localStorage.getItem('returnUrl');

      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
