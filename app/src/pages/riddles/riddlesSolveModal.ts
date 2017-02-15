import { Component, ElementRef } from '@angular/core';

import { ViewController, NavParams, LoadingController } from 'ionic-angular';

import {Riddle} from "../../interfaces/riddle";
import {RiddleService} from "../../services/riddle.service";
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

import EXIF from "exif-js"

@Component({
  selector: 'modal-riddles-solve',
  templateUrl: 'riddles-solve.html'
})
export class RiddlesSolveModalPage {

    riddleId: number;
    riddles: { [id: number]: Riddle; } = { };
    answer: string = '';
    answered: boolean = false;
    response: any;
    imageData: string = null;
    imageDataResized: string = null;
    imageOrientation: number = 0;
    tags = {};

    constructor(private riddleService:RiddleService,
                public params: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController,
                private element: ElementRef
    ) {
        this.riddleId = params.get('riddleId');

        riddleService.riddles.subscribe((riddles: Array<Riddle>) => {
            this.riddlesUpdated(riddles);
        });
    }

    riddlesUpdated(riddles: Array<Riddle>): void {
        this.riddles = {};
        for (let riddle of riddles) {
            this.riddles[riddle.r_ID] = riddle;
        }
    }

    solveRiddle(): void {
        let loading = this.loadingCtrl.create({
            content: 'Rätsel lösen ...'
        });
        loading.present();
        this.riddleService.solveRiddle(this.riddleId, this.answer, this.imageDataResized, this.tags)
            .then((response) => {
                this.answered = true;
                this.response = response;
                loading.dismiss();
            })
            .catch((response) => {
                this.answered = true;
                this.response = response;
                loading.dismiss();
            })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    imageChanged(event: any) {
        // reset image if none was selected
        if (event.target.files.length == 0) {
            let image = this.element.nativeElement.querySelector('.uploaded-image');
            image.src = "";
            this.imageData = null;
            this.imageDataResized = null;
        }
    }

    readOrientation() {
        let img: any = document.getElementById("uploaded-image");
        // clear exif cache
        delete img.exifdata;

        let self = this;
        EXIF.getData(img, function() {
            //self.tags = EXIF.getAllTags(this);
            self.imageOrientation = EXIF.getTag(this, "Orientation");
        });
    }

    imageSelected(imageResult: ImageResult) {
        let image = this.element.nativeElement.querySelector('.uploaded-image');

        this.imageDataResized = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;

        image.src = imageResult.dataURL;
        this.imageData = imageResult.dataURL;
        this.readOrientation();
    }
}
