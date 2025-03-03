import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../models/User';
import { EnrollService } from '../enroll/enroll.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/users'
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(new User(0, '', '', '', ''));

  constructor(private http: HttpClient,private enrollService: EnrollService) {}

saveUser(id: number) {
    this.http.get<User>(`${this.baseUrl}/${id}`).subscribe(
      data => {  
      this.user.next(data as User)
      this.enrollService.getCourseByStudent(id);
    },
    error=>{
      alert("failed")
    }
    );
  }

  getUserFromToken() {
    
    const token = sessionStorage.getItem('authToken')
    if (token)
      try {
        const decodedToken: any = jwtDecode(token)
        this.saveUser(decodedToken.userId)
      }
      catch (error) {
        console.error('error with token', error)
        alert("failed")
      }
  }

  ngOnInit() {
    this.getUserFromToken()
  }
}