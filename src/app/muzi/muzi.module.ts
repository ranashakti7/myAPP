import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MuziService } from './services/muzi.service';

import { TrackListComponent } from './track-list.component';
import { TrackDetailComponent } from './track-details.component';
import { NewTrackComponent } from './add-track.component';


import { MuziRouter } from './muzi.router';
import {GenreListComponent} from "./genre-list.component";


import { Ng2AutoCompleteModule } from 'ng2-auto-complete';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MuziRouter,
    Ng2AutoCompleteModule
  ],
  declarations: [
    TrackListComponent,
    TrackDetailComponent,
    GenreListComponent,
    NewTrackComponent
  ],
  providers: [
    MuziService
  ]
})
export class MuziModule { }


