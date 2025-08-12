import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Post {
  id?: number;
  title: string;
  body: string; // if your backend uses `content`, rename accordingly
  userId?: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  // Keep a running list of posts created during this session
  private created: Post[] = [];
  private createdSubject = new BehaviorSubject<Post[]>([]);
  created$ = this.createdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts?_limit=10`);
  }

  createPost(payload: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, payload).pipe(
      tap((post) => {
        this.created.unshift(post);
        this.createdSubject.next([...this.created]);
      })
    );
  }

  /** Allow pages that mount later to still get the already-created items */
  getCreatedSnapshot(): Post[] {
    return [...this.created];
  }
}
