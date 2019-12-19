import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bug } from './bug';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BugService {

  // Base url
  baseurl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
      'Access-Control-Allow-Methods': '*'
    })
  }

  // POST
  CreateBug(data): Observable<Bug> {
  console.log(data);
    return this.http.post<Bug>(this.baseurl + '/api/PR_CLIENTE/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }  

  // GET
  GetIssue(id): Observable<Bug> {
    return this.http.get<Bug>(this.baseurl + '/api/PR_CLIENTE/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetIssues(): Observable<Bug> {

    return this.http.get<Bug>(this.baseurl + '/api/PR_CLIENTE/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )

  }

  // PUT
  UpdateBug(id, data): Observable<Bug> {
    return this.http.put<Bug>(this.baseurl + '/api/PR_CLIENTE/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // DELETE
  DeleteBug(id){
    return this.http.delete<Bug>(this.baseurl + '/api/PR_CLIENTE/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}