import { IOcrResult } from './../../blocks/Interface/ocrResult';
import { ITemplate } from './../../blocks/models/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplatesService } from 'app/blocks/services/templates.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppUtils } from 'app/blocks/utils';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-Recognition',
    templateUrl: './Recognition.component.html',
    styleUrls: ['./Recognition.component.scss']
})
export class RecognitionComponent implements OnInit {

    // ViewChild
    @ViewChild('form', { static: true }) public form: NgForm;


    // Private
    private _unsubscribeAll: Subject<any>;
    private TemplatesSubject = new BehaviorSubject<ITemplate[]>([]);
    private ResultSubject = new BehaviorSubject<IOcrResult[]>([]);

    // Public
    templates$: Observable<ITemplate[]> = this.TemplatesSubject.asObservable()
    result$: Observable<IOcrResult[]> = this.ResultSubject.asObservable()
    templateId: string;
    file: File = null;
    preview: any
    isLoading = false;


    constructor(
        private _templatesService: TemplatesService,
        private _snackBar: MatSnackBar,

    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

        // @ Load templates
        this._templatesService
            .getTemplates()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (templates: ITemplate[]) => {
                    if (templates.length)
                        this.TemplatesSubject.next(templates)
                },
                (error) => {
                    console.error("[Error]: ", error)
                    this._snackBar.open('An error occurred.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                }
            )

    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private buildFormData(): FormData {

        var formData = new FormData();

        formData.append('templateId', this.templateId)
        formData.append('file', this.file)
        return formData;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    excute() {
        const isValid = AppUtils.validateForm(this.form, true);
        if (!isValid) return

        let formdata = this.buildFormData();
        this.isLoading = true;
        
        this._templatesService
            .recognize(formdata)
            .subscribe(
                (response) => {
                    console.log("[Result]: ",response)
                    this.ResultSubject.next(response);
                    this.isLoading = false;
                },
                (error) => {
                    console.error(error)
                    this.isLoading = false
                    this._snackBar.open('An error occurred.', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                }
            )
    }

    async addFile(files: File[]) {

        let file = files[0];
        this.file = file;
        this.preview = await this.readURL(file);
    }

    async readURL(file) {
        return new Promise((resolve, reject) => {

            var reader = new FileReader();

            reader.onload = (event: any) => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);

        });
    }

    compareWith(objOne, objTwo) {
        if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined' && objOne != null && objTwo != null) {
            return objOne.id === objTwo.id;
        }
    }

}
