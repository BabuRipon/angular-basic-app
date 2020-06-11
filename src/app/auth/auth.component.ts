import {Component, ComponentFactoryResolver, ViewChild, OnDestroy}from '@angular/core'
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../shared/alert/alert-modal.component';
import { ErrorDirective } from '../shared/alert.directive';



@Component({
   selector:'auth-element',
   templateUrl:'./auth.component.html',
   styleUrls:['./auth.component.css']
})

export class AuthComponent implements OnDestroy{
  isLoggedIn=true;
  isLoading=false;
  error=null;

  closeSub:Subscription;

  @ViewChild(ErrorDirective) appError:ErrorDirective

  constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver){}

  onSwitchMode(){
      this.isLoggedIn=!this.isLoggedIn;
  }

  authObs:Observable<AuthResponseData>;


  onSubmit(form:NgForm){
   //   console.log(form.value);
   if(!form.valid){
      return
   }
   this.isLoading=true;
   const email=form.value.email;
   const password=form.value.password;

   if(this.isLoggedIn){
      this.authObs=this.authService.signIn(email,password);
   }else{
     this.authObs=this.authService.signUp(email,password)
   }

   this.authObs.subscribe(
      responseData=>{
         this.isLoading=false;
         console.log(responseData);
         this.router.navigate(['/recipe']);
      },
      errorData=>{
         this.isLoading=false;
         this.showPrivateError(errorData);
         // console.log(errorData)
         // this.error=errorData;
         
         // setTimeout(()=>{
         //    this.error=null
         // },3000);
      }
   );

     form.reset();
  }

  onClose(){
     this.error=null;
  }

  private showPrivateError(message:string){
      const alertComponentFactory=this.componentFactoryResolver.resolveComponentFactory(
         AlertModalComponent
      );
    const hostViewContainerRef=this.appError.vcRef ;
    hostViewContainerRef.clear();
    
    const componentRef=hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message=message;
   
    this.closeSub=componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe(); 
      hostViewContainerRef.clear();
    })

  }

  ngOnDestroy(){
   
     if(this.closeSub){
         this.closeSub.unsubscribe();
     }

  }

}