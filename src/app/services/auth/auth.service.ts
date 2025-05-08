import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpServer:String= "http://localhost:4000/api";

  constructor(private storage:StorageService,private httpClient:HttpClient) { }
  // login(phone:string,password:string):Observable<any>{
  //   return this.httpClient.post<any>(`${this.httpServer}/login`,{phone,password}).pipe(
  //     tap((res:any)=>{
  //       if(res.status==200){
  //         this.storage.setStorage('uid',res.data.uid);
  //         this.storage.setStorage('profile',res.data.profile);
  //         console.log(res.data.uid);
  //         console.log(res.data.profile);
          
  //       }
  //     })
  //   )

  // }

  async login(phone: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.httpClient.post<any>(`${this.httpServer}/login`, { phone, password }).toPromise()
        .then((res: any) => {
          console.log(res.user);
          console.log(res.user._id);
          
          if (res!=null && res.success === true ) {
            this.storage.setStorage('uid', res.user._id);
            this.storage.setStorage('profile', JSON.stringify(res.user));
            // console.log(res.data.);
            // console.log(res.user);
            resolve(res); 
          } else {
            reject(res); 
          }
        })
        .catch((error) => {
          console.error(error); 
          reject(error); 
        });
    });
  }
  

  async register(username:string,phone:string,email:string,password:string):Promise<any>{
    return new Promise(async(resolve,reject)=>{
      await this.httpClient.post<any>(`${this.httpServer}/register`,{username,phone,email,password}).toPromise()
      .then((res:any)=>{
        console.log(res);
        
        if(res.success === true){
          this.storage.setStorage('uid', res.newUser._id);
          this.storage.setStorage('profile', JSON.stringify(res.newUser));
          
          resolve(res); 
        }else{
          reject(res); 
        }
      })
      .catch((error) => {
        console.error(error); // Handle any errors
        reject(error); // Reject the Promise with the error
      });
    })
  
  }  

  async getId(){
    return (await this.storage.getStorage('uid')).value
  }

  async logout(){
    return await this.storage.removeStorage('uid')
  }
}
