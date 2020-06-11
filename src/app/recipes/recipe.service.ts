import { Recipe } from './recipe.model';
import {Injectable}from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService{

   recipeChanged=new Subject<Recipe[]>();
   isSpinnerLoading=new Subject<boolean>();

  //  private recipes:Recipe[]=[
  //       new Recipe('A test Recipe one',
  //       'this is simply a test only for image one',
  //       'assets/image/img1.jpg',
  //       [new Ingredient('meat',10),
  //       new Ingredient('burger',20)
  //     ]),
  //       new Recipe('A test Recipe two',
  //       'this is simply a test only for image two',
  //       'assets/image/img2.jpg',
  //       [
  //       new Ingredient('french fries',50),
  //       new Ingredient('al kabab',30)
  //       ]),
  //     ]

  private recipes:Recipe[]=[];
    constructor(private slService:ShoppingListService){}

    getRecipe(){
       return this.recipes.slice();
    }

    getRecipeById(index:number){
      return this.recipes[index];
    }

    addIngredientToShoppingList(ingredient:Ingredient[]){
        this.slService.addIngredient(ingredient)
    }

    addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number,recipe:Recipe){
      this.recipes[index]=recipe;
      this.recipeChanged.next(this.recipes.slice())

    }

    deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
    }

    setRecipe(recipeData:Recipe[]){
      this.recipes=recipeData;
      this.recipeChanged.next(this.recipes.slice());
      this.isSpinnerLoading.next(false);
    }

}
