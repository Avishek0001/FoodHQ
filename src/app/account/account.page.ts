import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order/order.service';
import { CartService } from '../services/cart/cart.service';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

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
  constructor( private storageService:StorageService, private authService:AuthService,  private apiService:ApiService,private profileService:ProfileService,private route:Router,private orderService:OrderService,private cartService:CartService) { }

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
     
      this.storageService.getStorage('profile').then((result: any) => {
        if (result && result.value) {
          this.profile = JSON.parse(result.value); 
          console.log(this.profile); 
        } else {
          console.error('Invalid or null profile data'); 
        }
      }).catch((error) => {
        console.error('Error fetching profile:', error); 
      });

      
  await this.orderService.getOrders()
      this.apiService.setProfile(this.profile)

    },1000)
  }

  logout(){
    this.authService.logout().then(()=>{
      this.route.navigate(['/login']);
    }
    ).catch((err)=>{
      console.log(err);
    }
    )
    
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
