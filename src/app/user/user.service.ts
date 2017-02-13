import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {UserList} from "./user.entity";

@Injectable()
export class UserService {

  private url = 'http://localhost:8000/api/v0/profiles/test/';

  constructor(private  http: Http) {}

  getUserList(): Observable<UserList> {

    // console.log('user service called');
    return this.http.get(this.url)
      .map(res => res.json());
  }
  // getUserList() {
  //   return [];
  // }
}
