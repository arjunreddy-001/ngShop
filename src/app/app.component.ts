import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngShop';

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    this.authSvc.user$.subscribe((user) => {
      if (!user) return;

      this.userSvc.save(user);
      let returnUrl = localStorage.getItem('returnUrl');

      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    });
  }
}
