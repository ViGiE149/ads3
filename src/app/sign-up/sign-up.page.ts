import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController,AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

_name="";
surname="";
username="";
email="";
contact="";
password="";
confirmPassword="";

constructor( private db: AngularFirestore,private router:Router,private toastController: ToastController,
  private alertController: AlertController,private loadingController: LoadingController,
   public navCtrl: NavController, private auth: AngularFireAuth) {}


ngOnInit() {
}

async signUp() {
 if (!this._name || !this.surname || !this.email || !this.password || !this.confirmPassword) {
  
    this.presentToast('All fields are required',"danger");
    return;
 }

 if (this.password.length < 8) {

    this.presentToast('Password must be at least 8 characters long',"danger");
    return;
 }

 if (this.password !== this.confirmPassword) {
   
    this.presentToast( 'Passwords do not match',"danger");
  
   return;
 }

 
 const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
 if (!passwordRegex.test(this.password)) {
    this.presentToast('Password must contain at least one number, one uppercase letter, and one special character',"danger");
    return;
 }


 const loader = await this.loadingController.create({
   message: 'Signing up',
   spinner:"bubbles",
   cssClass: 'custom-loader-class'
 });
 await loader.present();

 this.auth.createUserWithEmailAndPassword(this.email, this.password)
   .then( userCredential => {
    
     this.sendVerificationEmail(userCredential.user);
     
     this.db.collection('registeredUser')
     .add({
        name:this._name,
        surname:this.surname,
        email: this.email
     })
     .then((docRef) => {
       loader.dismiss();
       this.presentToast("signed up successfully sign in","primary");
       this.router.navigateByUrl("/sign-in");
      
    
     })
     .catch((error) => {
       loader.dismiss();

       alert('faild : ' + error);
       this.presentToast(error.message,"primary");

     });
 

     
   })
   .catch(async( error:any) => {
     loader.dismiss();
     const errorCode = error.code;
     const errorMessage = error.message;
    


     if(errorMessage=='Firebase: The email address is badly formatted. (auth/invalid-email).'){
  
      this.presentToast("Email address badly formatted","danger");
      return;

   }else if(errorMessage=="Firebase: The email address is already in use by another account. (auth/email-already-in-use)."){

    this.presentToast("Email address is already in use","warning");
    return;

 }
   });
 
}







 async sendVerificationEmail(user:any) {
   try {
     await user.sendEmailVerification();
     this.presentToast('Verification email sent. Please check your inbox and spam.',"primary");
   } catch (error) {
     console.error('Error sending verification email:', error);
     this.presentToast('Error sending verification email. Please try again.',"da");
   }
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
