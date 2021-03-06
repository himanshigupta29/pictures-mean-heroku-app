import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { UploadService } from './common/upload.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PicturesComponent } from './pictures/pictures.component';

import { LoaderComponent } from './loader/loader.component';

import { PicturesService } from './pictures/picture.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PicturesComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InfiniteScrollModule,
    FormsModule
  ],
  providers: [PicturesService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
