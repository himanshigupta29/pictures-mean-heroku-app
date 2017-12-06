import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

import { Picture } from './picture.model';

@Injectable()
export class PicturesService {

    private pictures: any[];
    searchPictures = new EventEmitter<{search: string}>();
    newPictureSaved = new EventEmitter<{url: string, tags: string[]}>();

    constructor(private http: Http) {

    }

    getPictures(skip: number, searchKey: string) {

      const url = 'api/products/' + skip + '/?searchkey=' + searchKey;

      return this.http.get(url)
      .map(
        (response: Response) => {
          const data =  response.json();

          return data;
        }
      );

    }

}
