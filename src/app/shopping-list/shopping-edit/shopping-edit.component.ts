import { Component, OnInit,OnDestroy ,ViewChild,ElementRef} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  constructor(private slService:ShoppingListService) { }

  editMode:boolean=false;
  editItemIndex:number;
  subcription:Subscription;
  edittedIngredient:Ingredient;
  @ViewChild('f') slForm:NgForm;

  ngOnInit(): void {
    this.subcription=this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editItemIndex=index;
        this.editMode=true;
        this.edittedIngredient=this.slService.getIngredient(this.editItemIndex)
        this.slForm.setValue({
          name:this.edittedIngredient.name,
          amount:this.edittedIngredient.price
        })
      }
    )
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

 
  onAddItem(form:NgForm){
      let formValue=form.value;
      // console.log(formValue);
      let newIngredient=new Ingredient(formValue.name,formValue.amount);
      if(this.editMode){
        this.slService.updateIngredient(this.editItemIndex,newIngredient);
      }else{
         this.slService.addIngredients(newIngredient);
      }
      this.editMode=false;
      form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

}

