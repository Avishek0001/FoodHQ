import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global/global.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
registerForm:FormGroup;
 constructor(private globalService:GlobalService,private router:Router,private builder:FormBuilder,private route:Router, private authService:AuthService) {
     this.registerForm = this.builder.group({
       username:this.builder.control('',[Validators.required]),
       phone:this.builder.control('',[Validators.required,Validators.pattern('^[0-9]{10}$'),Validators.minLength(10),Validators.maxLength(10)]),
       email:this.builder.control(''),
       password:this.builder.control('',[Validators.required])
     })
    }

  ngOnInit() {

  }

  login(){
    this.route.navigate(['/login']);
  }

  register():void{
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value.username,this.registerForm.value.phone,this.registerForm.value.email,this.registerForm.value.password).then((res:any)=>{
        if(res.success === true){
          this.globalService.successToast("Registration Successfull")
          this.navigate()
        }else{
          this.globalService.errorToast("Registration Failed")
        }
      })
    }else{
      this.globalService.showAlert("Please enter valid details")
    }
  }

    
  navigate(){
    this.router.navigate(['/tabs']);

  }

}
