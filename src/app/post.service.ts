import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface IPost {
  id?: number;
  userId?: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  // JSONPlaceholder for testing; swap to your Next.js base URL later:
  // private baseUrl = 'http://localhost:3000/api';
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private url = `${this.baseUrl}/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    // remove ?_limit=10 if using your own API
    return this.http
      .get<IPost[]>(`${this.url}?_limit=10`)
      .pipe(catchError(this.handleError));
  }

  addPost(post: IPost): Observable<IPost> {
    return this.http
      .post<IPost>(this.url, post)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const msg =
      error.error?.message ??
      (typeof error.error === 'string' ? error.error : null) ??
      error.message ??
      'Server error';
    return throwError(() => new Error(msg));
  }
}
