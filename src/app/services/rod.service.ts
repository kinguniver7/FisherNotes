import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FishingType } from '../core/interfaces/catching-type';
import { Rod } from '../core/interfaces/fishing_tackle/rod';

@Injectable({
  providedIn: 'root'
})
export class RodService {
  private rodsCollection: AngularFirestoreCollection<Rod>;
  rods: Observable<Rod[]>;
  constructor(private db: AngularFirestore) {
    this.rodsCollection = this.db.collection<Rod>('Rods');
  }

  /**
   * Получить все удилища по типу ловли
   * @param userId - id пользователя
   */
  public getAllRods(userId: string, type: FishingType = FishingType.All as number): Observable<Rod[]> {
    return this.rodsCollection.valueChanges({idField: 'id'}).pipe(
      map(items => items.filter(item => item.userId === userId)));
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
