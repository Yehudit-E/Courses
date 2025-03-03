import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../models/Course';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000/api/courses';
  public courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  constructor(private http: HttpClient,private userService: UserService) { }

  getCourses() {
    this.http.get<Course[]>(this.baseUrl).subscribe(data => {
      this.courses.next(data);
    })
  }

  addCourse(course: Course) {
    this.http.post<any>(this.baseUrl, course).subscribe(
    data => {
      this.getCourses();
    },
    error=>{
      alert("failed")
    })
  }

  editCourse(courseId: number, course: Course) {
    this.http.put<any>(`${this.baseUrl}/${courseId}`, course).subscribe(data => {
      this.getCourses();
    },
    error=>{
      alert("failed")
    });
  }

  deleteCourse(courseId: number) {
    this.http.delete<any>(`${this.baseUrl}/${courseId}`).subscribe(data => {
      this.getCourses();
    },
    error=>{
      alert("failed")
    });
  }
}