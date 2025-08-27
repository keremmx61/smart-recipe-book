import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail implements OnInit {
  recipeDetails: any = null; // Gelen tarif detayını saklamak için
  ingredients: { name: string, measure: string }[] = []; // Malzemeleri düzenli tutmak için
  isLoading: boolean = true; // Yüklenme durumunu kontrol etmek için

  constructor(
    private route: ActivatedRoute, // URL'deki bilgileri okumak için
    private recipeService: RecipeService // API'den veri çekmek için
  ) {}

  ngOnInit(): void {
    // Component yüklendiğinde URL'den 'id' parametresini al
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (recipeId) {
      // Servisi kullanarak o ID'ye ait tarifi getir
      this.recipeService.getMealDetailsById(recipeId).subscribe(response => {
        this.recipeDetails = response.meals[0];
        this.processIngredients(); // Malzemeleri işle
        this.isLoading = false; // Yüklenme tamamlandı
      });
    }
  }

  // API'den gelen dağınık malzemeleri (strIngredient1, strMeasure1 vb.)
  // düzenli bir diziye dönüştüren yardımcı fonksiyon
  processIngredients(): void {
    if (!this.recipeDetails) return;

    for (let i = 1; i <= 20; i++) {
      const ingredient = this.recipeDetails[`strIngredient${i}`];
      const measure = this.recipeDetails[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        this.ingredients.push({ name: ingredient, measure: measure });
      }
    }
  }
}