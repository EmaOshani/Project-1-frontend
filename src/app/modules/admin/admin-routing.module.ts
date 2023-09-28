import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { ApizzaListComponent } from './components/admin-foods/admin-pizza/apizza-list/apizza-list.component';
import { AdminBurgerListComponent } from './components/admin-foods/admin-burger/admin-burger-list/admin-burger-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PendingComponent } from './components/admin-dashboard/pending/pending.component';
import { ComfiremComponent } from './components/admin-dashboard/comfirem/comfirem.component';
import { CancelComponent } from './components/admin-dashboard/cancel/cancel.component';
import { PopupBillComponent } from './components/admin-dashboard/comfirem/popup-bill/popup-bill.component';
import { CreatePizzaComponent } from './components/admin-foods/admin-pizza/create-pizza/create-pizza.component';
import { UpdatePizzaComponent } from './components/admin-foods/admin-pizza/update-pizza/update-pizza.component';
import { ApizzaDetailsComponent } from './components/admin-foods/admin-pizza/apizza-details/apizza-details.component';
import { CreateBurgerComponent } from './components/admin-foods/admin-burger/create-burger/create-burger.component';
import { UpdateBurgerComponent } from './components/admin-foods/admin-burger/update-burger/update-burger.component';
import { AdminBurgerDetailsComponent } from './components/admin-foods/admin-burger/admin-burger-details/admin-burger-details.component';
import { DessertListComponent } from './components/admin-foods/admin-dessert/dessert-list/dessert-list.component';
import { CreateDessertComponent } from './components/admin-foods/admin-dessert/create-dessert/create-dessert.component';
import { UpdateDessertComponent } from './components/admin-foods/admin-dessert/update-dessert/update-dessert.component';
import { DessertDetailsComponent } from './components/admin-foods/admin-dessert/dessert-details/dessert-details.component';
import { AdminSubmarineListComponent } from './components/admin-foods/admin-submarine/admin-submarine-list/admin-submarine-list.component';
import { CreateSubmaineComponent } from './components/admin-foods/admin-submarine/create-submaine/create-submaine.component';
import { UpdateSubmarineComponent } from './components/admin-foods/admin-submarine/update-submarine/update-submarine.component';
import { AdminSubmarineDetailsComponent } from './components/admin-foods/admin-submarine/admin-submarine-details/admin-submarine-details.component';
import { AdminCrispyListComponent } from './components/admin-foods/admin-crispy/admin-crispy-list/admin-crispy-list.component';
import { CreateCrispyComponent } from './components/admin-foods/admin-crispy/create-crispy/create-crispy.component';
import { UpdateCrispyComponent } from './components/admin-foods/admin-crispy/update-crispy/update-crispy.component';
import { AdminCrispyDetailsComponent } from './components/admin-foods/admin-crispy/admin-crispy-details/admin-crispy-details.component';
import { AdminBevarageListComponent } from './components/admin-foods/admin-bevarage/admin-bevarage-list/admin-bevarage-list.component';
import { CreateBevarageComponent } from './components/admin-foods/admin-bevarage/create-bevarage/create-bevarage.component';
import { UpdateBevargeComponent } from './components/admin-foods/admin-bevarage/update-bevarge/update-bevarge.component';
import { AdminBevarageDetailsComponent } from './components/admin-foods/admin-bevarage/admin-bevarage-details/admin-bevarage-details.component';
import { SellsComponent } from './components/admin-dashboard/sells/sells.component';

const routes: Routes = [

  //admin 


  {path : '', component: AdminMenuComponent, children:[

    {path : '' , redirectTo : 'dashboard' , pathMatch : 'full'},
    {path: 'pizzas', component :  ApizzaListComponent},
    {path : 'burgers' , component: AdminBurgerListComponent},
    {path: 'desserts', component: DessertListComponent},
    {path: 'submarines' , component:AdminSubmarineListComponent},
    {path: 'crispy' , component: AdminCrispyListComponent},
    {path: 'bevarages' , component: AdminBevarageListComponent},
    {path : 'dashboard' , component : AdminDashboardComponent},
    {path : 'dashboard/pending' , component: PendingComponent},
    {path : 'dashboard/confirme' , component : ComfiremComponent},
    {path : 'dashboard/cancel' , component : CancelComponent},
    {path: 'dashboard/report' , component: SellsComponent},
    {path : 'dashboard/confirme/popupbill/:id' , component : PopupBillComponent},

  ]},

  //pizza
{path : 'create-pizza' , component: CreatePizzaComponent},
{path : 'update-pizza/:id' , component: UpdatePizzaComponent},
{path : 'pizza-details/:id' , component: ApizzaDetailsComponent},

//burger
{path : 'create-burger' , component : CreateBurgerComponent},
{path : 'update-burger/:id' , component : UpdateBurgerComponent},
{path : 'burger-details/:id' , component: AdminBurgerDetailsComponent},

//dessert
{path: 'create-dessert' , component: CreateDessertComponent},
{path: 'update-dessert/:id' , component : UpdateDessertComponent},
{path : 'dessert-details/:id' , component : DessertDetailsComponent},

//submarine
{path: 'create-submarine' , component: CreateSubmaineComponent},
{path: 'update-submarine/:id' , component: UpdateSubmarineComponent},
{path: 'submarine-details/:id' , component: AdminSubmarineDetailsComponent},

//crispyChicken
{path: 'create-crispy' , component: CreateCrispyComponent},
{path: 'update-crispy/:id' , component: UpdateCrispyComponent},
{path: 'crispy-details/:id' , component: AdminCrispyDetailsComponent},

//bevarage
{path: 'create-bevarage', component: CreateBevarageComponent},
{path: 'update-bevarage/:id' , component: UpdateBevargeComponent},
{path: 'bevarage-details/:id' , component: AdminBevarageDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {


  
 }
