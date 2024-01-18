import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(private router: Router) {}

  chooseLanguage(language: string): void {
    this.router.navigate(['/how-it-works']);
  }
}
