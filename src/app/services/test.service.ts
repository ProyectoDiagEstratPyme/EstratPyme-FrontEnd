import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private baseUrl='http://localhost:3000/tests';

  constructor(private http: HttpClient){}

  registerTest(testDetails:any){
    return this.http.get<any[]>(`${this.baseUrl}?id=${testDetails.id_empresa}`).pipe(
      switchMap((existingTests) => {
        if (existingTests.length > 0) {
          // Si el test con el ID ya existe, se hace PUT para sobrescribirlo
          return this.http.put(`${this.baseUrl}/${testDetails.id_empresa}`, testDetails);
        } else {
          // Si el test no existe, se hace post para crear un onuevo
          return this.http.post(this.baseUrl, testDetails);
        }
      })
    );
  }

  updateisTestDone(user:any){
    const url = `http://localhost:3000/usuarios/${user.id}`;

    return this.http.patch(url, { isTestDone: true });

  }

}
