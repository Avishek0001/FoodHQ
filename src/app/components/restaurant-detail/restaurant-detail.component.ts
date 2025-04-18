import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent  implements OnInit {

  @Input() data:any;
  constructor() { }

  ngOnInit() {}

  getCuisine(item:any){
    return item.join(', ')
  }

}
