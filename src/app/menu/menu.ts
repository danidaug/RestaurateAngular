import { Component,AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import{ Restaurant } from '../services/restaurant';
import { IDish } from '../interfaces/idish';
import { HttpClient } from '@angular/common/http';
import {AsyncPipe} from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import {DishFilterPipe} from '../pipes/dish-filter-pipe';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  imports: [AsyncPipe, CurrencyPipe, CommonModule , DishFilterPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  dishes$ : Observable<IDish[]>;
  category: string = 'todos';
  dishes: IDish[] = [];

  constructor(private restaurnat: Restaurant) {
    this.dishes$ = this.restaurnat.getDishes();
  }

  changeCategory(cat: string) {
    this.category = cat;
  }

  sortPrice(order: 'asc' | 'desc') {
    this.dishes$ = this.dishes$.pipe(
      map(dishes => {
        return [...dishes].sort((a, b) => {
          return order === 'asc' ? a.price - b.price : b.price - a.price;
        });
      })
    );
  }

  ordenarBaratos() {
    this.dishes = [...this.dishes].sort((a, b) => a.price - b.price);
  }
  ordenarCaros() {
    this.dishes = [...this.dishes].sort((a, b) => b.price - a.price);
  }

  
}

