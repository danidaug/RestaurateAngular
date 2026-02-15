import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Restaurant } from '../services/restaurant';
import { IDish } from '../interfaces/idish';
import { CommonModule } from '@angular/common';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  dishes: IDish[] = [];
  isEditing: boolean = false;
  editingId: string | null = null;

  constructor(private restaurant: Restaurant, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDishes();
  }

  loadDishes(): void {
    this.restaurant.getDishes().subscribe(data => {
      this.dishes = data;
      this.cdr.detectChanges();
    });
  }

  remove(id: any) {
    if (confirm('¿Eliminar plato?')) {
      this.restaurant.deleteDish(id.toString()).subscribe({
        next: () => {
          this.dishes = this.dishes.filter(dish => dish.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }

  toggleEnabled(dish: IDish) {
    // Usamos id.toString() para evitar el error de tipos si id es number
    this.restaurant.updateDish(dish.id.toString(), { enabled: !dish.enabled }).subscribe(() => {
      dish.enabled = !dish.enabled;
      this.cdr.detectChanges();
    });
  }

  dishForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0.1)]),
    category: new FormControl('entrantes', [Validators.required]),
    image: new FormControl('https://picsum.photos/200/300'),
    enabled: new FormControl(true)
  });

  editDish(dish: IDish) {
    this.isEditing = true;
    // CORRECCIÓN: Convertimos el id a string antes de guardarlo en editingId
    this.editingId = dish.id.toString();

    this.dishForm.patchValue({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      category: dish.category,
      image: dish.image,
      enabled: dish.enabled
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {
    if (this.dishForm.invalid) return;

    // Usamos 'as any' o creamos un objeto limpio para el envío
    const dishData = this.dishForm.value as any;

    if (this.isEditing && this.editingId) {
      // MODO EDICIÓN
      this.restaurant.updateDish(this.editingId, dishData).subscribe(() => {
        this.loadDishes();
        this.resetForm();
        alert('Plato actualizado');
      });
    } else {
      // MODO CREACIÓN
      this.restaurant.addDish(dishData).subscribe((newDish) => {
        this.dishes.push(newDish);
        this.resetForm();
        this.cdr.detectChanges();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.editingId = null;
    this.dishForm.reset({
      category: 'entrantes',
      enabled: true,
      image: 'https://picsum.photos/200/300',
      price: 0 // Añadido para que no quede null
    });
  }
}
