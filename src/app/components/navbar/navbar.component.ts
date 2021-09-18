import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  authUser: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user) => (this.authUser = user));
  }

  logout() {
    this.afAuth.signOut();
  }
}
