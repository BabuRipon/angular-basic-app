import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
    selector:'app-alert',
    templateUrl:'./alert-modal.component.html',
    styleUrls:['./alert-modal.component.css']
})
export class AlertModalComponent{
  @Input() message:string;
  @Output() close=new EventEmitter<any>()
  
  Close(){
     this.close.emit();
  }
}