import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Thing } from '../core/interfaces/fishing_tackle/thing';

@Injectable({
  providedIn: 'root'
})
export class StoreroomService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }
  
  
}
