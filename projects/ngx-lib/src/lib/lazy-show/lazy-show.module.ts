import { NgModule } from '@angular/core';

import { LazyShowDirective } from './lazy-show.directive';
import { LazyShowService } from './lazy-show.service';
@NgModule({
    imports: [],
    exports: [LazyShowDirective],
    providers: [LazyShowService],
    declarations: [LazyShowDirective]
})
export class LazyShowModule {

}
