import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertModule } from './alert/alert.module';
import { LazyNgForModule } from './lazy-ng-for/lazy-ng-for.module';
import { LazyShowModule } from './lazy-show/lazy-show.module';
import { LoadingComponent } from './loading/loading.component';
import { MultiSelectModule } from './multiselect/multiselect.module';
import { PagerComponent } from './pager/pager.component';
import { PopAlertComponent } from './popalert/pop-alert.component';
import { ScrollToDirective } from './scroll-to/scroll-to.directive';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { SearchComponent } from './search/search.component';
import { ToolTipDirective } from './tool-tip/tool-tip.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoadingComponent,
    PagerComponent,
    PopAlertComponent,
    ScrollToDirective,
    ScrollToTopComponent,
    ToolTipDirective,
    SearchComponent
  ],
  exports: [
    AlertModule,
    LazyNgForModule,
    LazyShowModule,
    LoadingComponent,
    MultiSelectModule,
    PagerComponent,
    PopAlertComponent,
    ScrollToDirective,
    ScrollToTopComponent,
    SearchComponent,
    ToolTipDirective
  ]
})
export class NgxLibModule { }
