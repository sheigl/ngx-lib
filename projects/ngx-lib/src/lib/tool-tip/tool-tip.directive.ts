import { Directive, ElementRef, Input, HostListener, OnDestroy, NgZone, OnInit } from '@angular/core'
import * as jqueryProxy from 'jquery'
const jquery: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy
import 'bootstrap';

@Directive({
    selector: '[tool-tip]'    
})
export class ToolTipDirective implements OnDestroy, OnInit {
    @Input() text: string;
    @Input() position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
    @Input() html: boolean = false;

    ele: HTMLElement;
    constructor(
        private element: ElementRef,
        private zone: NgZone
    ) {
        this.ele = element.nativeElement;
    }    

    ngOnInit() {
        this.ele.title = this.text;
        this.ele.setAttribute('data-toggle', 'tooltip');
        this.ele.setAttribute('data-placement', this.position);

        if (this.html) {
            this.ele.setAttribute('data-html', 'true');
        }

        this.zone.runOutsideAngular(() => {
            setTimeout(() => {                
                jquery(function () {
                    jquery(this.ele).tooltip()
                }.bind(this))
            }, 1000)
        });
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            jquery(function () {
                jquery(this.ele).tooltip('dispose')
            }.bind(this))
        });
    }
}