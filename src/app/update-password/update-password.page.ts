import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.page.html',
  styleUrls: ['./update-password.page.scss'],
})
export class UpdatePasswordPage implements OnInit {

  newPassword="";
  constructor(  private toastController: ToastController,
    private router: Router,private auth: AngularFireAuth) { }

  ngOnInit() {
  }

async updatePassword(){

 await this.auth.currentUser.then( user => {
    if (user) {



      if (this.newPassword.length < 8) {

        this.presentToast('Password must be at least 8 characters long',"danger");
        return;
     }


      if (!this.newPassword) {
        this.presentToast('Email is required.','danger');
        return;
      }
      const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(this.newPassword)) {
         this.presentToast('Password must contain at least one number, one uppercase letter, and one special character',"danger");
         return;
      }
     
      user.updatePassword(this.newPassword)
        .then(() => {
          // Password update successful
          this.presentToast('Password updated successfully',"primary");
          this.router.navigate(['/home']);
          // Add any additional code you want to execute after updating the password
        })
        .catch(error  => {
          // An error occurred while updating the password
          console.error('Error updating password:', error);
          this.presentToast(error.message,"primary");   
          // Handle the error and display an error message to the user
        });
    } else {
      // User is not currently signed in
      console.error('No user signed in');
      this.presentToast('No user signed in',"dander");
      // Handle the case where the user is not signed in
    }
  });

}

async presentToast(message: string,color:any) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'top',
    color: color,
  });
  toast.present();
}




}