import { Directive, ElementRef, Input, HostListener, OnDestroy, OnInit, AfterViewInit } from '@angular/core'

import { LazyShowService } from './lazy-show.service';
@Directive({
    selector: '[lazy-show]'    
})
export class LazyShowDirective implements OnInit, OnDestroy, AfterViewInit {
    native: HTMLElement
    constructor(private element: ElementRef, private lazy: LazyShowService) {
        
    }

    ngOnInit() {
        this.native = this.element.nativeElement;
        this.native.classList.add('lazy');

        this.lazy.onWindowScroll.subscribe(this.onWindowScroll.bind(this));
        this.onWindowScroll();
    }

    ngAfterViewInit() {
        
    }

    ngOnDestroy() {
    }
    
    onWindowScroll(e?: Event) {
        if (this.elementShouldBeHidden()) {
            this.native.classList.remove('show');
            this.native.classList.add('hide');
        }

        if (this.elementShouldBeVisible()) {
            this.native.classList.add('show');
            this.native.classList.remove('hide');
        }
    }

    elementShouldBeVisible() {
        let bounds = this.native.getBoundingClientRect(); 
        return bounds.top <= window.innerHeight - 100;
    }

    elementShouldBeHidden() {
        let bounds = this.native.getBoundingClientRect(); 
        return bounds.top >= window.innerHeight + 1000;
    }
}