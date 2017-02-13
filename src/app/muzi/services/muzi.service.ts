import {Injectable} from "@angular/core";
import {Http, URLSearchParams, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Track, Genre} from "../entities/track.entity";
import {ListResponseEntity} from "../entities/response.entity";

@Injectable()
export class MuziService {
  // private trackUrl = 'http://104.197.128.152:8000/v1/tracks'; // TODO add interceptor for requests instead for base trackUrl.
  private trackUrl = 'http://localhost:8000/api/v0/muzi/tracks/';
  // private genreUrl = 'http://104.197.128.152:8000/v1/genres';
  private genreUrl = 'http://localhost:8000/api/v0/muzi/genres';
  constructor(private http: Http) {
  }

  /*
   * Fetches and returns track list.
   */
  // TODO make it compatible for search
  getTrackList(url: string = null): Observable<ListResponseEntity<Track> > {
    if(!url) url = this.trackUrl;
    return this.http.get(url).map(res => res.json());

  }

  /*
   * Fetches a single track details.
   */
  getTrackByID(id: number): Observable<Track> {
    // TODO Hard coded.
    // return this.http.get('http://104.197.128.152:8000/v1/tracks/'+String(id)).map(res => res.json());
    return this.http.get('http://localhost:8000/api/v0/muzi/track/'+String(id)).map(res => res.json());
  }

  /*
   * Deletes Track.
   */
  delTrackByID(id: number) {
    // TODO finish me
    return this.http.delete(
      'http://localhost:8000/api/v0/muzi/track/'+String(id)
    )
      .map( res => res.json());

  }

  /*
   * Update Track.
   */
  updateTrack(track: Track) : Observable<Track> {

    let genres = track.genres.map((genre) => (genre.id));
    let payload = JSON.parse(JSON.stringify(track));
    payload.genres = genres;

    // TODO Hard Coded
    return this.http.post(
      // 'http://104.197.128.152:8000/v1/tracks/'+String(track.id),
      'http://localhost:8000/api/v0/muzi/track/'+String(track.id),
      payload
    )
      .map( res => res.json());

  }

  /*
   * Search Track.
   */
  searchTrack(searchStr: string) : Observable<ListResponseEntity<Track>> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('title', searchStr);

    return this.http.get(
      // 'http://104.197.128.152:8000/v1/tracks',
      this.trackUrl,
      {
        search: params
      })
      .map(res => res.json());

  }

  createTrack(title: string, genres: any) : Observable<Track> {
    let _genres = genres.map((genre) => (genre.id));
    let payload = { title: title, genres: _genres, rating: 0.0};

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    console.log(payload);

    return this.http.post(
      // "http://104.197.128.152:8000/v1/tracks",
      this.trackUrl,
      payload,
      options
    )
      .map( res => res.json());

  }

  /*
   * Fetches and returns genre list.
   */
  getGenreList(url: string = null) : Observable<ListResponseEntity<Genre>> {
    if(!url)
      url = this.genreUrl;

    return this.http.get(url).map(res => res.json());
  }

  delGenre(genre: Genre) : Observable<any> {
    return this.http.delete(
      'http://localhost:8000/api/v0/muzi/genre/'+String(genre.id)
    )
      .map( res => res.json());
  }

  addGenre(genre: string) : Observable<Genre> {
    return this.http.post(this.genreUrl, {name: genre})
      .map( res => res.json());
  }



}
