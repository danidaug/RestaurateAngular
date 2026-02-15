import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Accessibility } from "./accessibility/accessibility";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Accessibility],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Restaurante');
}
