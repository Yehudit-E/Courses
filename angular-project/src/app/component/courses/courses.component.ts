import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../service/courses/courses.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Course } from '../../models/Course';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ActivatedRoute } from '@angular/router';
import{Router}from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { User } from '../../models/User';
import { TooltipDirective } from '../../directive/tooltip.directive';
import { EnrollService } from '../../service/enroll/enroll.service';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [TooltipDirective,AsyncPipe,MatIconModule,MatButtonModule,MatCardModule,CourseFormComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent implements OnInit {
  public courses$:Observable<Course[]> = this.coursesService.courses;  

  constructor(private coursesService: CoursesService,private route: ActivatedRoute,private router:Router,private userService:UserService,private enrollService: EnrollService) { }
  auth$ = this.userService.user;
  courseStudent$=this.enrollService.coursesToStudent;
  ngOnInit(): void {
    this.coursesService.getCourses();  
  }
  flagEdit:boolean = false;
  courseToEditOrAdd:Course = {id:0,title:'',description:'',teacherId:0};
  editCourseClick(course:Course){
    this.flagEdit = true;
    this.courseToEditOrAdd = course;
  }
  deleteCourseClick(courseId:number){
    this.coursesService.deleteCourse(courseId);
  }
  viewLessonsClick(courseId:number){
    this.route.url.subscribe(urlSegments => {
      const currentUrl = this.router.url; 
      const newUrl = `${currentUrl}/${courseId}`; 
      this.router.navigateByUrl(newUrl); 
    });
  }

updateCourse(updatedCourse: any) {
  if(updatedCourse !=null){
    this.coursesService.editCourse(updatedCourse.id, updatedCourse);
  }
  this.flagEdit = false;
}
flagAdd:boolean = false;
emptyCourse:Course = {id:0,title:'',description:'',teacherId:0};
addCourseClick(){
  this.flagAdd = true;
  this.courseToEditOrAdd = this.emptyCourse;
}
 addCourse(newCourse: any) {
  if(newCourse !=null){
    newCourse.teacherId = this.userService.user.getValue().id;
    this.coursesService.addCourse(newCourse);
  }
  this.flagAdd = false;
  console.log(newCourse);
  
}
courseExist(id:Number){
  return this.courseStudent$.value.some(c => c.id === id)
 }
 login(id: Number){
  console.log(this.courseStudent$.value)
   this.enrollService.addRoll(id,this.userService.user.value.id);
}

logout(id: Number){
  this.enrollService.deleteRoll(id,this.userService.user.value.id);
}
}
