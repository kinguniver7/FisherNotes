import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpiningService {

  private API_URL = environment.API_URL;
  constructor(private db: AngularFirestore) { }
  
  /**
   * Получить все удилища для спининговой ловли
   * @param userId - id пользователя
   */
  public getAllRods(): Observable<any[]> {
    return this.db.collection('Rods').valueChanges();
  }

}
