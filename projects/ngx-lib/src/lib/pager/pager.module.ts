import { NgModule } from '@angular/core';
import { PagerComponent } from './pager.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [PagerComponent],
    providers: [],
    declarations: [PagerComponent]
})
export class PagerModule {

}
