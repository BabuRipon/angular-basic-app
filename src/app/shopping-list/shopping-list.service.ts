import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import {Subject}from 'rxjs';


export class ShoppingListService{
   ingredientChange=new Subject<Ingredient[]>();
   startedEditing=new Subject<number>();

   private ingredients:Ingredient[]=[
        new Ingredient('tomato',10),
        new Ingredient('apple',5)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      addIngredients(ingredient:Ingredient){
          event.preventDefault();
          this.ingredients.push(ingredient);
          this.ingredientChange.next(this.ingredients.slice());
      }

      addIngredient(ingredients:Ingredient[]){
        //   for(let ingredient of ingredients){
        //       this.addIngredients(ingredient);
        //   }
        this.ingredients.push(...ingredients);
        this.ingredientChange.next(this.ingredients.slice());
      }

      getIngredient(index:number){
        return this.ingredients[index];
      }

      updateIngredient(index:number,ingredient:Ingredient){
        this.ingredients[index]=ingredient;
        this.ingredientChange.next(this.ingredients.slice());
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChange.next(this.ingredients.slice());
      }
      
}