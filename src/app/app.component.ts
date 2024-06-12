import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private apiService: ApiService, private router: Router) {}
  title = 'fetch-dog-app';
  logout() {
    this.apiService.logout().subscribe(response=>{
      this.router.navigate(['/login'])
    })
  }
}