import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/usuarios';

  usuarios: User[]=[
    {
      email:'prueba@email.com',
      password:'1234'
    }
  ]

  constructor(private http: HttpClient) { }

  registerUser(userDetails: any) {
    return this.http.post(this.baseUrl, userDetails)
  }

  login(email:string, password:string): Observable<User|null>{
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`)
    .pipe(
      map( usuarios => usuarios.length > 0 ? usuarios[0]: null)
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}

