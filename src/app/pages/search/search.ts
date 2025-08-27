import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // Eklendi
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule, // *ngIf, *ngFor gibi direktifler için
    FormsModule,  // [(ngModel)] kullanabilmek için
    RouterLink    // routerLink için eklendi
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.scss'] // Düzeltildi
})
export class Search {
  public searchTerm: string = '';
  public searchResults: any[] = [];
  public hasSearched: boolean = false;

  constructor(private recipeService: RecipeService) {}

  performSearch(): void {
    this.hasSearched = true;
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }
    
    this.recipeService.searchMealsByName(this.searchTerm).subscribe(response => {
      if (response && response.meals) {
        this.searchResults = response.meals;
      } else {
        this.searchResults = [];
      }
    });
  }
}