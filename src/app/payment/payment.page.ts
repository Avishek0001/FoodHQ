import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private route:Router,private navCtrl: NavController,private cartService:CartService) { }

  ngOnInit() {
   
  }

  backToCart(){
    this.route.navigate(['/','tabs','tab3'])
  }
 

}
