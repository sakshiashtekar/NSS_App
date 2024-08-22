import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    private authService: AuthService ,
    private alertCtrl: AlertController,
    private toasrCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
    ) {}

    form = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      pass: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
    });

  async onSubmit(){
    const loading = await this.loadingCtrl.create({message:'Logging in...'});
    (await loading).present();

    this.authService.login(this.form.value).subscribe(
      async (token:any)  =>{
        localStorage.setItem('token', token);
        loading.dismiss();
        this.router.navigateByUrl('/news-page');
      },

      async () =>{
        const alert = await this.alertCtrl.create({message:"Login Failed", buttons:['OK']});
        (await alert).present();
        loading.dismiss();
      }
    );
  }

}
