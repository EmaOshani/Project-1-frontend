import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
//
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PopupBillComponent } from './components/admin-dashboard/comfirem/popup-bill/popup-bill.component';
import { CancelComponent } from './components/admin-dashboard/cancel/cancel.component';
import { PendingComponent } from './components/admin-dashboard/pending/pending.component';
import { ComfiremComponent } from './components/admin-dashboard/comfirem/comfirem.component';
//
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { AdminFoodsComponent } from './components/admin-foods/admin-foods.component';
//burger
import { AdminBurgerComponent } from './components/admin-foods/admin-burger/admin-burger.component';
import { AdminBurgerDetailsComponent } from './components/admin-foods/admin-burger/admin-burger-details/admin-burger-details.component';
import { AdminBurgerListComponent } from './components/admin-foods/admin-burger/admin-burger-list/admin-burger-list.component';
import { CreateBurgerComponent } from './components/admin-foods/admin-burger/create-burger/create-burger.component';
import { UpdateBurgerComponent } from './components/admin-foods/admin-burger/update-burger/update-burger.component';
//pizza
import { AdminPizzaComponent } from './components/admin-foods/admin-pizza/admin-pizza.component';
import { ApizzaDetailsComponent } from './components/admin-foods/admin-pizza/apizza-details/apizza-details.component';
import { ApizzaListComponent } from './components/admin-foods/admin-pizza/apizza-list/apizza-list.component';
import { CreatePizzaComponent } from './components/admin-foods/admin-pizza/create-pizza/create-pizza.component';
import { UpdatePizzaComponent } from './components/admin-foods/admin-pizza/update-pizza/update-pizza.component';
//dessert
import { AdminDessertComponent } from './components/admin-foods/admin-dessert/admin-dessert.component';
import { CreateDessertComponent } from './components/admin-foods/admin-dessert/create-dessert/create-dessert.component';
import { DessertListComponent } from './components/admin-foods/admin-dessert/dessert-list/dessert-list.component';
import { DessertDetailsComponent } from './components/admin-foods/admin-dessert/dessert-details/dessert-details.component';
import { UpdateDessertComponent } from './components/admin-foods/admin-dessert/update-dessert/update-dessert.component';
//submarine
import { AdminSubmarineComponent } from './components/admin-foods/admin-submarine/admin-submarine.component';
import { AdminSubmarineDetailsComponent } from './components/admin-foods/admin-submarine/admin-submarine-details/admin-submarine-details.component';
import { AdminSubmarineListComponent } from './components/admin-foods/admin-submarine/admin-submarine-list/admin-submarine-list.component';
import { CreateSubmaineComponent } from './components/admin-foods/admin-submarine/create-submaine/create-submaine.component';
import { UpdateSubmarineComponent } from './components/admin-foods/admin-submarine/update-submarine/update-submarine.component';
//crispy chicken
import { AdminCrispyComponent } from './components/admin-foods/admin-crispy/admin-crispy.component';
import { AdminCrispyDetailsComponent } from './components/admin-foods/admin-crispy/admin-crispy-details/admin-crispy-details.component';
import { AdminCrispyListComponent } from './components/admin-foods/admin-crispy/admin-crispy-list/admin-crispy-list.component';
import { CreateCrispyComponent } from './components/admin-foods/admin-crispy/create-crispy/create-crispy.component';
import { UpdateCrispyComponent } from './components/admin-foods/admin-crispy/update-crispy/update-crispy.component';
//bevarage
import { AdminBevarageComponent } from './components/admin-foods/admin-bevarage/admin-bevarage.component';
import { AdminBevarageListComponent } from './components/admin-foods/admin-bevarage/admin-bevarage-list/admin-bevarage-list.component';
import { AdminBevarageDetailsComponent } from './components/admin-foods/admin-bevarage/admin-bevarage-details/admin-bevarage-details.component';
import { CreateBevarageComponent } from './components/admin-foods/admin-bevarage/create-bevarage/create-bevarage.component';
import { UpdateBevargeComponent } from './components/admin-foods/admin-bevarage/update-bevarge/update-bevarge.component';
//
import { SellsComponent } from './components/admin-dashboard/sells/sells.component';




@NgModule({
  declarations: [
    
    AdminDashboardComponent,
    AdminHeaderComponent,
    AdminMenuComponent,
    AdminSidenavComponent,
    AdminFoodsComponent,
    CancelComponent,
    PendingComponent,
    ComfiremComponent,
    PopupBillComponent,
  

    //burger
    AdminBurgerComponent, 
    AdminBurgerDetailsComponent,
    AdminBurgerListComponent,
    CreateBurgerComponent,
    UpdateBurgerComponent,
    //pizza
    AdminPizzaComponent,
    ApizzaDetailsComponent,
    ApizzaListComponent,
    CreatePizzaComponent,
    UpdatePizzaComponent,
    //dessert
    AdminDessertComponent,
    CreateDessertComponent,
    DessertListComponent,
    DessertDetailsComponent,
    UpdateDessertComponent,
    //submarine
    AdminSubmarineComponent,
    AdminSubmarineDetailsComponent,
    AdminSubmarineListComponent,
    CreateSubmaineComponent,
    UpdateSubmarineComponent,
    //crispy
    AdminCrispyComponent,
    AdminCrispyDetailsComponent,
    AdminCrispyListComponent,
    CreateCrispyComponent,
    UpdateCrispyComponent,
   //bevarage
    AdminBevarageComponent,
    AdminBevarageListComponent,
    AdminBevarageDetailsComponent,
    CreateBevarageComponent,
    UpdateBevargeComponent,
    //
    SellsComponent
    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  
  ]
})
export class AdminModule { }
