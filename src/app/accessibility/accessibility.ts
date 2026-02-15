import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessibility.html',
  styleUrl: './accessibility.css'
})
export class Accessibility {
  isOpen = false;
  private fontSize = 100;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleContrast() {
    this.document.body.classList.toggle('high-contrast');
  }

  toggleGrayscale() {
    this.document.body.classList.toggle('grayscale-mode');
  }

  changeFontSize(action: string) {
    const html = this.document.documentElement;
    if (action === 'increase') {
      this.fontSize += 10;
    } else {
      this.fontSize = 100;
    }
    html.style.fontSize = `${this.fontSize}%`;
  }

  isBold = false;

  toggleBold() {
    this.isBold = !this.isBold;
    this.document.body.classList.toggle('force-bold');
  }

  isLinksHighlighted = false;

  toggleLinks() {
    this.isLinksHighlighted = !this.isLinksHighlighted;
    this.document.body.classList.toggle('highlight-links');
  }
  isFocusEnabled = false;

  toggleFocus() {
    this.isFocusEnabled = !this.isFocusEnabled;
    this.document.body.classList.toggle('focus-outline');
  }
}
