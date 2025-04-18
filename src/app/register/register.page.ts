import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
loginForm:FormGroup;
  constructor(private route:Router) { }

  ngOnInit() {
  }

  login(){
    this.route.navigate(['/login']);
  }

  register(){
    console.log("button clicked");
  }

}
