import { take } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | null = null;
  cartQuantity: number = 0;

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
    cart$.subscribe((cart) => {
      this.cartQuantity = this.cartSvc.getCartQuantity(cart);
    });
  }
}
