import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
    firstName: 'Rachid',
    lastName: 'MESKY',
    email: 'rachidmesky@gmail.com',
    drinkPreference: 'Coca',
    hobbies: [
      'Coding', 'Programming', 'Boxing', 'Playing'
    ]
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  constructor() { }
  addUser(user: User){
    this.users.push(user);
    this.emitUsers();
  }
}
