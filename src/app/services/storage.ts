import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly FAVORITES_KEY = 'recipeFavorites';

  constructor() { }

  // Hafızadaki tüm favori ID'lerini getirir
  getFavorites(): string[] {
    const favoritesString = localStorage.getItem(this.FAVORITES_KEY);
    return favoritesString ? JSON.parse(favoritesString) : [];
  }

  // Bir tarifin favori olup olmadığını kontrol eder
  isFavorite(recipeId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(recipeId);
  }

  // Bir tarifi favorilere ekler veya çıkarır
  toggleFavorite(recipeId: string): void {
    let favorites = this.getFavorites();
    const index = favorites.indexOf(recipeId);

    if (index === -1) {
      // Favorilerde değil, ekle
      favorites.push(recipeId);
    } else {
      // Zaten favorilerde, çıkar
      favorites.splice(index, 1);
    }

    // Güncel listeyi tekrar hafızaya kaydet
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }
}