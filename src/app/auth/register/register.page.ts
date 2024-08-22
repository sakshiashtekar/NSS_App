import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toasrCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  form = new FormGroup({
    fname: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    lname: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
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
    const loading = this.loadingCtrl.create({message: 'Registering...'});
    (await loading).present();
    this.authService.register(this.form.value).subscribe(
      //if user created
      async () =>{
        const toast = await this.toasrCtrl.create({message:'User Registered Successfully', duration:2000, color:'dark'});
        (await toast).present();
        (await loading).dismiss();
        this.form.reset();
      },
      //if failed
      async ()=>{
        const alert = await this.alertCtrl.create({message: "Something went wrong", buttons:['OK']});
        (await loading).dismiss();
        (await alert).present();
      } 
    );
    // console.log(this.form.value);
  }
  ngOnInit() {
  }

}
