import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address/address.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss'],
})
export class SearchLocationComponent  implements OnInit {

  query: string;
  places:any[]=[]
  placeSub:Subscription;
  savedPlaces:Address[]=[]
  @Input() from
  addressSub:Subscription

  constructor(private globalService:GlobalService,private addressService:AddressService,private maps: GoogleMapsService,private locationService:LocationService) { }

  ngOnInit() {
    this.placeSub = this.maps.places.subscribe(d=>{
      this.places = d
      console.log('places searched', this.places);
      
    })

    if(this.from){
      this.getSavedPlaces()
    }
  }

  async getSavedPlaces(){
    this.addressSub = this.addressService.address.subscribe(d =>{
      this.savedPlaces = d
    })
    if(this.from == 'home') await this.addressService.getAddress(2);
    else await this.addressService.getAddress();
    this.globalService.hideLoader();
  }

  
  async onSearchChange(event) {
    console.log(event);
  
    this.query = event.detail.value;
    if(this.query.length > 0) await this.maps.getPlaces(this.query);
  }

  dismiss(val?){
    this.globalService.modalDismiss(val)
  }


  async choosePlace(place) {
    this.globalService.showLoader();
    console.log(place);
    if(this.from) {
      const savedPlace = await this.savedPlaces.find(x => x.lat == place.lat && x.lng == place.lng);
      if(savedPlace?.lat) place = savedPlace;
    }
    this.globalService.hideLoader();
    this.dismiss(place);
  }


  selectSavedPlace(place){
    this.dismiss(place)
  }


  async getCurrentPosition() {
    try {
      this.globalService.showLoader();
      const position = await this.locationService.getCurrentLocation();
      console.log("Position Current", position);
      
      const {latitude, longitude} = position.coords;
      const result = await this.maps.getAddress(latitude, longitude);
      console.log(result);
      const place = {
        title: result.address_components[0].short_name,
        address: result.formatted_address,
        lat: latitude,
        lng: longitude
      };
      
      this.globalService.hideLoader();
      this.dismiss(place);
    } catch(e) {
      console.log(e);
      this.globalService.hideLoader();
      this.globalService.errorToast('Check whether GPS is enabled & the App has its permissions', 5000);
    }
  }

}
