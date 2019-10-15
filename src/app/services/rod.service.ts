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

    /* this.rods = this.rodsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Rod;
        data.id = a.payload.doc.id;
        return data;
      }))
    ); */
  }

  /**
   * Получить все удилища по типу ловли
   * @param userId - id пользователя
   */
  public getAllRods(type: CatchingType = CatchingType.All as number): Observable<Rod[]> {
    return this.rodsCollection.valueChanges({idField: 'id'});
    /* return this.rods.pipe(map(types => types.map(item => {
      if (type === CatchingType.All as number) {
        return item;
      } else if (item.catchingType === type) {
         return item;
        }
      }))); */
  }

  public getRodById(id: any): Observable<Rod> {
    const rodRef: any = this.rodsCollection.doc<Rod>(id);
    this.db.doc(rodRef);
    return rodRef.valueChanges();
  }

  public addRod(rod: Rod) {
    return this.rodsCollection.add(rod);
  }

  public updateRod(rod: Rod) {
    return this.rodsCollection.doc<Rod>(rod.id).update(rod);
  }

  public removeRod(id: any) {
    return this.rodsCollection.doc<Rod>(id).delete();
  }

}
