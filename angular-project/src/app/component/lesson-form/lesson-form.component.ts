// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-lesson-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './lesson-form.component.html',
//   styleUrl: './lesson-form.component.css'
// })
// export class LessonFormComponent {

// }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/Course';
import { MatButtonModule } from '@angular/material/button'; // עבור כפתורים
import { MatFormFieldModule } from '@angular/material/form-field'; // עבור שדות טופס
import { MatInputModule } from '@angular/material/input'; // עבור שדות קלט
import { ReactiveFormsModule } from '@angular/forms';
import { Lesson } from '../../models/Lesson';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {
  @Input() lesson: Lesson={id:0,title:'',content:'',courseId:0};
  @Output() lessonUpdated = new EventEmitter<any>();

  lessonForm: FormGroup;
  lessonToEmit: Lesson={id:0,title:'',content:'',courseId:0};

  constructor(private fb: FormBuilder) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.lesson) {
      this.lessonForm.patchValue(this.lesson); // מעדכן את השדות עם הנתונים שהתקבלו
    }
    console.log(this.lesson);
    
  }

  onSubmit() {
    if (this.lessonForm.valid) {
      this.lessonToEmit = {
        id:this.lesson.id,
        title: this.lessonForm.value.title,
        content: this.lessonForm.value.content,
        courseId: this.lesson.courseId
      }
      this.lessonUpdated.emit(this.lessonToEmit); 
    }
  }
  cancelClick(){
    this.lessonUpdated.emit(null);
  }
}

