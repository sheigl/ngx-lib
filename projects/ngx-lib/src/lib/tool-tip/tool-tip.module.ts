import { NgModule } from '@angular/core';
import { ToolTipDirective } from './tool-tip.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [ToolTipDirective],
    providers: [],
    declarations: [ToolTipDirective]
})
export class ToolTipModule {

}
