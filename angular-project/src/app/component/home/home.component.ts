import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){

  }
  courses = [
    { title: 'Introduction to AI', description: 'Learn the basics of Artificial Intelligence.' },
    { title: 'Web Development', description: 'Master HTML, CSS, and JavaScript.' },
    { title: 'Data Science', description: 'Explore data analysis and machine learning.' }
  ];

  CouresesClick(){
    this.router.navigate(['/courses']);
  }

}
