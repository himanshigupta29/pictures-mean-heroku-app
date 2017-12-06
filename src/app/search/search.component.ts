import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UploadService } from '../common/upload.service';
import { PicturesService } from '../pictures/picture.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  uploadModalOpen: boolean;
  elem: ElementRef;
  tags: string[];
  newTag: string;
  imageUploaded: boolean;
  searchKey: string;
  newPictureUrl: string;

  @ViewChild('selectedImageFile') selectedImageFile: ElementRef;

  constructor(private uploadService: UploadService,
  private pictureService: PicturesService) { }

  ngOnInit() {
    this.uploadModalOpen = false;
    this.tags = [];
    this.imageUploaded = false;
    this.newTag = '';

  }

  addTags(){
    if(this.newTag !== '') {
        this.tags.push(this.newTag);
        this.newTag = '';
    }

  }

  performSearch() {
    console.log('searchKey', this.searchKey);
    this.pictureService.searchPictures.emit({search: this.searchKey});
  }

  findtags(){
    console.log('tags', this.tags);
  }

  removeTag(index: number){
    console.log('tags', this.tags);
    this.tags.splice(index, 1);
  }

  onCloseUploadModal() {
    this.uploadModalOpen = false;
  }

  onOpenUploadModal() {
      this.uploadModalOpen = true;
      this.tags = [];
      this.imageUploaded = false;
      this.newTag = '';
  }

  OnSavePicture() {
    const picture = {
      url: this.newPictureUrl,
      tags: this.tags
    }
    this.uploadService.savePicture(picture).subscribe( (data) => {

      console.log('image saved successfully', data);
      this.onCloseUploadModal();
      this.pictureService.newPictureSaved.emit(
        {
          url: data.url,
          tags: data.tags
        }
      );
    });
  }

  uploadImage(form: NgForm) {

    let files = this.selectedImageFile.nativeElement.files;

    if(!files.length) {
      return;
    }

    let file = files[0];

    let formData = new FormData();

    formData.append('selectFile', file, file.name);

    this.uploadService.getS3SignedUrl(file.name).subscribe(
      (data) => {

        const postUrl = data.postURL;
        const getUrl = data.getURL;
            this.uploadService.uploadImageToS3(postUrl, file).subscribe(
              (data) => {
                console.log('image uploaded successfully', data);
                    form.reset();
                    this.imageUploaded = true;
                    this.newPictureUrl = getUrl;
              },
              () => {},
              () => {
              }
            );
      },
      () => {},
      () => {}
    );


  }

  // onSubmit(formData: NgForm) {
  //
  //   console.log('on submitted !!!! ', formData);
  //
  // }

}
