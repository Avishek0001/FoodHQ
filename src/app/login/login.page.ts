import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  constructor(private globalService:GlobalService,private builder:FormBuilder,private router:Router) {
    this.loginForm = this.builder.group({
      phone:this.builder.control('',[Validators.required,Validators.pattern('^[0-9]{10}$'),Validators.minLength(10),Validators.maxLength(10)])
    })
   }

  ngOnInit() {
  }

  login(){
    console.log("button clicked");
    
  }
  register(){
    this.router.navigate(['/register']);
  }

}
