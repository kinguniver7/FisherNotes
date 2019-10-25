import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Wobbler } from '../core/interfaces/fishing_tackle/spining/wobbler';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WobblerService {
  private firestoreCollection: AngularFirestoreCollection<Wobbler>;
  items: Observable<Wobbler[]>;
  constructor(private db: AngularFirestore) {
    this.firestoreCollection = this.db.collection<Wobbler>('Wobblers');
  }

  /**
   * Получить все воблера
   * @param userId - id пользователя
   */
  public getAll(userId: string): Observable<Wobbler[]> {
    return this.firestoreCollection.valueChanges({idField: 'id'}).pipe(
      map(items => items.filter(item => item.userId === userId)));
  }

  public getById(id: any): Observable<Wobbler> {
    const itemRef: any = this.firestoreCollection.doc<Wobbler>(id);
    this.db.doc(itemRef);
    return itemRef.valueChanges();
  }

  public add(item: Wobbler) {
    return this.firestoreCollection.add(item);
  }

  public update(item: Wobbler) {
    return this.firestoreCollection.doc<Wobbler>(item.id).update(item);
  }

  public remove(id: any) {
    return this.firestoreCollection.doc<Wobbler>(id).delete();
  }

}
