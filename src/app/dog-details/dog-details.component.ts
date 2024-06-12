import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent {
  @Input() dog: any;
  @Output() favorite = new EventEmitter<void>();

  addToFavorites() {
    this.favorite.emit();
  }
}
