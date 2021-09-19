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
    authSvc.user$.subscribe((user) => {
      if (user) {
        userSvc.save(user);

        let returnUrl = localStorage.getItem('returnUrl') || '/';
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
