import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from 'shared/models/app-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  save(user: firebase.User) {
    this.db
      .doc(`/users/${user.uid}`)
      .get()
      .subscribe((res) => {
        if (res.exists) {
          this.db.doc(`/users/${user.uid}`).update({
            name: user.displayName,
            email: user.email,
          });
        } else {
          this.db.doc(`/users/${user.uid}`).set({
            name: user.displayName,
            email: user.email,
          });
        }
      });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.doc(`/users/${uid}`).valueChanges() as Observable<AppUser>;
  }
}
