import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bait } from '../core/interfaces/fishing_tackle/bait';

@Injectable({
  providedIn: 'root'
})
export class BaitService {
  private firestoreCollection: AngularFirestoreCollection<Bait>;
  items: Observable<Bait[]>;
  constructor(private db: AngularFirestore) {
    this.firestoreCollection = this.db.collection<Bait>('Bait');
  }

  /**
   * Получить все катушки
   * @param userId - id пользователя
   */
  public getAll(userId: string): Observable<Bait[]> {
    return this.firestoreCollection.valueChanges({idField: 'id'}).pipe(
      map(items => items.filter(item => item.userId === userId)));
  }

  public getById(id: any): Observable<Bait> {
    const itemRef: any = this.firestoreCollection.doc<Bait>(id);
    this.db.doc(itemRef);
    return itemRef.valueChanges();
  }

  public add(item: Bait) {
    return this.firestoreCollection.add(item);
  }

  public update(item: Bait) {
    return this.firestoreCollection.doc<Bait>(item.id).update(item);
  }

  public remove(id: any) {
    return this.firestoreCollection.doc<Bait>(id).delete();
  }

}
