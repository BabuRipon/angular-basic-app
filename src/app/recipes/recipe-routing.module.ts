import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeResolverRecipe } from './recipe-resolver.service';

const RecipeRoute:Routes=[
    {path:'',component:RecipesComponent,
    canActivate:[AuthGuard]
    ,children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailsComponent,resolve:[RecipeResolverRecipe]},
        {path:':id/edit',component:RecipeEditComponent},
        
    ]},
]

@NgModule({
    imports:[RouterModule.forChild(RecipeRoute)],
    exports:[RouterModule]
})

export class RecipeRoutingModule{

}