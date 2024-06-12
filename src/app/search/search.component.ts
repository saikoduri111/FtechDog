import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  breeds: string[] = [];
  selectedBreed: string = '';
  sortOrder: string = 'asc';
  dogs: any[] = [];
  favorites: string[] = [];
  error: string = '';
  perPageOptions: number[] = [3, 10]; // Options for results per page
  perPage: number = 3; // Default per page
  currentPage: number = 1;

  constructor(private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    this.apiService.getBreeds().subscribe(breeds => {
      this.breeds = breeds;
      this.search();
    });
  }

  search(): void {
    const params: any = {
      sort: `breed:${this.sortOrder}`,
      breeds: this.selectedBreed ? [this.selectedBreed] : [],
      from: (this.currentPage - 1) * this.perPage, // Calculate from based on currentPage and perPage
      size: this.perPage // Set the size parameter
    };

    this.apiService.searchDogs(params).subscribe(response => {
      const dogIds = response.resultIds;
      this.dogs = [];
      this.apiService.getDogsByIds(dogIds).subscribe(dogs => {
        this.dogs = dogs;
      });
    });
  }

  toggleFavorite(dogId: string): void {
    const index = this.favorites.indexOf(dogId);
    if (index === -1) {
      this.favorites.push(dogId);
    } else {
      this.favorites.splice(index, 1);
    }
  }

  generateMatch(): void {
    if (this.favorites.length === 0) {
      this.error = 'Please add favorites to find a match.';
    } else {
      this.error = '';
      this.apiService.getMatch(this.favorites).subscribe(response => {
        alert(`Your match is dog with ID: ${response.match}`);
      });
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.search();
  }

  prevPage(): void {
    this.currentPage--;
    this.search();
  }
    logout() {
      this.apiService.logout().subscribe(response=>{
        this.router.navigate(['/login'])
      })
    }
  }
