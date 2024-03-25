import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Phrase } from './phrase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhrasesService {
  http: HttpClient = inject(HttpClient);

  phrase():Observable<Phrase>
  {
    return this.http.get<Phrase>('https://api.kanye.rest');
  }

  makeHeadRequest(): Observable<any> {
    return this.http.head('http://httpbin.org/headers', { observe: 'response' });
  }

  makePutRequest(data: any): Observable<any> {
    // Aquí utilizamos el endpoint '/posts/1' de JSONPlaceholder para realizar una solicitud PUT
    return this.http.put('https://jsonplaceholder.typicode.com/posts/2', data);
  }  
  
  makePostRequest(data: any): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', data);
  }  
}
