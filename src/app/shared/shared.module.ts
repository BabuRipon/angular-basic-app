import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert/alert-modal.component';
import { ErrorDirective } from './alert.directive';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinerComponent } from './loading-spiner/loading-spiner.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        AlertModalComponent,
        ErrorDirective,
        DropdownDirective,
        LoadingSpinerComponent,  
    ],
    imports:[CommonModule],
    exports:[
        AlertModalComponent,
        ErrorDirective,
        DropdownDirective,
        LoadingSpinerComponent,
        CommonModule
    ],
  entryComponents:[AlertModalComponent]
})
export class SharedModule{

}