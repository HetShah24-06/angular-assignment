import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, Post } from '../../core/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './api-data.html',
  styleUrls: ['./api-data.scss'],
})
export class ApiData implements OnInit, OnDestroy {
  posts: Post[] = [];
  loading = true;
  error = '';
  private sub = new Subscription();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // initial load: combine snapshot of created items + API list
    this.sub.add(
      this.api.getPosts().subscribe({
        next: (data) => {
          const created = this.api.getCreatedSnapshot();
          this.posts = [...created, ...data];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = 'Failed to load posts';
        },
      })
    );

    // while mounted, prepend any future created posts
    this.sub.add(
      this.api.created$.subscribe((createdList) => {
        const seen = new Set(createdList.map((p) => p.id));
        const remaining = this.posts.filter((p) => !seen.has(p.id));
        this.posts = [...createdList, ...remaining];
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
