import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule,Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppService } from '../app.service';
import { ChatModule } from '../chat/chat.module';
import { ChatBoxComponent } from '../chat/chat-box/chat-box.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChatModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    RouterModule.forChild([
      {path:'signup',component:SignupComponent},
    ])
   
  ],
  providers: [AppService]
})
export class UserModule { }
