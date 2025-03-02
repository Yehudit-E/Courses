import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user/user.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,MatChipsModule, RouterOutlet,FormsModule, HttpClientModule, MatIconModule, MatToolbarModule, MatInputModule, MatSelectModule, MatButtonModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService: UserService) { }
  user$=this.userService.user;

getInitial(name: string): string {
  return name ? name.charAt(0).toUpperCase() : "?";
}
}
