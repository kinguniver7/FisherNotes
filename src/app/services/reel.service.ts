import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reel } from '../core/interfaces/fishing_tackle/reel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReelService {
  private firestoreCollection: AngularFirestoreCollection<Reel>;
  items: Observable<Reel[]>;
  constructor(private db: AngularFirestore) {
    this.firestoreCollection = this.db.collection<Reel>('Reels');
  }

  /**
   * Получить все катушки
   * @param userId - id пользователя
   */
  public getAll(userId: string): Observable<Reel[]> {
    return this.firestoreCollection.valueChanges({idField: 'id'}).pipe(
      map(items => items.filter(item => item.userId === userId)));
  }

  public getById(id: any): Observable<Reel> {
    const itemRef: any = this.firestoreCollection.doc<Reel>(id);
    this.db.doc(itemRef);
    return itemRef.valueChanges();
  }

  public add(item: Reel) {
    return this.firestoreCollection.add(item);
  }

  public update(item: Reel) {
    return this.firestoreCollection.doc<Reel>(item.id).update(item);
  }

  public remove(id: any) {
    return this.firestoreCollection.doc<Reel>(id).delete();
  }

}
