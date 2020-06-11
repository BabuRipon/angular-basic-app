import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { catchError,tap } from 'rxjs/operators';
import { throwError, BehaviorSubject,} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import {environment}from '../../environments/environment'
export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})

export class AuthService{

    constructor(private http:HttpClient,private router:Router){}

    userSub=new BehaviorSubject<User>(null);
   
    signUp(email:string,password:string){
         return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAuthKey,{
             email:email,
             password:password,
             returnSecureToken:true
         })
        .pipe(catchError(err => {
            let errormessage='an unknown error occure !';
           
            if(!err.error||!err.error.error){
                return throwError(errormessage)
            }
            
            switch(err.error.error.message){
                case 'EMAIL_EXISTS':
                    errormessage='email already exists';
                    return throwError(errormessage)
                case 'OPERATION_NOT_ALLOWED':
                    errormessage=err.error.error.message;
                    return throwError(errormessage)
            }
        }),
        tap(
           resData=>{
               this.handleAuthentication(
                   resData.email,
                   resData.localId,
                   resData.idToken,
                   +resData.expiresIn)
           }
        )
        )
    }


    signIn(email:string,password:string){

      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAuthKey,{
           email:email,
           password:password,
           returnSecureToken:true
       })
       .pipe(catchError(err=>{
           let errorMessage='unknown error occure';
           if(!err.error||!err.error.error){
               return throwError(errorMessage)
           }else{
               switch(err.error.error.message){
                   case 'EMAIL_NOT_FOUND':
                       errorMessage='There is no user record corresponding to this identifier. The user may have been deleted';
                       return throwError(errorMessage);
                    case 'INVALID_PASSWORD':
                        errorMessage=' The password is invalid or the user does not have a password';
                        return throwError(errorMessage);
                    case 'USER_DISABLED':
                        errorMessage='The user account has been disabled by an administrator';
                        return throwError(errorMessage);

               }
           }
       }),
       tap(
        resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn)
        }
     )
       )
    }

    private tokenExpirationTime:any;

  logout(){
      this.userSub.next(null);
      this.router.navigate(['/auth'])
      localStorage.removeItem('authData');
     
      if(this.tokenExpirationTime){
          clearTimeout(this.tokenExpirationTime);
      }

      this.tokenExpirationTime=null;
  }

  autoLogout(expirationTime:number){
     this.tokenExpirationTime =setTimeout(()=>{
          this.logout()
      },expirationTime)
  }

  autoLogin(){
      const user:{email:string,id:string,_token:string,_tokenExpirationDate:Date}=JSON.parse(localStorage.getItem('authData'));
      if(!user){
          return;
      }
      
      const loadedUser=new User(
          user.email,
          user.id,
          user._token,
          new Date(user._tokenExpirationDate)
      );
      if(loadedUser.getToken){

          this.userSub.next(loadedUser);

          let remainingTime=new Date(user._tokenExpirationDate).getTime()-new Date().getTime();
        //   console.log(remainingTime);
          this.autoLogout(remainingTime);
      }
  }

  private handleAuthentication(
      email:string,
      id:string,
      token:string,
      expireIn:number
  ){

    let expireDate=new Date(new Date().getTime()+expireIn*1000);
    let user=new User(email,id,token,expireDate)
    this.userSub.next(user);
    this.autoLogout(expireIn*1000);
    localStorage.setItem('authData',JSON.stringify(user))
  }
}