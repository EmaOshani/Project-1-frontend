import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




//start user part//

import { HeaderComponent } from './user-page/header/header.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserFoodsComponent } from './user-page/user-foods/user-foods.component';
import { UserSidenavComponent } from './user-page/user-sidenav/user-sidenav.component';
import { UserMenuComponent } from './user-page/user-menu/user-menu.component';
import { UserCartComponent } from './user-page/user-cart/user-cart.component';
import { UserHomepageComponent } from './user-page/user-homepage/user-homepage.component';
import { OrderPageComponent } from './user-page/order-page/order-page.component';
import { ContactPageComponent } from './user-page/contact-page/contact-page.component';
import { AboutComponent } from './user-page/about/about.component';
import { FooterComponent } from './user-page/footer/footer.component';

//user pizza//
import { PizzaComponent } from './user-page/user-foods/pizza/pizza.component';
import { PizzaListComponent } from './user-page/user-foods/pizza/pizza-list/pizza-list.component';
import { PizzaDetailsComponent } from './user-page/user-foods/pizza/pizza-details/pizza-details.component';

import { BurgerComponent } from './user-page/user-foods/burger/burger.component';
import { BurgerListComponent } from './user-page/user-foods/burger/burger-list/burger-list.component';


import { LoginComponent } from './component/login/login.component';
import { BillComponent } from './user-page/order-page/bill/bill.component';
import { ModalModule } from 'ngx-bootstrap/modal';
//dessert
import { DessertComponent } from './user-page/user-foods/dessert/dessert.component';

import { UserDessertListComponent } from './user-page/user-foods/dessert/user-dessert-list/user-dessert-list.component';
//submrine
import { SubmarineComponent } from './user-page/user-foods/submarine/submarine.component';
import { SubmarineListComponent } from './user-page/user-foods/submarine/submarine-list/submarine-list.component';
//crispy chicken
import { CrispyComponent } from './user-page/user-foods/crispy/crispy.component';
import { CrispyListComponent } from './user-page/user-foods/crispy/crispy-list/crispy-list.component';
import { BevarageComponent } from './user-page/user-foods/bevarage/bevarage.component';
import { BevarageListComponent } from './user-page/user-foods/bevarage/bevarage-list/bevarage-list.component';






@NgModule({
  declarations: [
    AppComponent,



    //user start//
    UserPageComponent,
    UserFoodsComponent,
    HeaderComponent,
    UserHomepageComponent,
    UserSidenavComponent,
    UserCartComponent,
    UserFoodsComponent,
    UserMenuComponent,
    ContactPageComponent,
    OrderPageComponent,
    AboutComponent,
    FooterComponent,

    //user-pizza//
    PizzaComponent,
    PizzaListComponent,
    PizzaDetailsComponent,
    
    BurgerComponent,
    BurgerListComponent,

    //dessert
    DessertComponent,
    
    UserDessertListComponent,
 
    LoginComponent,
      BillComponent,
      //submarine
      SubmarineComponent,
      SubmarineListComponent,
     
      //crispy chicken
      CrispyComponent,
      CrispyListComponent,
      //bevarage
      BevarageComponent,
      BevarageListComponent,
 
  
    
    //user end//



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
