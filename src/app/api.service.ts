import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://frontend-take-home-service.fetch.com';

  constructor(private http: HttpClient,private router: Router) {}

  login(name: string, email: string): Observable<object> {
    return this.http.post(`${this.baseUrl}/auth/login`, { name, email }, { withCredentials: true }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error occurred
          console.error('An error occurred:', error.error.message);
        } else {
          // Backend returned an unsuccessful response code
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
  logout(): Observable<object> {
    this.router.navigate(['/login'])
    return this.http.post(`${this.baseUrl}/auth/logout`, {withCredentials: true});
  }

  getBreeds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/dogs/breeds`, { withCredentials: true });
  }

  searchDogs(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dogs/search`, { params, withCredentials: true });
  }
  

  getDogsByIds(ids: string[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/dogs`, ids, { withCredentials: true });
  }

  getMatch(ids: string[]): Observable<{ match: string }> {
    return this.http.post<{ match: string }>(`${this.baseUrl}/dogs/match`, ids, { withCredentials: true });
  }
}
