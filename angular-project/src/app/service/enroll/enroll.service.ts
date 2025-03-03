import { Injectable } from '@angular/core';
import { Course } from '../../models/Course';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {
  
constructor(private http: HttpClient) { }
  
private baseUrl = 'http://localhost:3000/api/courses/';
public coursesToStudent: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

getCourseByStudent(id:Number){
  this.http.get<Course[]>(this.baseUrl+"student/"+id).subscribe(
    data=>{  
      this.coursesToStudent.next(data)
    },
    error=>{
      alert("failed")
    }
  );
}
  addRoll(courseId: Number,id:Number){
    this.http.post<any>(this.baseUrl+courseId+"/enroll",{userId:id}).subscribe(
      data=>{
        this.getCourseByStudent(id);
        alert("You add to the course")

      },
      error=>{
        alert("failed")
      }
    )
  }
  deleteRoll(courseId: Number,id:Number){
    this.http.delete<any>(this.baseUrl+courseId+"/unenroll",{body:{userId:id}}).subscribe(
      data=>{
        this.getCourseByStudent(id);
        alert("You get outside to the course")
      },
      error=>{
        alert("failed")
      }
    )
  }
}
