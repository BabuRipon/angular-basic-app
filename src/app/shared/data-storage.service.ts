import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map,tap, take, exhaustMap}from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn:'root'})
export class DataStorageService{
  constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService){}

  storeData(){
      let recipes=this.recipeService.getRecipe();
      this.http.put('https://ng-course-recipe-book-7091d.firebaseio.com/recipes.json',recipes)
        .subscribe(response=>{
            console.log(response);
        })
  }

  fetchRecipe(){

    return this.http.get<Recipe[]>('https://ng-course-recipe-book-7091d.firebaseio.com/recipes.json').pipe(
      map(recipes=>{
        if(recipes.length!==null)
        {
         return recipes.map(recipe=>{
           return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
         });
        }else{
          return recipes;
        }
      }),
      tap(recipes=>{
       this.recipeService.setRecipe(recipes)
      })
    )
        
    
  }


}


