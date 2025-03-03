import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { UserService } from '../user/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl ='http://localhost:3000/api/auth';
  constructor(private http: HttpClient,private userService: UserService){}

  register(user:User){
    this.http.post<any>(this.baseUrl+'/register',user).subscribe(
      data=>{
        console.log(data);
        this.login(user);
      },
      (error) =>{
        alert("failed")
      });
  }


  login(user:User){
    this.http.post<any>(this.baseUrl+'/login',user).subscribe(
      data=>
      { 
        if (data.token) {
          sessionStorage.setItem('authToken', data.token); 
        }
        this.userService.saveUser(data.userId);
        console.log(this.userService.user)
        },
      (error) => {
        alert("failed")
      }
    ); 
  }

}