import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import {take,exhaustMap}from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{
    
    constructor(private authService:AuthService){}
   
    intercept(req:HttpRequest<any>,next:HttpHandler){
       return this.authService.userSub.pipe(take(1),exhaustMap(
           user=>{
               console.log(user);
               if(!user){
                   return next.handle(req);
               }
               let modifiedReq=req.clone({
                   params:new HttpParams().set('auth',user.getToken)
               })
              return next.handle(modifiedReq);
           }
       ))
    }
}