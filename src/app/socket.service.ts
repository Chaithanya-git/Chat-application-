import { Injectable } from '@angular/core';

const io = require('socket.io-client')
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

console.log("socketservice called");
@Injectable()
export class SocketService {
  
  private url = 'http://localhost:3000/api/v1/chat';

  private socket;


  constructor(public http: HttpClient) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);

  }

  // events to be listened 
  
  public verifyUser = () => {

    return Observable.create((observer:any) => {

      this.socket.on('verifyUser', (data:any) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end verifyUser

  public onlineUserList = () => {

    return Observable.create((observer:any) => {

      this.socket.on("online-User-List", (userList:any) => {

        observer.next(userList);

      }); // end Socket

    }); // end Observable

  } // end onlineUserList


  public disconnectedSocket = () => {

    return Observable.create((observer:any) => {

      this.socket.on("disconnect", () => {

        observer.next();

      }); // end Socket

    }); // end Observable



  } // end disconnectSocket

  // end events to be listened

  // events to be emitted

  public setUser = (authToken:any) => {

    this.socket.emit("set-user", authToken);

  } // end setUser

  public markChatAsSeen = (userDetails:any) => {

    this.socket.emit('mark-chat-as-seen', userDetails);

  } // end markChatAsSeen



  // end events to be emitted

  // chat related methods 

  

  public getChat(senderId: any, receiverId: any, skip: number): Observable<any> {
    console.log(Cookie.get('authToken'));
    return this.http.get(`${this.url}/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken='${Cookie.get('authToken')}'`)
      .pipe(tap(_data=> console.log('Data Received')))
      .pipe(catchError(this.handleError));
     
  } // end logout function
 // ${Cookie.get('authtoken')}
  public chatByUserId = (userId: any) => {

    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      
      this.socket.on(userId, (data: any) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end chatByUserId

  public SendChatMessage = (chatMsgObject: { senderName: string; senderId: any; receiverName: string; receiverId: string; message: any; createdOn: Date; }) => {

    this.socket.emit('chat-msg', chatMsgObject);

  } // end getChatMessage


  public exitSocket = () =>{


    this.socket.disconnect();


  }// end exit socket




  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError
 
}
