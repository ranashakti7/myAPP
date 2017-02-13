import { Component } from '@angular/core';
import { Router } from '@angular/router';
import "rxjs/add/operator/switchMap";

import {MuziService} from "./services/muzi.service";
import {Genre} from "./entities/track.entity";
import {ListResponseEntity} from "./entities/response.entity";

@Component({
  templateUrl: 'templates/genre-list.template.html'
})
export class GenreListComponent {
  genreList: ListResponseEntity<Genre>;
  genres: Genre [];
  next: string;
  prev: string;

  private selectedGenreID: number;

  constructor(
    private muziService: MuziService,
    private router: Router
  ){}


  ngOnInit() {
    this.fetchGenreList();
  }

  fetchPrev() {
    if(this.prev)
      this.fetchGenreList(this.prev);
  }

  fetchNext() {
    if(this.next)
      this.fetchGenreList(this.next);
  }

  fetchGenreList(url: string = null) {
    this.muziService.getGenreList(url)
      .subscribe(
        res => this.genreList = <ListResponseEntity<Genre> >res,
        // res => console.log(res),
        () => console.log('some error'),
        () => this.unWrapGenreList()
      )
  }

  unWrapGenreList() {
    this.genres = this.genreList.results;
    this.prev = this.genreList.previous;
    this.next = this.genreList.next;

    // console.log(this.prev);
  }
  newGenre: string;

  addGenre() {
    if(this.newGenre && this.newGenre.trim().length>0){
      this.muziService.addGenre(this.newGenre)
        .subscribe(
          res => {
            this.genres.push(<Genre>res);
          },
          () => console.log('some error'),
          () => console.log('success')
        )
    }
    this.newGenre = null;
  }

  removeGenre(genre: Genre) {

    // this.muziService.delGenre(genre)
    //   .subscribe(
    //     () => {},
    //     () => console.log('some error'),
    //     () => {
    //       let index = this.genres.indexOf(genre);
    //       if(index>0)
    //         this.genres.splice(index);
    //     }
    //   )
  }

  onSelect(genre: Genre) {
    console.log(genre);
  }

}

