import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { CoursesComponent } from './component/courses/courses.component';
import { LessonsComponent } from './component/lessons/lessons.component';
import { entryAuthGuard } from './guard/entry-auth.guard';


export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'courses',component: CoursesComponent,canActivate:[entryAuthGuard]},
    {path: 'courses/:id',component: LessonsComponent},
];
