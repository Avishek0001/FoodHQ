import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SearchLocationComponent } from 'src/app/components/search-location/search-location.component';
import { AddressService } from 'src/app/services/address/address.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {

  form:FormGroup
  location_name:string="Location Loading..."
  isSubmitted = false
  location:any = {}
  isLocation:boolean
  center:any
  update:boolean
  id:any
  from:string
 

  constructor(private formBuiilder: FormBuilder,private addressService:AddressService, private navCtrl: NavController,
    private globalService:GlobalService,private route:Router,private route1:ActivatedRoute,private maps:GoogleMapsService) {
    this.form = formBuiilder.group({
      title:['',Validators.required],
      house:['',Validators.required],
      landmark:['',Validators.required]
    })
  }
  
  ngOnInit() {
  
    this.location.title = 'Location....'
    this.checkForUpdate();
    
  }

  async searchLocation(){
    try{
      const options={
        component: SearchLocationComponent,
        cssClass:'address-modal',
        swipeToClose:true,
      };

      const location = await this.globalService.createModal(options);
      console.log('location',location);

      if(location) {
        this.location = location;
        const loc = {
          lat: location.lat,
          lng: location.lng
        };
        
        this.update = true;
        this.maps.changeMarkerInMap(loc);
      }
      
    }catch(err){
      console.log(err);
      
    }
  }


  checkForUpdate() {
    this.location.location_name = 'Locating...';
    this.isLocation = false;
    this.route1.queryParams.subscribe(async(data) => {
      console.log('data 1', data);
      
      if(data['data']) {
        const address = JSON.parse(data['data']);
        console.log('data: ', address);
        this.center = {
          lat: address.lat,
          lng: address.lng
        };
        this.update = true;
        this.location.lat = this.center.lat;
        this.location.lng = this.center.lng;
        this.location.address = address.address;
        this.location.title = address.title;
        if(address?.from){

          this.id = address.id
        }
        this.form.patchValue({
          title: address.title,
          house: address.house,
          landmark: address.landmark
      });
        // this.id = address.id;
        setTimeout(async() => {
      
          // Synchronize form values with this.location
          this.location.title = this.form.value.title;
          this.location.house = this.form.value.house;
          this.location.landmark = this.form.value.landmark;

          this.toggleFetched();
         
      }, 2000);
  } else {
      this.update = false;
      // Reset form or handle as per requirement
      this.form.reset();
  }
    });
    

  }

  toggleFetched(){
    this.isLocation = !this.isLocation
  }
 
  

fetchLocation(event){
  this.location = event
  this.toggleFetched()

}

  toggleSubmit(){
    this.isSubmitted = !this.isSubmitted
  }

  async onSubmit(){
    try{

      this.toggleSubmit()
      console.log(this.form);    
      if(!this.form.valid ||!this.isLocation){
        this.toggleSubmit();
        return;
      }
      let data: any = {
      title:this.form.value.title,
      landmark:this.form.value.landmark,
      house:this.form.value.house,
      address:this.location.address,
      lat:this.location.lat,
      lng:this.location.lng
    }
    if(!this.id){

      await this.addressService.addAddress(data);
    } else{

      await this.addressService.updateAddress(this.id, data);
    }
    console.log('data', data);
    this.navCtrl.back();
    this.toggleSubmit();
  }catch(err){
    console.log(err);
    this.globalService.errorToast()
    
  }
    
  }


}
