import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { catchError, map, Observable, of } from 'rxjs';
import { Admin } from '../models/admin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://estramipyme-api.vercel.app/usuarios';
  private baseUrlAdmin= "https://estramipyme-api.vercel.app/admins"

  isLoggedIn:boolean=false;

  constructor(private http: HttpClient) { }

  registerUser(userDetails: any) {
    return this.http.post(this.baseUrl, userDetails)
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`).pipe(
      map(usuarios => {
        if (usuarios.length > 0) {
          const user = usuarios[0];
          // Compara la contraseña ingresada con la almacenada en la base de datos
          if (password === user.password) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }

  loginAdmin(email:string,password:string): Observable<User|null>{
    return this.http.get<Admin[]>(`${this.baseUrlAdmin}?email=${email}`).pipe(
      map(admins => {
        if (admins.length > 0){
          const admin = admins[0];

          if(password===admin.password){
            return admin;
          }else{
            return null;
          }
        }else{
          return null;
        }
      }),
      catchError(()=> of(null))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getLogin(){
    return this.isLoggedIn
  }
}

