import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from './user.service';

import { UserListComponent } from './user.component';

import { UserRouter } from './user.router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRouter
  ],
  declarations: [
    UserListComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }


