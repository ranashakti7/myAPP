import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {UserList} from "./user.entity";
import {UserService} from "./user.service";
import {Subject} from "rxjs";

@Component({
  templateUrl: './user.component.html'
})
export class UserListComponent implements OnInit{
  userList: UserList;

  private pageStream = new Subject<number>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.userService.getUserList()
      .subscribe(
        res => this.userList =<UserList>res,
        err => console.log(err.status),
        () => console.log(this.userList.results)
      );

  }


}
