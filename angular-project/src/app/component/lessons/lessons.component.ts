import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/Lesson';
import { LessonsService } from '../../service/lessons/lessons.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
import { TooltipDirective } from '../../directive/tooltip.directive';
@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [TooltipDirective,LessonFormComponent,MatIconModule,MatButtonModule,MatCardModule,AsyncPipe],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {

  public lessons$: Observable<Lesson[]> = this.lessonsService.lessons;
  constructor(private lessonsService: LessonsService, private activatedRoute: ActivatedRoute) { }
  courseId: number = 0;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') ? Number(params.get('id')) : 0;
      this.lessonsService.getLessons(this.courseId);
    });
    console.log(this.courseId);
    
  }
  flagEdit: boolean = false;
  flagAdd: boolean = false;
  emptyLesson: Lesson = { id: 0, title: '', content: '', courseId:this.courseId };
  lessonToEditOrAdd: Lesson = { id: 0, title: '', content: '', courseId: this.courseId };
  
  editLessonClick(lesson: Lesson) {
    this.flagEdit = true;
    this.lessonToEditOrAdd = lesson;
  }
  deleteLessonClick(lessonId: number) {
    this.lessonsService.deleteLesson(this.courseId, lessonId);
  }
  updateLesson(updatedLesson: any) {
    if (updatedLesson != null) {
      this.lessonsService.editLesson(updatedLesson);
    }
    this.flagEdit = false;
  }

  addLessonClick() {
    console.log(this.courseId);  
    this.flagAdd = true;
    console.log(this.emptyLesson);
    this.lessonToEditOrAdd ={...this.emptyLesson, courseId: this.courseId};
  }
  addLesson(newLesson: any) {
    if (newLesson != null) {
      this.lessonsService.addLesson(newLesson);
    }
    this.flagAdd = false;
  }
}
