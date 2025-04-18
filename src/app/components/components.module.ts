import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { LoadingRestaurantComponent } from './loading-restaurant/loading-restaurant.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RestaurantComponent,LoadingRestaurantComponent,EmptyScreenComponent,SearchLocationComponent,EditProfileComponent],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RestaurantComponent,LoadingRestaurantComponent,EmptyScreenComponent,SearchLocationComponent,EditProfileComponent],
  // entryComponents:[
  //   SearchLocationComponent
  // ]
})
export class ComponentsModule { }
