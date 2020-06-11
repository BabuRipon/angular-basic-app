import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn:'root'})

export class RecipeResolverRecipe implements Resolve<Recipe[]>{

    constructor(private dataStorageService:DataStorageService,private recipeService:RecipeService){}

   resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
       const recipes=this.recipeService.getRecipe();
       console.log(recipes);
       if(recipes.length===0){
        return this.dataStorageService.fetchRecipe();
       }else{
           return recipes;
       }
      
   }
}