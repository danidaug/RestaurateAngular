import { Injectable } from '@angular/core';
import { IDish } from '../interfaces/idish';
import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Restaurant {
  private restaurantEndpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<IDish[]> {
    return this.http.get<IDish[]>(`${this.restaurantEndpoint}/dishes`);

  }

  addDish(dish: IDish): Observable<IDish> {
    return this.http.post<IDish>(`${this.restaurantEndpoint}/dishes`, dish);
  }

  deleteDish(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/dishes/${id}`);
  }

  updateDish(id: any, changes: any): Observable<IDish> {
    return this.http.patch<IDish>(`http://localhost:3000/dishes/${id}`, changes);
  }
}
