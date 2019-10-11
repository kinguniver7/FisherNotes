import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { CatchingType } from '../core/interfaces/catching-type';
import { Rod } from '../core/interfaces/fishing_tackle/rod';

@Injectable({
  providedIn: 'root'
})
export class RodService {
  private rodsCollection: AngularFirestoreCollection<Rod>;
  rods: Observable<Rod[]>;
  constructor(private db: AngularFirestore) { 
    this.rodsCollection = this.db.collection<Rod>('Rods');

    this.rods = this.rodsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Rod;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  /**
   * Получить все удилища по типу ловли
   * @param userId - id пользователя
   */
  public getAllRods(type: CatchingType = CatchingType.All as number): Observable<Rod[]> {
    return this.rods.pipe(map(types => types.map(item => {if (item.catchingType === type) { return item; }})));
  }

  public addRod(rod: Rod) {
    return this.rodsCollection.add(rod);
  }

}
