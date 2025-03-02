import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './component/header/header.component';
import { UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.getUserFromToken();
  }
}
