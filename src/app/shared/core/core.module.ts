import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        LoaderComponent
    ],
    declarations: [
        LoaderComponent
    ],
    providers: [
        LoaderService,
    ]
})

export class CoreModule { }
