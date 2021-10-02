import { take } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser | null = null;
  cartQuantity: number = 0;
  cartSubscription: Subscription = new Subscription();

  constructor(
    private authSvc: AuthService,
    private cartSvc: ShoppingCartService
  ) {}

  logout() {
    this.authSvc.logout();
  }

  async ngOnInit() {
    this.authSvc.appUser$.subscribe((appUser) => (this.appUser = appUser));
    let cart$ = await this.cartSvc.getCart();

    this.cartSubscription = cart$.subscribe((cart: any) => {
      this.cartQuantity = cart.cartQuantity;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
