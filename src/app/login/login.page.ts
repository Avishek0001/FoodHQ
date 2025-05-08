import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../services/global/global.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  constructor(private globalService:GlobalService,private authService:AuthService,private builder:FormBuilder,private router:Router) {
    this.loginForm = this.builder.group({
      phone:this.builder.control('',[Validators.required,Validators.pattern('^[0-9]{10}$'),Validators.minLength(10),Validators.maxLength(10)]),
      password:this.builder.control('',Validators.required)
    })
   }

  ngOnInit() {
    this.isLoggedIn()
  }

  async isLoggedIn(){
    const val = await this.authService.getId()
    console.log(val);

    if(val){
      this.navigate()
    }
    
  }

  // login(): void {
  //   if(this.loginForm.valid){
  //     console.log(this.loginForm.value);
  //     this.authService.login(this.loginForm.value.phone,this.loginForm.value.password).subscribe((res:any)=>{
  //       if(res.status==200){
  //         this.globalService.successToast("Login Successfull")
  //         this.navigate()
  //       }else{
  //         this.globalService.errorToast("Login Failed")
  //       }
  //     })
  //   }else{
  //     this.globalService.showAlert("Please enter valid details")
  //   }
  // }


  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
  
      this.authService.login(this.loginForm.value.phone, this.loginForm.value.password) 
        .then((res: any) => {
          console.log(res);
          
          if (res.success === true) {
            this.globalService.successToast("Login Successful");
            console.log(res);
            this.navigate();
          } else {
            this.globalService.errorToast("Login Failed");
          }
        })
        .catch((error) => {
          console.error(error);
          this.globalService.errorToast("Something went wrong");
        });
    } else {
      this.globalService.showAlert("Please enter valid details");
    }
  }
  
  navigate(){
    this.router.navigate(['/tabs']);

  }

  register(){
    this.router.navigate(['/register']);
  }

}
