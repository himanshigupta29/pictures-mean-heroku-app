import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { Picture } from './picture.model';
import { PicturesService } from './picture.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  pictures: Picture[];
  constructor(private picturesService: PicturesService) { }
  finished: boolean;
  picturesCount: number;
  searchKey: string;

  ngOnInit() {

    this.finished = false;
    this.picturesCount = 0;
    this.searchKey = '';
    this.pictures = [];

    this.picturesService.searchPictures.subscribe((data) => {
      this.finished = false;
      this.picturesCount = 0;
      this.searchKey = data.search;
      this.updatePictures();
    });

    this.picturesService.getPictures(this.picturesCount, this.searchKey)
    .subscribe( ( picturesResponse: any[])=> {

      this.pictures = picturesResponse;
      if(picturesResponse.length < 7) {
        this.finished = true;
        return;
      }

    }, () => {}, () => {});
    // this.pictures = this.picturesService.getPictures();


    this.picturesService.newPictureSaved.subscribe((data) => {
      this.prependPicture(data);
    });
  }

  private addMorePictures() {

    if(this.finished) {
      return;
    } else {

      this.picturesCount = this.picturesCount + 7;

      this.picturesService.getPictures(this.picturesCount, this.searchKey)
      .subscribe( ( picturesResponse: any[])=> {

        this.pictures.push(...picturesResponse);
        if(picturesResponse.length < 7) {
          this.finished = true;
        }

      }, () => {}, () => {});
    }

  }

  private updatePictures() {

    if(this.finished) {
      return;
    } else {

      this.picturesService.getPictures(this.picturesCount, this.searchKey)
      .subscribe( ( picturesResponse: any[])=> {

          this.pictures = picturesResponse;
          if(picturesResponse.length < 7) {
            this.finished = true;

          }

      }, () => {}, () => {});
    }

  }

  onScroll(){
    this.addMorePictures();
  }

  private prependPicture(picture) {
     this.pictures.unshift(picture);
  }

}
