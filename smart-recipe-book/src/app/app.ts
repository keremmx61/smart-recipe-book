import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Doğru dosya adlarıyla import ediyoruz
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('smart-recipe-book');
}