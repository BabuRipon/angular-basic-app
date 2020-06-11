import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private Router:Router) { }

  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;

  ngOnInit(): void {
      this.route.params.subscribe(
        (params:Params)=>{
            this.id=params['id'];
            this.editMode=params['id']!=null;
            this.initForm();
            // console.log(this.editMode);
        }
      )
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let ingredientArray=new FormArray([]);

    if(this.editMode){
      const recipe=this.recipeService.getRecipeById(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      // console.log(recipe);
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          ingredientArray.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'price':new FormControl(ingredient.price,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          )
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':ingredientArray,
    })
  }

  onSubmit(){
    if(this.editMode){
       this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else{
       this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'price':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    })) 
  }

  onCancel(){
    this.Router.navigate(['../',{relativeto:this.route}])
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }


  

}
