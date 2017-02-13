import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Track, Genre} from "./entities/track.entity";
import {MuziService} from "./services/muzi.service";
import {ListResponseEntity} from "./entities/response.entity";
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'templates/add-track.template.html',
  styleUrls: ['css/track-detail.style.css'],

})
export class NewTrackComponent implements OnInit{

  title: string = "";

  genres: any = [];

  message: string;

  selectedGenre: any;

  selectedGenres: any = [];

  constructor(
    private  http: Http,
    private route: ActivatedRoute,
    private muziService: MuziService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchGenreList();
  }

  fetchGenreList() {
    this.muziService.getGenreList()
      .subscribe(
        res => {
          let genres = <ListResponseEntity<Genre> >res;

          /* converts genres into json */
          Observable.from(genres.results)
            .map(genre => this.json(genre))
            .subscribe(genr => this.genres.push(genr));
        },
        () => console.log('some error'),
        () => {
          console.log(this.genres);
          console.log('all is well here');
        }
      )

  }

  /* removes genre from this track. */
  removeGenre(genre: Genre) {

    let index = this.selectedGenres.indexOf(genre, 0);
    if (index > -1) {
       this.selectedGenres.splice(index, 1);
    }

  }


  json(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }


  selectGenre() {
    let sGen = this.selectedGenre;
    for (let genre of this.selectedGenres){
      if(sGen.name == genre.name){
        this.selectedGenre = null;
        return;
      }
    }

    this.selectedGenres.push(sGen);
    this.selectedGenre = null;
  }


  createTrack() {
    let newTrack: Track;
    if(this.title.trim().length==0){
      this.message = "Title Cannot be blank.";
      return;
    }

    this.muziService.createTrack(this.title, this.selectedGenres)
      .subscribe(
        res => {
          newTrack = <Track>res;
          console.log(newTrack);
        },
        () => console.log('some error'),
        () => {
          // console.log('successful');
          this.router.navigate(['track', newTrack.id]);
        }
      )
  }

  hideMessage(){
    this.message = null;
  }


}
