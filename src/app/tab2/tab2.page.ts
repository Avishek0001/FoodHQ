import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Restaurant } from '../models/restaurant.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
@ViewChild('searchInput')
export class Tab2Page implements OnInit {
  restaurant:Restaurant[]=[];
  isLoading:boolean;
  searchItem:any;
  model:any={
    icon:"search-outline",
    title:"No restaurants Found"
  }
  Allrestaurants :Restaurant[]=[]

  constructor(private apiService:ApiService) {}
  ngOnInit(){
    this.Allrestaurants=this.apiService.allRestaurant
  }
  async onChange(event){
    this.searchItem = event.detail.value.toLowerCase();
    if(this.searchItem.length>0){
      this.isLoading=true;
      setTimeout(async()=>{
      this.restaurant = await this.Allrestaurants.filter((item:any)=>{
        return item.shortname.toLowerCase().includes(this.searchItem)
      })
      this.isLoading=false;
    },1000)
    }

    console.log(this.restaurant);
    
    
  }

}
