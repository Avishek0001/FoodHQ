import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent  implements OnInit {

  profileForm:FormGroup
  @Input() profile:any
  isSubmitted = false;

  constructor(private fb:FormBuilder,private profileService:ProfileService,private globalService:GlobalService) { }

  ngOnInit() {
  this.profileForm = this.fb.group({
    phone: [this.profile.phone || '', [Validators.required]],
    email: [this.profile.email || '', [Validators.required, Validators.email]]
  });
}

async onSubmit() {
  try{

    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      
    }
    this.isSubmitted = true;
    await this.profileService.updateProfile(this.profile,this.profileForm.value)
    this.globalService.modalDismiss();
    this.isSubmitted = true;
  }catch(err){
    console.log(err);
    
  }
}

}
