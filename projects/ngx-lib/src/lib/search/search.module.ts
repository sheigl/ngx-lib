import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [SearchComponent],
    providers: [],
    declarations: [SearchComponent]
})
export class SearchModule {

}
