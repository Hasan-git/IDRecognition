import { NewTemplateComponent } from './new-template/new-template.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecognitionComponent } from './Recognition/Recognition.component';

const routes: Routes = [
    {
        path: 'new-template',
        component: NewTemplateComponent,
    },
    {
        path: 'recognition',
        component: RecognitionComponent,
    },
    { path: '', redirectTo: '/templates/new-template', pathMatch: 'full' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TemplatesRoutingModule { }
