import { NgModule } from '@angular/core';
import { ScrollToDirective } from './scroll-to.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [ScrollToDirective],
    providers: [],
    declarations: [ScrollToDirective]
})
export class ScrollToModule {

}
