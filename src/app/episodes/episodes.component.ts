import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7055/api/episodes';

  page = signal(1);
  episodes = signal<any>(null);

  constructor() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    this.http.get(`${this.baseUrl}?page=${this.page()}`).subscribe(data => {
      this.episodes.set(data);
    });
  }

  nextPage() {
    this.page.update(p => p + 1);
    this.loadEpisodes();
  }

  previousPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.loadEpisodes();
    }
  }
}
