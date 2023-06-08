import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  email="";
  constructor(private toastController: ToastController,private router:Router, private auth:AngularFireAuth) { }

  ngOnInit() {
  }

  reset(){
   
   
    this.auth.sendPasswordResetEmail(this.email)
    .then(userCredential => {
  
      this.presentToast("Email sent with link to reset your password","primary");
      this.router.navigateByUrl("/login");
      // ...
    })
    .catch((error:any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
 
      // ..

      if(errorMessage=='Firebase: The email address is badly formatted. (auth/invalid-email).'){
        this.presentToast("The email address is badly formatted",'danger');
      }
      else if(errorMessage=="Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."){
        this.presentToast("There is no user record corresponding to this identifier",'danger');
      }

    });
  }

  async presentToast(message: string, color:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color:  color,
    });
    toast.present();
  }
}
