import { ITemplate } from './../../blocks/models/template';
import { Dimension, IDimension } from './../../blocks/models/dimension';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Template } from 'app/blocks/models/template';
import { ISnippet } from 'app/blocks/models/snippet';
import { TemplatesService } from 'app/blocks/services/templates.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AppUtils } from 'app/blocks/utils';
import { Observable, fromEvent } from 'rxjs';
import { take, map } from 'rxjs/operators';


interface ISnippetViewModel extends ISnippet {
    imageBase64: string | null
}

@Component({
    selector: 'app-new-template',
    templateUrl: './new-template.component.html',
    styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit {

    // ViewChild
    @ViewChild('form', { static: true }) public form: NgForm;

    // Public
    isImageLoaded = false;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    template: Template = new Template();
    snippets: ISnippetViewModel[] = [];
    metadataCtrl: string = ''
    imageCroppedEvent: ImageCroppedEvent = null;

    constructor(
        private _templatesService: TemplatesService,
        private _snackBar: MatSnackBar,
        private _router: Router,
    ) { }

    ngOnInit() {
    }

    async fileChangeEvent(event: any): Promise<void> {
        this.imageChangedEvent = event;
        this.setImageSize(event);
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.imageCroppedEvent = event;
    }
    imageLoaded() {
        this.isImageLoaded = true
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    //-----------------------------------------------------------------
    //    Public methods
    //-----------------------------------------------------------------

    save() {

        // @ Validate form
        const isValid = AppUtils.validateForm(this.form, true);
        if (!isValid) {
            this._snackBar.open('Some fields are required.', 'CLOSE', {
                panelClass: 'm-24',
                duration: 3000,
            });
            return;
        } else if (this.snippets.length == 0) {
            this._snackBar.open('At least one snippet is required.', 'CLOSE', {
                panelClass: 'm-24',
                duration: 5000,
            });
            return;
        }

        let template = this.processTemplate();

        this._templatesService
            .createTemplate(template)
            .subscribe(
                (response) => {
                    console.log(response)
                    this._snackBar.open('Template created.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                    this._router.navigate(['templates/recognition'])
                },
                (error) => {
                    console.error("[Error]: ", error)
                    this._snackBar.open('An error occurred.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                });
    }

    addSnippet() {

        // @ Metadata field is required
        if (!this.metadataCtrl) {
            this._snackBar.open('Metadata field is required.', 'CLOSE', {
                panelClass: 'm-24',
                duration: 3000,
            });

            return;
        }

        let imageDimension = this.getCroppedDimension();

        let snippet: ISnippetViewModel = {
            dimensions: imageDimension,
            imageBase64: this.imageCroppedEvent.base64,
            metadata: this.metadataCtrl
        }
        this.snippets.push(snippet)
        this.metadataCtrl = ''
    }

    removeSnippet(i) {
        this.snippets.splice(i, 1)
    }


    //-----------------------------------------------------------------
    //    Private methods
    //-----------------------------------------------------------------

    // @ Get dimensions from cropped image
    private getCroppedDimension(): IDimension {

        if (!this.imageCroppedEvent) return null

        let dimension = new Dimension
            (
                this.imageCroppedEvent.imagePosition.x1,
                this.imageCroppedEvent.imagePosition.y1,
                this.imageCroppedEvent.width,
                this.imageCroppedEvent.height
            );

        return dimension
    }

    private processTemplate(): ITemplate {

        // @ Delete imageBase64 property
        let processedSnippets: ISnippet[] = _.map(this.snippets, (snippet) => _.omit(snippet, "imageBase64"));

        let template: ITemplate = Object.assign({}, this.template)
        template.snippets = processedSnippets;

        return template
    }

    

    /**
     * @ Remark : Set template image width and height
     * 
     * @private
     * @param {any} event 
     * 
     * @memberOf NewTemplateComponent
     */
    private setImageSize(event) {

        let image: any = event.target.files[0];

        let reader = new FileReader();
        reader.onload = () => { // when file has loaded

            var img = new Image();
            img.onload = () => {
                this.template.width = img.width;
                this.template.height = img.height;
            };

            img.src = reader.result as string;
        }
        reader.readAsDataURL(image);
    }
}
