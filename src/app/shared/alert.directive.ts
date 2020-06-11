import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector:'[appErrorHolder]'
})
export class ErrorDirective{
  constructor(public vcRef:ViewContainerRef)  {} 
}