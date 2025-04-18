import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { OrderService } from '../services/order/order.service';
import { CartService } from '../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { GlobalService } from '../services/global/global.service';
import { Cart } from '../models/cart.model';
import { Address } from '../models/address.model';
import { AddressService } from '../services/address/address.service';
import { SearchLocationComponent } from '../components/search-location/search-location.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

@ViewChild(IonContent, {static:false}) content: IonContent

urlCheck:any
url:any 
model:any={} as Cart
deliveryCharge = 20;
instruction:any
location:any={} as Address
cartSub:Subscription
addressSub:Subscription
  constructor(private router:Router, private orderService:OrderService,private cartService:CartService,private global:GlobalService,private addressService:AddressService) {}

  ngOnInit(): void {
    this.checkUrl() 
    this.getCartData()
    this.addressSub = this.addressService.addressChange.subscribe(d=>{ this.location=d })
    this.cartSub = this.cartService.cart.subscribe(d=>{
      this.model = d;
      if(!this.model){
        this.location={} as Address
      }
      console.log('cart page model: ', this.model);
    })

    this.getCartData();
  }

  getBackUrl(){
    return this.url.join('/')
  }

  getCart(){
    return Preferences.get({key:'cart'})
  }

  async getCartData(){
    await this.cartService.getCartData()
  }
  
  getPreviousUrl() {
    return this.url.join('/');
  }

 
 

  quantityPlus(index){
   this.cartService.quantityPlus(index)
  }
  

  quantityMinus(index){
    this.cartService.quantityMinus(index)

  }
  

  addAddress(){
    let url:any
    if(this.urlCheck == 'tabs'){
      url = ['/','tabs','address','edit-address']
      
    }else{
    url = [this.router.url,'address','edit-address']

  }
  this.router.navigate(url)
}

async changeAddress() {
  try {
    const options = {
      component: SearchLocationComponent,
      swipeToClose: true,
      cssClass: 'custom-modal',
      componentProps: {
        from: 'cart'
      }
    };
    const address = await this.global.createModal(options);
    if(address) {
      if(address == 'add') this.addAddress();
      await this.addressService.changeAddress(address);
    }
  } catch(e) {
    console.log(e);
  }
}


  viewDetail(){
    this.content.scrollToBottom(500);
  }



  async makePayment(){
    try{
      const data = {
        restaurant_id:this.model.restaurant.uid,
        restaurant:this.model.restaurant,
        instruction:this.instruction?this.instruction:'',
        // order:JSON.stringify(this.model.items),
        order:this.model.items,
        time:moment().format('lll'),
        address:this.location,
        total:this.model.totalPrice,
        grandTotal: this.model.grandTotal,
        deliveryCharge:this.deliveryCharge,
        status:'Created',
        paid: 'COD'
      }
      this.router.navigate(['/','tabs','account'])
      console.log('cart-order',data);
      await this.orderService.placeOrder(data)
      await this.cartService.clearCart();
      this.model={} as Cart
      this.global.successToast('Your Order is Placed Successfully');

      

    }catch(err){
console.log(err);

    }
  }


  checkUrl(){
    let url:any = this.router.url.split('/');
    console.log('url',url);
    const extractUrl = url.splice(url.length-2,2)
    // console.log(extractUrl);
    
    this.urlCheck = extractUrl[0]
    console.log(this.urlCheck);
    url.push(this.urlCheck)
    this.url = url
    console.log('url-previous',this.url);
    
  }
  // ionViewWillLeave(){
  //   console.log('ionViewWillLeave entered Successfully');
    
  //   if(this.model?.items && this.model?.items.length > 0){
  //     this.cartService.saveCart();
  //   }
  // }

  // ngOnDestroy(){console.log('Destroy CartPage');
  //   if(this.addressSub) this.addressSub.unsubscribe()
  //     if(this.cartSub) this.cartSub.unsubscribe()
  // }
}
