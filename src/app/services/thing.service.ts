import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Thing } from '../core/interfaces/fishing_tackle/thing';

@Injectable({
  providedIn: 'root'
})
export class ThingService {

  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  /**
   * Получить все снасти для спининговой ловли
   * @param userId - id пользователя
   */
  public getAllThingsForSpinFishing(userId: any) {
    return this.http.get<Thing[]>(this.API_URL + 'things', { params: { } });
  }
}
