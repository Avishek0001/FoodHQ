import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order/order.service';
import { CartService } from '../services/cart/cart.service';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profile:any
  orders:Order[]=[]
  orderSub:Subscription;
  profileSub:Subscription
  constructor(private apiService:ApiService,private profileService:ProfileService,private route:Router,private orderService:OrderService,private cartService:CartService) { }

  ngOnInit() {
    
    this.orderSub = this.orderService.orders.subscribe(d=>{
      if(d instanceof Array){
        this.orders = d;
      }
      console.log("All Orders",this.orders);
      
    })

    this.profileSub = this.profileService.profile.subscribe(d=>{
      this.profile = d
      
      console.log('Updated Profile',this.profile);
      
      this.apiService.setProfile(this.profile)
    })
    this.getData()
  }

  async getData(){
    setTimeout(async()=>{
      this.profile = {
        name:'Avishek Kundu',
        phone: '9088384498',
        email: 'avishekkundu@gmail.com'
      };
await this.orderService.getOrders()
      this.apiService.setProfile(this.profile)

    },1000)
  }

  logout(){
    
  }

  async reorder(order: Order) {
    console.log(order);
    let data = await this.cartService.getCart();
    console.log('data: ', data);
    if(data?.value) {
      this.cartService.alertClearCart(null, null, null, order);
    } else {
      this.cartService.orderToCart(order);
    }
  }

  editProfile(profile){
    console.log('Profile',profile);
    this.route.navigate(['/edit-profile'],{state:{profile}})
    
  }

  getHelp(order) {
    console.log(order);
  }

  ngOnDestroy(){
    if(this.orderSub) this.orderSub.unsubscribe(); 
  }

}
