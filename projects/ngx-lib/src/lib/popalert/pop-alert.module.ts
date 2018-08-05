import { NgModule } from '@angular/core';
import { PopAlertComponent } from './pop-alert.component';
import { PopAlertService } from './pop-alert.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [PopAlertComponent],
    providers: [PopAlertService],
    declarations: [PopAlertComponent]
})
export class PopAlertModule {

}
