import { NewTemplateComponent } from './new-template/new-template.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplatesRoutingModule } from './templates-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedMaterialModule } from 'app/blocks/common/material-shared-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecognitionComponent } from './Recognition/Recognition.component';
import { MdcDirectivesModule } from 'app/blocks/directives/directives-module';
@NgModule({
    declarations: [
        TemplatesComponent,
        NewTemplateComponent,
        RecognitionComponent
    ],
    imports: [
        FuseSharedModule,
        SharedMaterialModule,
        TemplatesRoutingModule,
        ImageCropperModule,
        FlexLayoutModule,
        MdcDirectivesModule

    ],

})
export class TemplatesModule { }
