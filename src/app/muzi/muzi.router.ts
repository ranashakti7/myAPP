import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import { TrackListComponent } from './track-list.component';
import { TrackDetailComponent } from './track-details.component';
import {GenreListComponent} from "./genre-list.component";
import {NewTrackComponent} from "./add-track.component";

const muziRoutes: Routes = [
  { path: 'tracks', component: TrackListComponent },
  { path: 'track/:id', component: TrackDetailComponent },
  { path: 'add-track', component: NewTrackComponent},
  // { path: 'search/:title', component:  },
  { path: 'genres', component: GenreListComponent }
  // { path: 'genre/:id', component: }
];

@NgModule({
  imports: [
    RouterModule.forChild(muziRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MuziRouter {

}
