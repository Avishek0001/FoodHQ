import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '../services/global/global.service';
import { AddressService } from '../services/address/address.service';
import { Subscription } from 'rxjs';
import { Address } from '../models/address.model';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit,OnDestroy {
addresses:Address[]=[]
isLoading:boolean=false
addressSub:Subscription
model:any={
  title:"No Addresses Added Yet",
  icon:"location-outline"
}
  constructor(private globalService:GlobalService,private addressService:AddressService,private router:Router) { }

  ngOnInit() {
    this.addressSub = this.addressService.address.subscribe(d=>{
      
      this.addresses=d
      console.log("Address",this.addresses);

      // if(d instanceof Array){

      //   this.addresses=d
      // }else{
      //   if(d?.delete){
      //     this.addresses = this.addresses.filter(x=>x.id != d.id)
        // }else if(d?.update){
        //   const index = this.addresses.findIndex(x=> x.id == d.id)
        //   this.addresses[index] = d 
        // }else{
        //   this.addresses = this.addresses.concat(d);
        // }
      // }
    })
    this.getAddress()
  }


  ngOnDestroy(){
    if(this.addressSub) this.addressSub.unsubscribe()
  }

  async getAddress(){
    this.isLoading=true;
    setTimeout(async()=>{
      // this.addresses=this.addressService.getAddress();
      await this.addressService.getAddress()
      console.log(this.addresses);
      
      this.isLoading=false
      this.globalService.successToast('Addresses Retrieved Successfully')
      // this.globalService.errorToast()
      // this.globalService.showAlert('Address Received')
      // this.globalService.showLoader()
      // this.globalService.setLoader()
    },2000)
  }

  editAddress(address){
    console.log(address);
    const navData: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(address)
      }
    };
    this.router.navigate([this.router.url, 'edit-address'], navData);

  }

  deleteAddress(address){
    console.log('address:', address);
    this.globalService.showAlert(
      'Are you sure you want to delete this address?',
      'Confirm',
      [
        {
          text:'No',
          role:'cancel',
          handler:()=>{
            return
          }
        },{
          text:'Yes',
          handler:async ()=>{
            this.globalService.showLoader();
            await this.addressService.deleteAddress(address);
            this.globalService.hideLoader();
          }
          }
        ]
      )
      
    }
    
  }


