import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { ChatModule } from './chat/chat.module';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ChatModule,
    UserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
