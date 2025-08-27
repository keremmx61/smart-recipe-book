import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { StorageService } from '../../services/storage';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class Favorites implements OnInit {
  favoriteRecipes: any[] = [];
  isLoading: boolean = true;

  constructor(
    private storageService: StorageService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const favoriteIds = this.storageService.getFavorites();

    if (favoriteIds.length === 0) {
      // Favori tarif yoksa yüklemeyi bitir
      this.isLoading = false;
      return;
    }

    // Her bir favori ID'si için bir API isteği (Observable) oluştur
    const favoriteObservables = favoriteIds.map(id => {
      return this.recipeService.getMealDetailsById(id);
    });

    // forkJoin ile tüm API isteklerinin bitmesini bekle
    forkJoin(favoriteObservables).subscribe(responses => {
      // Gelen tüm yanıtları işle ve tek bir diziye dönüştür
      this.favoriteRecipes = responses.map(res => res.meals[0]);
      this.isLoading = false;
    });
  }
}