import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  name: string = '';
  email: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login(this.name, this.email).subscribe(
      () => {
        console.log("hello login")
        this.router.navigate(['/search']);
      },
      (error) => {
        this.router.navigate(['/search']); // backend api is having issue so i am trying to ignore the error as satus code is receieved as 200 and navigating the page
        console.error('Error occurred during login:', error);
        // Handle error here, such as displaying a message to the user
      }
    );
  }
  logout() {
    this.apiService.logout().subscribe(response=>{
      this.router.navigate(['/login'])
    })
  }
}
