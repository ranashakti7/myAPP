import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import {UserListComponent} from "./user.component";

const muziRoutes: Routes = [
  { path: 'users', component: UserListComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(muziRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRouter {

}
