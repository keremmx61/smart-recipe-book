import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // API'nin ana adresi
  private readonly API_URL = 'https://www.themealdb.com/api/json/v1/1/';

  // Servisin HttpClient'ı kullanabilmesi için onu 'constructor' içinde tanımlıyoruz.
  constructor(private http: HttpClient) { }

  /**
   * Verilen bir isme göre yemekleri arar.
   * @param name Aranacak yemeğin adı (örn: "Arrabiata")
   * @returns Gözlemlenebilir (Observable) bir API yanıtı döner.
   */
  searchMealsByName(name: string): Observable<any> {
    return this.http.get(`${this.API_URL}search.php?s=${name}`);
  }

  /**
   * Verilen bir ID'ye göre tek bir yemeğin detaylarını getirir.
   * @param id Detayları alınacak yemeğin ID'si (örn: "52772")
   * @returns Gözlemlenebilir (Observable) bir API yanıtı döner.
   */
  getMealDetailsById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}lookup.php?i=${id}`);
  }
}