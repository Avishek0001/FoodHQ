import { Component, OnInit } from '@angular/core';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { GlobalService } from '../services/global/global.service';
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  profile:any
  profileSub:Subscription


  constructor(private globalService:GlobalService,private profileService:ProfileService,private apiService:ApiService) { }

  ngOnInit() {
    this.profile = this.apiService.getProfile()
    console.log(this.profile);
    
  }

  async editProfile(){
    
    console.log(this.profile);
    
    const options = {
      component:EditProfileComponent,
      componentProps:{
        profile:this.profile
      },
      cssClass:'custom-modal',
      swipeToClose:true
    }

    const modal = await this.globalService.createModal(options)

  }

}
