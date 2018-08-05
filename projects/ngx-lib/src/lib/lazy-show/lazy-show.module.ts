import { NgModule } from '@angular/core';

import { LazyShowDirective } from './lazy-show.directive';
import { LazyShowService } from './lazy-show.service';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [CommonModule],
    exports: [LazyShowDirective],
    providers: [LazyShowService],
    declarations: [LazyShowDirective]
})
export class LazyShowModule {

}
