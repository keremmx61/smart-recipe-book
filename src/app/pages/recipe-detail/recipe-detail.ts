import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.html',
  styleUrls: ['./recipe-detail.scss'] // styleUrl -> styleUrls ve dizi olarak düzeltildi
})
export class RecipeDetail implements OnInit {
  recipeDetails: any = null;
  ingredients: { name: string, measure: string }[] = [];
  isLoading: boolean = true;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      this.isFavorite = this.storageService.isFavorite(recipeId);

      this.recipeService.getMealDetailsById(recipeId).subscribe(response => {
        this.recipeDetails = response.meals[0];
        this.processIngredients();
        this.isLoading = false;
      });
    }
  }

  processIngredients(): void {
    if (!this.recipeDetails) return;

    this.ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = this.recipeDetails[`strIngredient${i}`];
      const measure = this.recipeDetails[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        this.ingredients.push({ name: ingredient, measure: measure });
      }
    }
  }

  toggleFavorite(): void {
    if (this.recipeDetails) {
      this.storageService.toggleFavorite(this.recipeDetails.idMeal);
      this.isFavorite = !this.isFavorite;
    }
  }
}