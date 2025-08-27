import { Routes } from '@angular/router';

// Gerekli sayfa component'lerini programa dahil ediyoruz
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { Favorites } from './pages/favorites/favorites';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';

// URL yollarını ve karşılık gelen component'leri tanımlıyoruz
export const routes: Routes = [
    { path: '', component: Home }, // Ana sayfa
    { path: 'search', component: Search }, // Arama sayfası
    { path: 'favorites', component: Favorites }, // Favoriler sayfası
    { path: 'recipe/:id', component: RecipeDetail }, // Dinamik tarif detay sayfası
    { path: '**', redirectTo: '', pathMatch: 'full' } // Bilinmeyen bir URL girilirse ana sayfaya yönlendir
];