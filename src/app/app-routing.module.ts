import { NgModule } from '@angular/core';

import {Routes, RouterModule, PreloadAllModules}from '@angular/router'

const appRouting:Routes=[
    {path:'',redirectTo:'/recipe',pathMatch:'full'}, 
    {path:'recipe',loadChildren: () => import('src/app/recipes/recipe.module').then(m => m.RecipeModule)},
    {path:'shopping-list',loadChildren:()=>import('src/app/shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)},
    {path:'auth',loadChildren:()=>import('src/app/auth/auth.module').then(m=>m.AuthModule)}

]

@NgModule({
    imports:[RouterModule.forRoot(appRouting,{preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule{

}