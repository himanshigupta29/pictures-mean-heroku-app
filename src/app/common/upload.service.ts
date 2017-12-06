import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import 'rxjs/Rx';

@Injectable()
export class UploadService {
  constructor(private http: Http) {}

  uploadDtata(formData: any) {

    return this.http.post('api/upload/', formData)
    .map(
      (response: Response) => {
        const data =  response.json();
        return data;
      }
    );


  }

  getS3SignedUrl(name: string){

    const url = 'api/get_signed_url/?name=' + name;

    return this.http.get(url)
    .map(
      (response: Response) => {
        const data =  response.json();
        return data;
      }
    );

  }

  uploadImageToS3(uploadUrl, file: File){

    let headers: any = new Headers();
        headers.append('Content-Type', 'image/jpeg');

        var moptions = new RequestOptions({ headers: headers });

       return this.http.put(uploadUrl, file, moptions)
          .map((response: Response) => {
          //  console.log('mmmmmmmmmmmm');
              //  const data =  response.json();
                return '';
          });

  }

  savePicture(picture) {

    return this.http.post('api/products/', picture)
    .map(
      (response: Response) => {
        const data =  response.json();
        return data;
      }
    );

  }


}
