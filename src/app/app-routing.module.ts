import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMenuComponent } from './user-page/user-menu/user-menu.component';
import { PizzaListComponent } from './user-page/user-foods/pizza/pizza-list/pizza-list.component';

import { PizzaDetailsComponent } from './user-page/user-foods/pizza/pizza-details/pizza-details.component';
import { UserCartComponent } from './user-page/user-cart/user-cart.component';
import { UserHomepageComponent } from './user-page/user-homepage/user-homepage.component';
import { ContactPageComponent } from './user-page/contact-page/contact-page.component';
import { OrderPageComponent } from './user-page/order-page/order-page.component';
import { AboutComponent } from './user-page/about/about.component';

import { BurgerListComponent } from './user-page/user-foods/burger/burger-list/burger-list.component';

import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDessertListComponent } from './user-page/user-foods/dessert/user-dessert-list/user-dessert-list.component';
import { SubmarineListComponent } from './user-page/user-foods/submarine/submarine-list/submarine-list.component';
import { CrispyListComponent } from './user-page/user-foods/crispy/crispy-list/crispy-list.component';
import { BevarageListComponent } from './user-page/user-foods/bevarage/bevarage-list/bevarage-list.component';

const routes: Routes = [

  //user
  {path: '' , redirectTo: 'user-homepage' , pathMatch: 'full'},
  {path : 'user-homepage' , component : UserHomepageComponent},
  {path: 'user-menu' , component: UserMenuComponent, children: [

    {path : 'pizzas', component: PizzaListComponent},
    {path : 'burgers' , component : BurgerListComponent},
    {path :'desserts' , component: UserDessertListComponent},
    {path:'submarine' , component: SubmarineListComponent},
    {path: 'crispy' , component: CrispyListComponent},
    {path:'bevarage' , component: BevarageListComponent},
    {path: 'user-cart' , component: UserCartComponent},
    
 
  ]},
    {path : 'about' , component : AboutComponent},
    {path : 'contact-page' , component : ContactPageComponent},


  {path : 'pizza-details/:id' , component: PizzaDetailsComponent},
  {path: 'order-page' , component : OrderPageComponent},
 




{path:'login', component:LoginComponent},

{path: 'admin', canActivate:[AuthGuard],
loadChildren: () =>
import('./modules/admin/admin.module').then((m) => m.AdminModule), },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
