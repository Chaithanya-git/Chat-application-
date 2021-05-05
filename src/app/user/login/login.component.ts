import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email : any;
  public password : any;
  constructor(public appService:AppService,public router:Router,private toastr : ToastrService,vcr: ViewContainerRef,private form:FormsModule) { }

  ngOnInit(): void {
  }

  public goToSignUp: any = () =>{
    this.router.navigate(['/signup']); 
  }

  public signInFunction: any = () =>{
    
   if(!this.email){
     this.toastr.warning('Enter email')
   }
   else if(!this.password){
     this.toastr.warning('Enter password')
   }
   else{
     let user ={
       
       email:this.email,
       password:this.password
      
     }

     console.log(user);

    this.appService.signinFunction(user).subscribe((res)=>{
      console.log(Object.values(res));
      
      console.log(res.data.authToken.toString());
      
      let auth = res.data.authToken.toString();

      if (res.status == 200){
        Cookie.set('authToken',auth);
        Cookie.set('receiverId',res.data.userDetails.userId);
        Cookie.set('receiverName',res.data.userDetails.firstName+''+res.data.userDetails.lastName);
        this.appService.setUserInfoInLocalStorage(res.data.userDetails);
        console.log("before chat route")
        this.router.navigate(['/chat']);
        console.log("after chat route")
        }else {
          this.toastr.error(res.data.message);
        }

    },(err)=>{
       this.toastr.error('some error occured')
    });
    
   }
 }

}
