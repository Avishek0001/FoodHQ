import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { ApiService } from '../services/api/api.service';
import { Restaurant } from '../models/restaurant.model';
import { AddressService } from '../services/address/address.service';
import { Subscription } from 'rxjs';
import { Address } from '../models/address.model';
import { GlobalService } from '../services/global/global.service';
import { LocationService } from '../services/location.service';
import { SearchLocationComponent } from '../components/search-location/search-location.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  swiperModule = [IonicSlides];
  banners:any[]=[]
  restaurants:Restaurant[] = []
  isLoading:boolean = false;
  location = {} as Address;
  addressSub:Subscription
  constructor(private apiService:ApiService,private locationService:LocationService,private router:Router,private globalService:GlobalService,private addressService:AddressService) {}



  ngOnInit(): void {

    this.addressSub = this.addressService.addressChange.subscribe(address => {
      console.log('address', address);
      if(address && address?.lat) {
        this.location = address;
        this.nearbyApiCall(address.lat, address.lng);
        // this.nearbyApiCall();
      } 
      // else {
      //   if(address && (!this.location || !this.location?.lat)) {
      //     this.searchLocation('home', 'home-modal');
      //   }
      // }
    }, e => {
      console.log(e);
      this.isLoading = false;
      this.globalService.errorToast();
    });
    // this.isLoading = true;
    this.getBanners();
    if(!this.location?.lat) {
      this.getNearbyRestaurants();
    }   
  


    this.isLoading=true;
    setTimeout(()=>{
     this.restaurants=this.apiService.restaurants
      this.isLoading=false
    }
    ,900)
  }

  getBanners() {
    this.banners = this.apiService.banners;
  }

  nearbyApiCall(lat,lng) {
    console.log(this.location);
    this.isLoading = false;
    this.restaurants = this.apiService.restaurants;
  }


  async getNearbyRestaurants() {
    try {
      const position = await this.locationService.getCurrentLocation();
      const { latitude, longitude } = position.coords;
      await this.getData(latitude, longitude)
      console.log('restaurants: ', this.restaurants);
      this.isLoading = false;
    } catch(e) {
      console.log(e);
      this.isLoading = false;
      this.searchLocation('home','home-modal');
    }
  }


  async getData(lat,lng) {
    try {
      this.restaurants = []; 
      await this.nearbyApiCall(lat, lng);
    } catch(e) {
      console.log(e);
      this.globalService.errorToast();
    }
  }

  async searchLocation(prop, className?) {
    try {
      const options = {
        component: SearchLocationComponent,
        cssClass: className ? className : '',
        backdropDismiss: prop == 'select-place' ? true : false,
        componentProps: {
          from: prop
        }
      };
      const modal = await this.globalService.createModal(options);
      if(modal) {
        if(modal == 'add') {
          this.addAddress(this.location);
        } else if(modal == 'select') {
          this.searchLocation('select-place');
        } else {
          this.location = modal;
          await this.getData(this.location.lat, this.location.lng);
        }
      }
    } catch(e) {
      console.log(e);
    }
  }

  addAddress(val?) {
    // let navData: NavigationExtras;
    // if(val) {
    //   val.from = 'home';      
    // } else {
    //   val = {
    //     from: 'home'
    //   };
    // }
    // navData = {
    //   queryParams: {
    //     data: JSON.stringify(val)
    //   }
    // }
    this.router.navigate(['/', 'tabs', 'address', 'edit-address']);
  }
  
}
