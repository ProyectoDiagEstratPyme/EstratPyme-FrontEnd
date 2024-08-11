import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor() { }

  login(user:User):void{
    this.currentUserSubject.next(user)
  }

  logout():void{
    this.currentUserSubject.next(null)
  }

}
