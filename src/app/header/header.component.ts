import { Component, OnInit,OnDestroy,Output ,EventEmitter} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{

  constructor(private dataStorageService:DataStorageService,private router:Router,private recipeService:RecipeService,private authService:AuthService) { }

  isAuthenticated:boolean=false;
  private subs:Subscription;
  
  ngOnInit(): void {
    this.subs=this.authService.userSub.subscribe(
      userData=>{
        this.isAuthenticated=userData?true:false;
      }
    )
  }

  

  onDataSave(){
     this.dataStorageService.storeData();
  }

  onFetchData(){
     this.recipeService.isSpinnerLoading.next(true);
    this.dataStorageService.fetchRecipe().subscribe(response=>{
      // console.log(response);
    });
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  onLogout(){
    this.isAuthenticated=false;
    this.authService.logout();
  }


}
