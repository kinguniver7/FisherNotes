import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rod, RodApplicationType } from '../core/interfaces/fishing_tackle/rod';

@Injectable({
  providedIn: 'root'
})
export class SpiningService {

  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }
  
  /**
   * Получить все удилища для спининговой ловли
   * @param userId - id пользователя
   */
  public getAllRods(userId: any) {
    return this.http.get<Rod[]>(this.API_URL + 'rods', { params: { applicationType: RodApplicationType.spining.toString()} });
  }

}
