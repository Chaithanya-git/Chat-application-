import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

public firstName : any;
public lastName : any;
public mobile : any;
public email : any;
public password : any;



  constructor(public appService:AppService,public router:Router,private toastr : ToastrService,vcr: ViewContainerRef,private form:FormsModule) { 
    
  }

  ngOnInit() {
    
  }


  public goToSignIn: any = () =>{
    this.router.navigate(['/']); 
  }

  public signUpFunction: any = () =>{
     if(!this.firstName){
       this.toastr.warning('Enter first name')
     }
     else if(!this.lastName){
      this.toastr.warning('Enter last name')
    }
    else if(!this.mobile){
      this.toastr.warning('Enter mobile')
    }
    else if(!this.email){
      this.toastr.warning('Enter email')
    }
    else if(!this.password){
      this.toastr.warning('Enter password')
    }
    else{
      let data ={
        firstName : this.firstName,
        lastName : this.lastName,
        email:this.email,
        mobile:this.mobile,
        password:this.password
       }

      console.log(data);

     this.appService.signupFunction(data).subscribe((apiResponse:any)=>{
       console.log(apiResponse);

       if (apiResponse.status === 200){
         this.toastr.success('signup successfull');
         setTimeout(()=>{
           this.goToSignIn();
         },2000);
         }else {
           this.toastr.error(apiResponse.message);
         }

     },(err:any)=>{
        this.toastr.error('some error occured')
     });
     
    }
  }




}
