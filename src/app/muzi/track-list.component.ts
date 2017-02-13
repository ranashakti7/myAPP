/* tracklist component*/

import {Component} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Track} from "./entities/track.entity";
import {MuziService} from "./services/muzi.service";
import {ListResponseEntity} from "./entities/response.entity";

@Component({
  templateUrl: 'templates/track-list.template.html',
  styleUrls: ['css/search-bar.style.css']
})
export class TrackListComponent  {

  trackList: ListResponseEntity<Track>;
  tracks: Track [];
  prev: string;
  next: string;

  searchText: string = '';


  private selectedTrackID: number;

  constructor(
    private muziService: MuziService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchTrackList();
  }

  fetchPrev() {
    if(this.prev)
      this.fetchTrackList(this.prev);
  }

  fetchNext() {
    if(this.next)
      this.fetchTrackList(this.next);
  }

  fetchTrackList(url: string = null) {
    this.muziService.getTrackList(url)
      .subscribe(
        res => this.trackList = <ListResponseEntity<Track>>res,
        // res => console.log(res),
        () => console.log('some error'),
        () => this.unWrapTrackList()
      )
  }

  /*
   * Search Track by title.
   *
   * TODO improvement required.
   */
  searchTrack(searchStr: string) {
    console.log(searchStr.trim().length);
    console.log(searchStr);
    console.log('here');

    this.muziService.searchTrack(searchStr.trim())
      .subscribe(
        res => this.trackList = <ListResponseEntity<Track>>res,
        () => console.log('some error'),
        () => {
          // if(this.trackList.count>0)
            this.unWrapTrackList();
          // else this.fetchTrackList();
          console.log(this.trackList);
        }
      )
  }

  unWrapTrackList() {
    this.tracks = this.trackList.results;
    this.prev = this.trackList.previous;
    this.next = this.trackList.next;

    // console.log(this.prev);
  }

  isSelected(track: Track) {
    // return track.id == this.selectedTrackId;
    return true;
  }

  onSelect(track: Track) {
    // console.log(track.id);
    this.router.navigate(['track', track.id]);
  }



}
