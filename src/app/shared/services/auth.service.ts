import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user.model';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userSvc: UserService,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log('Auth Svc', returnUrl);

    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithRedirect(provider);
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  get appUser$(): Observable<AppUser | any> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userSvc.get(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }
}
