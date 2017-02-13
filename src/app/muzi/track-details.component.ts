import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Track, Genre} from "./entities/track.entity";
import {MuziService} from "./services/muzi.service";
import {ListResponseEntity} from "./entities/response.entity";
import {Observable} from "rxjs";

@Component({
  templateUrl: 'templates/track-details.template.html',
  styleUrls: ['css/track-detail.style.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrackDetailComponent implements OnInit{

  track: Track;
  old: Track;
  changed: boolean;

  genres: any = [];

  message: string;

  selectedGenre: any;


  constructor(
    private route: ActivatedRoute,
    private muziService: MuziService,
    private router: Router
  ) {}

  ngOnInit() {
    let trackID: number = null;
    this.route.params.subscribe(
      params => trackID = +params['id']
    );

    this.muziService.getTrackByID(trackID)
          .subscribe(
            res => {
              this.track = <Track>res;
              // console.log(this.track)
            },
            // res => console.log(res),
            () => console.log('some error'),
            () => {
              this.resetOldTrack();

              // TODO clear mess
              // console.log('printing old');
              // console.log(this.old)
            }
          );

    /*
     * GenreList is fetched if the user wishes to add genre list.
     */
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
          console.log('all is well here');
        }
      )

  }


  resetOldTrack() {
    this.old = <Track>JSON.parse(JSON.stringify(this.track));
  }


  isEqual(track1: Track, track2: Track) : boolean {
    if(track2.title!=track1.title)
      return false;
    if(track2.rating!=track1.rating)
      return false;

    return track2.genres.length == track1.genres.length;  // TODO implement genre effective comparision.
  }

  /*
   * If track is changed then it sets titleChanged to true.
   */
  trackChanged()  {

    this.changed = !(this.isEqual(this.old, this.track));

  }

  /*
   * updates Track.
   */
  updateTrack() {
    this.muziService.updateTrack(this.track)
      .subscribe(
        res => console.log(res),
        () => console.log('some error'),
        () => {

          console.log('success');
          this.message='updated.';
          this.resetOldTrack();
          this.changed=false;

        }
      )
  }


  goToTrackList() {
    this.router.navigate(['/tracks']);
  }


  /* removes genre from this track. */
  removeGenre(genre: Genre) {
    // console.log('deleting genre');

    let index = this.track.genres.indexOf(genre, 0);
    if (index > -1) {
       this.track.genres.splice(index, 1);
    }
    this.trackChanged();

    // TODO clear mess
    console.log(genre);
    console.log(this.track.genres);

  }


  /* deletes track and navigates to tracks */
  delTrack(track: Track) {
    // TODO clear mess
    this.muziService.delTrackByID(track.id)
      .subscribe(
        res => console.log('deleted'),
        () => console.log('error deleting track'),
        () => { console.log('delete complete');}
      );
    this.router.navigate(['tracks']);

  }

  hideSuccessMessage() {
    this.message = null;
  }

  json(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }


  selectGenre() {
    let sGen = <Genre>this.selectedGenre;
    for (let genre of this.track.genres){
      if(sGen.name == genre.name){
        this.selectedGenre = null;
        return;
      }
    }

    this.track.genres.push(sGen);
    this.trackChanged();
    this.selectedGenre = null;
  }

}
