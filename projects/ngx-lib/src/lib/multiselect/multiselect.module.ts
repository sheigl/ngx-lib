import { NgModule } from '@angular/core'
import { MultiSelectComponent } from './multiselect.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        MultiSelectComponent
    ],
    declarations: [
        MultiSelectComponent
    ],
    providers: []
})
export class MultiSelectModule { }