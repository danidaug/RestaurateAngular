import { Pipe, PipeTransform } from '@angular/core';
import { IDish } from '../interfaces/idish';

@Pipe({
  name: 'dishFilter',
})
export class DishFilterPipe implements PipeTransform {

  transform(dishes: IDish[] | null, category : string): IDish[] {

    if (!dishes) return [];
    if (!category || category === 'todos') return dishes;
    return dishes.filter(dish =>
      dish.category.toLowerCase() === category.toLowerCase()
    );

  }

}
