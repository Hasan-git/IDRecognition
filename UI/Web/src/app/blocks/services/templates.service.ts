import { IOcrResult } from './../Interface/ocrResult';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITemplate } from '../models/template';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {

    private backendUrl: string = environment.backendUrl;

    constructor(
        private httpClient: HttpClient
    ) { }

    getTemplates(): Observable<ITemplate[]> {
        return this.httpClient.get<ITemplate[]>(`${this.backendUrl}/api/templates`);
    }

    createTemplate(template) {
        return this.httpClient.post<ITemplate>(`${this.backendUrl}/api/templates`, template)
    }

    recognize(template) {
        return this.httpClient.post<IOcrResult[]>(`${this.backendUrl}/api/templates/recognize`, template)
    }
}
