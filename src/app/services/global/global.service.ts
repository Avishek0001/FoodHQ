import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
isLoading:boolean=false
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl:LoadingController,
    private modalCtrl:ModalController
  ) {
   }

   async showAlert(message:string, header?,buttonArray?){
    this.alertCtrl.create({
      header: header?header:'Authentication Failed',
      message:message,
      buttons: buttonArray ? buttonArray : ['okay']
    })
    .then(alert => alert.present())
   }

   async showToast(message,color,position,duration=3000){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:duration,
      color:color,
      position: position
    })
    toast.present();

   }

   errorToast(message?,duration=4000){
    this.showToast(
      message?message:'No Internet Connection',
      'danger',
      'bottom',
      duration
    )
   }
   successToast(message?,duration=4000){
    this.showToast(
      message,
    'success',
      'bottom',
      duration
    )
   }

    showLoader(msg?,spinner?){
    if(!this.isLoading)this.setLoader()
    return this.loadingCtrl.create({
      message:msg,
      spinner:spinner?spinner:'bubbles'
    }).then(res=>{
      res.present().then(()=>{
        if(!this.isLoading){
          res.dismiss().then(()=>{
            console.log('abort presenting');
            
          })
        }
      })
    })
      .catch(err=>{
        console.log('show loading error',err);
        
    })
   }

   async hideLoader(){
   if(this.isLoading)this.setLoader()
    return await this.loadingCtrl.dismiss().then(()=> console.log('loader dismissed'))
   }

   setLoader(){
    this.isLoading=!this.isLoading
   }
   
   async createModal(options){
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if(data)return data;
    
   }

   modalDismiss(value?){
    let data:any = value?value:null;
    console.log('data',data);
    
    this.modalCtrl.dismiss(data)
   }
}
