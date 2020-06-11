import { Component, OnInit,OnDestroy } from '@angular/core';
import {Ingredient}from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredient[];

  private igChageSub:Subscription;

  constructor(private slIngredient:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.slIngredient.getIngredients();
    this.igChageSub=this.slIngredient.ingredientChange.subscribe(
      (ingredient:Ingredient[])=>{
          this.ingredients=ingredient;
      }
    )
  }

  onEditItem(id:number){
    this.slIngredient.startedEditing.next(id);
  }

  ngOnDestroy(){
    this.igChageSub.unsubscribe();
  }


}
