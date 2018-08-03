import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyNgForComponent } from './lazy-ng-for.component';
import { LazyNgForService } from './lazy-ng-for.service';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        LazyNgForComponent
    ],
    providers: [
        LazyNgForService
    ],
    declarations: [
        LazyNgForComponent
    ]
})
export class LazyNgForModule {

}
