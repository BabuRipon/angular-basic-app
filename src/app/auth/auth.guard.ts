import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map,take,tap}from 'rxjs/operators'
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService,private router:Router){}

   canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):
   boolean|UrlTree|Promise<boolean|UrlTree>|Observable<boolean|UrlTree>{
       return this.authService.userSub.pipe(
           take(1),
           map(
               user=>{
                   const isAuth=!!user;
                   if(isAuth){
                       return true
                   }else{
                       return this.router.createUrlTree(['/auth'])
                   }
               }
           ),
        //    tap(isAuth=>{
        //        if(!isAuth){
        //            return this.router.navigate(['/auth'])
        //        }
        //    })
       )
   }

}