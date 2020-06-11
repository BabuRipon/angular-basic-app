import { Component, OnInit ,Input} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }
  id:number;
  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params)=>{
           this.id=+params['id'];
          this.recipe=this.recipeService.getRecipeById(this.id);
      }
    )
    
  }

 recipe:Recipe;

  onAddToShoppingList(){
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
      this.router.navigate(['edit'],{relativeTo:this.route});
      // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipe'])
  }

}
