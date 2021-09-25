import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFirestore) {}

  getAll() {
    return this.db.collection(`categories`).valueChanges({ idField: 'key' });
  }
}
