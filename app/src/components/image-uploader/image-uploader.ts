import {Component, ElementRef, Output, EventEmitter, Input} from '@angular/core';

import { LoadingController, Platform } from 'ionic-angular';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { Camera, CameraOptions } from '@ionic-native/camera';

import EXIF from "exif-js"

@Component({
  selector: 'image-uploader',
  templateUrl: 'image-uploader.html'
})
export class ImageUploader {

    @Output() imageChange:EventEmitter<any> = new EventEmitter<any>();
    @Output() tagsChange:EventEmitter<any> = new EventEmitter<any>();

    _image: string = null;
    _tags = {};
    imageRaw: string = null;
    imageOrientation: number = 0;
    loading: any = null;

    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 1024,
        resizeMaxWidth: 1024
    };

    constructor(
        private element: ElementRef,
        public loadingCtrl: LoadingController,
        public platform: Platform,
        private camera: Camera
    ) {
        // nothing
    }

    @Input()
    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
        this.imageChange.emit(this._image);
    }

    @Input()
    get tags() {
        return this._tags;
    }

    set tags(value) {
        this._tags = value;
        this.tagsChange.emit(this._tags);
    }

    get isCordova(): boolean {
        return this.platform.is('cordova');
    }

    takePictureNative() {
        let options: CameraOptions = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetHeight: 1024,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64:
         this.image = 'data:image/jpeg;base64,' + imageData;

         this.element.nativeElement.querySelector('.uploaded-image').src = this.image;
        }, (err) => {
         // Handle error
        });
    }

    imageChanged(event: any) {
        // reset image if none was selected
        if (event.target.files.length == 0) {
            let image = this.element.nativeElement.querySelector('.uploaded-image');
            image.src = "";
            this.imageRaw = null;
            this.image = null;
        } else {
            // show image processing message (resize takes a while)
            this.loading = this.loadingCtrl.create({
                content: 'Bild wird geladen ...'
            });
            this.loading.present();
        }
    }

    imageSelected(imageResult: ImageResult) {
        // hide image processing message
        this.loading.dismiss();

        let image = this.element.nativeElement.querySelector('.uploaded-image');

        this.image = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;

        image.src = imageResult.dataURL;
        this.imageRaw = imageResult.dataURL;
        this.readOrientation();
    }

    readOrientation() {
        let img: any = document.getElementById("uploaded-image");
        // clear exif cache
        delete img.exifdata;

        let self = this;
        EXIF.getData(img, function() {
            self.tags = EXIF.getAllTags(this);
            self.imageOrientation = EXIF.getTag(this, "Orientation");
        });
    }
}
