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
      console.log('search performed', data);
      this.finished = false;
      this.picturesCount = 0;
      this.searchKey = data.search;
      this.updatePictures();
    });

    this.picturesService.getPictures(this.picturesCount, this.searchKey)
    .subscribe( ( picturesResponse: any[])=> {

      this.pictures = picturesResponse;

    }, () => {}, () => {});
    // this.pictures = this.picturesService.getPictures();


    this.picturesService.newPictureSaved.subscribe((data) => {
      console.log('new picyure saved', data);
      this.prependPicture(data);
    });
  }

  private addMorePictures() {

    if(this.finished) {
      return;
    } else {
      console.log('old value this.picturesCount', this.picturesCount);
      this.picturesCount = this.picturesCount + 7;
      console.log('this.picturesCount ', this.picturesCount);
      this.picturesService.getPictures(this.picturesCount, this.searchKey)
      .subscribe( ( picturesResponse: any[])=> {
        if(!picturesResponse.length) {
          this.finished = true;
          return;
        }
        this.pictures.push(...picturesResponse);
      }, () => {}, () => {});
    }

  }

  private updatePictures() {

    if(this.finished) {
      return;
    } else {

      console.log('this.picturesCount ', this.picturesCount);
      this.picturesService.getPictures(this.picturesCount, this.searchKey)
      .subscribe( ( picturesResponse: any[])=> {

          this.pictures = picturesResponse;
          if(!picturesResponse.length) {
            this.finished = true;
            return;
          }

      }, () => {}, () => {});
    }

  }

  onScroll(){
    console.log("=================");
    this.addMorePictures();
  }

  private prependPicture(picture) {
    console.log('added', this.pictures);

     this.pictures.unshift(picture);

  }

}
