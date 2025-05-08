import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { Restaurant } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  profile:any
   banners=[
    {banner:"../../assets/banner1.jpg"},
    {banner:"../../assets/banner2.jpg"},
    {banner:"../../assets/banner3.jpg"}
  ]
  

  setProfile(profile){
    this.profile=profile
  }

  getProfile(){
    return this.profile;
  }
  
   restaurants:Restaurant[] =  [
    {uid:'12',
      cover:'../../assets/1.jpg',
      name:"Restaurant 1",
      cuisines:[
        'Italina',
        'South Indian'
      ],
      address:"ABCD Address",
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:100
    },
    {uid:'123',
      cover:'../../assets/2.jpeg',
      name:"Restaurant 2",
      cuisines:[
        'Italian',
        'Chinese'
      ],
      address:"ABCD Address",
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:150
    },
    {uid:'125',
      cover:'../../assets/3.jpg',
      name:"Restaurant 3",
      cuisines:[
        'Italian',
        'Chinese'
      ],
      address:"ABCD Address",
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:250
    }
  ]


  Allrestaurants:Restaurant[] = [
    {uid:'12',
      cover:'../../assets/1.jpg',
      name:"Restaurant 1",
      shortname:"restaurant1",
      cuisines:[
        'Italina',
        'South Indian'
      ],
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:100
    },
    {uid:'123',
      cover:'../../assets/2.jpeg',
      name:"Restaurant 2",
      shortname:"restaurant2",
      cuisines:[
        'Italina',
        'Chinese'
      ],
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:150
    },
    {uid:'125',
      cover:'../../assets/3.jpg',
      name:"Restaurant 3",
      shortname:"restaurant3",
      cuisines:[
        'Italina',
        'Chinese'
      ],
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:250
    }
  ]


  allRestaurant= [
    {uid:'12',
      cover:'../../assets/1.jpg',
      name:"Restaurant 1",
      shortname:"restaurant1",
      cuisines:[
        'Italina',
        'South Indian'
      ],
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:100
    },
    {uid:'123',
      cover:'../../assets/2.jpeg',
      name:"Restaurant 2",
      shortname:"restaurant2",
      cuisines:[
        'Italina',
        'Chinese'
      ],
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:150
    },
    {uid:'125',
      cover:'../../assets/3.jpg',
      name:"Restaurant 3",
      shortname:"restaurant3",
      cuisines:[
        'Italina',
        'Chinese'
      ],
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:250
    }
  ]



  allItems:Item[]=[
    {
      category_id:"e00",
      cover:"../../assets/3.jpg",
      desc:"Great in taste",
      id:"i1",
      name:"Pizza",
      price:120,
      rating:0,
      status:true,
      uid:"12",
      variation:false,
      veg:false
    },
    {
      category_id:"e0",
      cover:"../../assets/3.jpg",
      desc:"Great in taste",
      id:"i3",
      name:"Moong Dal Chart",
      price:200,
      rating:0,
      status:true,
      uid:"12",
      variation:false,
      veg:true
    },
    {
      category_id:"e00",
      cover:"../../assets/3.jpg",
      desc:"Great in taste",
      id:"i2",
      name:"Salad",
      price:200,
      rating:0,
      status:true,
      uid:'125',
      variation:false,
      veg:true
    },
    {
      category_id:"e10",
      cover:"../../assets/3.jpg",
      desc:"Great in taste",
      id:"i3",
      name:"Veg Fried Rice",
      price:200,
      rating:0,
      status:true,
      uid:'125',
      variation:false,
      veg:true
    },
    {
      category_id:"e10",
      cover:"../../assets/3.jpg",
      desc:"Great in taste",
      id:"i5",
      name:"Chilly Chicken",
      price:200,
      rating:0,
      status:true,
      uid:'125',
      variation:false,
      veg:false
    }
  ]


  categories:Category[]=[
    {
      id:"e00",
      name:"Italian",
      uid:"12"
    },
    {
      id:"e0",
      name:"Mexican",
      uid:"12"
    },
    {
      id:"e10",
      name:"Chinese",
      uid:"125"
    }
  ]


  address:Address[]=[
    {address:"Beleghata,Kolkata",
      house:"Somonnoy Apartment",
       id:"yiegf7743o8rh",
       landmark:"Near Phoolbagan Metro",
       street:"21 KG Bose Sarani",
       lat: 26.108991978867923, 
      lng: 91.79069981213378, 
      title:'Home',
       user_id:"1"
      },
    {address:"Sodpore,Kolkata",house:"Gitanjali Apartment", id:"g6e8",landmark:"Near Sodepore Station",street:"HC Dutta Road",lat: 26.108991978867923, 
      lng: 91.79069981213378, title:"Home 2",user_id:"1"},
  ]



  orders:Order[]=[{
    address:{
      address:"Sodpore,Kolkata",
      house:"Gitanjali Apartment", 
      id:"g6e8",
      landmark:"Near Sodepore Station",
      street:"HC Dutta Road",
      user_id:"1"
    },
    deliveryCharge:20,
    grandTotal:540,
    id:"huwe123",
    order:[
      {
        category_id:"e00",
        cover:"",
        desc:"Great in taste",
        id:"i1",
        name:"Pizza",
        price:120,
        rating:0,
        status:true,
        uid:"12",
        variation:false,
        veg:false
      },
      {
        category_id:"e0",
        cover:"",
        desc:"Great in taste",
        id:"i3",
        name:"Moong Dal Chart",
        price:200,
        rating:0,
        status:true,
        uid:"12",
        variation:false,
        veg:true,
        quantity:1
      }
    ],
    paid:"COD",
    restaurant: {uid:'12',
      cover:'../../assets/1.jpg',
      name:"Restaurant 1",
      cuisines:[
        'Italina',
        'South Indian'
      ],
      address:"ABCD Address",
      rating:5,
      delivery_times:25,
      distance:2.5,
      price:100
    },
    restaurant_id: "12",  
    status: "created",
    time: "Jul 6, 2020 11:44 AM",
    total: 500,
    user_id: "1"
  },
  {
    address: {
      address: "Indira Nagar Rd, Borsojai, Basistha 781029, India", 
      house: "dsgd", 
      id: "15", 
      landmark: "fdgs", 
      lat: 26.108991978867923, 
      lng: 91.79069981213378, 
      title: "yui", 
      user_id: "1" 
    }, 
    deliveryCharge: 20,
    grandTotal: 440,
    id: "5454",
    order:[
      {
        category_id:"e00",
        cover:"",
        desc:"Great in taste",
        id:"i1",
        name:"Pizza",
        price:120,
        rating:0,
        status:true,
        uid:"12",
        variation:false,
        veg:false
      },
      {
        category_id:"e0",
        cover:"",
        desc:"Great in taste",
        id:"i3",
        name:"Moong Dal Chart",
        price:200,
        rating:0,
        status:true,
        uid:"12",
        variation:false,
        veg:true,
        quantity:1
      }
    ],
    paid: "COD",  
    restaurant: {address: "Beltola Tiniali, India",
       city: "909090271",
       closeTime: "20:00",
       cover: "assets/imgs/restaurant-1.jpg",
       cuisines: ["Italian",
       "Mexican"], delivery_times: 25,
       email: "stay@fit.com",
       uid: "123",
       isClose: true, name: "Stayfit",
       openTime: "08:00",
       phone: 6786745745, price: 25, rating: 0, shortname: "stayfit",
       status: "open",
       totalRating: 0},   
    restaurant_id: "12",
      
    status: "Delivered",
    time: "Jul 7, 2020 11:44 AM",
    total: 500,
    user_id: "1"
  },]

  constructor() { }


}
