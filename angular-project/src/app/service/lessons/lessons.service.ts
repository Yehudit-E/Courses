import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../../models/Lesson';

@Injectable({
  providedIn: 'root'
})

export class LessonsService {
  private baseUrl = 'http://localhost:3000/api/courses';
  public lessons: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);

  constructor(private http: HttpClient) { }

  getLessons(courseId: number) {
    this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`).subscribe(data => {
      this.lessons.next(data);
    })
  }

  addLesson(lesson: Lesson) {
    this.http.post<any>(`${this.baseUrl}/${lesson.courseId}/lessons`, lesson).subscribe(data => {
      this.getLessons(lesson.courseId);
    })
  }

  editLesson(lesson: Lesson) {
    this.http.put<any>(`${this.baseUrl}/${lesson.courseId}/lessons/${lesson.id}`, lesson).subscribe(data => {
      this.getLessons(lesson.courseId);
    });
  }

  deleteLesson(courseId: number, lessonId: number) {
    this.http.delete<any>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`).subscribe(data => {
      this.getLessons(courseId);
    });
  }
}