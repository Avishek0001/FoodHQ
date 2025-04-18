import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from 'src/app/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _address = new BehaviorSubject<Address[]>([])
  private _addressChange = new BehaviorSubject<Address>(null)

  get address(){
    return this._address.asObservable();
  }
  get addressChange(){
    return this._addressChange.asObservable();
  }

  constructor(private apiService:ApiService) { }

  getAddress(limit?) {
    try {
      //user id
      let allAddress: Address[] = this.apiService.address;
      console.log(allAddress);
      if(limit) {
        let address: Address[] = [];
        let length = limit;
        if(allAddress.length < limit) length = allAddress.length;
        for(let i = 0; i < length; i++) {
          address.push(allAddress[i]);
        }
        allAddress = address;
      }
      this._address.next(allAddress);
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  addAddress(param) {
    param.id = 'address1';
    param.user_id = 'user1';
    const currentAddresses = this._address.value;
    const data = new Address(
      param.id,
      param.user_id,
      param.address,
      param.landmark,
      param.lat,
      param.lng,
      param.street,
      param.title,
      param.house,
    );
    currentAddresses.push(data);
    this._address.next(currentAddresses);
    this._addressChange.next(param);
  }

  async updateAddress(id,address){
    address.id = id
    const currentAddresses = this._address.value
    const index = currentAddresses.findIndex(x=>x.id == id);
    currentAddresses[index] = address;
    this._address.next(currentAddresses)


  }
  deleteAddress(param){
    // param.delete = true;
    let currentAddresses = this._address.value;
    console.log(param.id);
    console.log(currentAddresses );
    
    currentAddresses =  currentAddresses.filter(x=>x.id !== param.id) 
    console.log(currentAddresses );
    this._address.next(currentAddresses)
  }

  changeAddress(address) {
    this._addressChange.next(address);
  }


}
