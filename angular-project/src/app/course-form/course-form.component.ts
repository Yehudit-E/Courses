import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/Course';
import { MatButtonModule } from '@angular/material/button'; // עבור כפתורים
import { MatFormFieldModule } from '@angular/material/form-field'; // עבור שדות טופס
import { MatInputModule } from '@angular/material/input'; // עבור שדות קלט
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {
  @Input() course: Course={id:0,title:'',description:'',teacherId:0};
  @Output() courseUpdated = new EventEmitter<any>();

  courseForm: FormGroup;
  courseToEmit: Course={id:0,title:'',description:'',teacherId:0};

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.course) {
      this.courseForm.patchValue(this.course); // מעדכן את השדות עם הנתונים שהתקבלו
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.courseToEmit = {
        id:this.course.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        teacherId: this.course.teacherId
      }
      this.courseUpdated.emit(this.courseToEmit); 
    }
  }
  cancelClick(){
    this.courseUpdated.emit(null);
  }
}
