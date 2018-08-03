import { Directive, ElementRef, Input, HostListener } from '@angular/core'

@Directive({
    selector: '[scroll-to]'    
})
export class ScrollToDirective {
    @Input('scroll-to') scrollTo: string;
    constructor(public element: ElementRef) {            
    }

    @HostListener('click', ['$event']) onClick(event: MouseEvent) {
        var nativeElement: HTMLElement = this.element.nativeElement as HTMLElement; 

        let element = document.getElementById(this.scrollTo);
        if (element) {
            element.scrollIntoView(<ScrollIntoViewOptions>{ behavior: 'smooth', inline: 'start', block: 'start' });
        }
    }
}