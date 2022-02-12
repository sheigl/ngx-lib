import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef,  } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

import { PopAlertService } from './pop-alert.service';
import { PopAlertOptions } from './pop-alert.model';
@Component({
  selector: '[app-pop-alert]',
  templateUrl: './pop-alert.component.html',
  styleUrls: ['./pop-alert.component.scss'],
  animations: [
      trigger('fadeInOut', [
          state('in', style({ opacity: 1 })),
          transition('void => *', [style({ opacity: 0 }), animate('.5s ease-in-out', style({ opacity: 1 }))]),
          transition('* => void', [style({ opacity: 1 }), animate('1s ease-in-out', style({ opacity: 0 }))])
      ])
  ],
})
export class PopAlertComponent implements OnInit, OnDestroy, AfterViewInit {    
    opts: PopAlertOptions
    okButtonClicked: boolean = false;
    mousemove$: Subscription;
    mouseup$: Subscription;
    mousedown$: Subscription;  

    //@ViewChild('popContainer') set popContainer(ele: ElementRef) {

    //};
    //@ViewChild('popBackground') set popBackground(ele: ElementRef) {
    //    this.mousedown$ = Observable.fromEvent(ele.nativeElement, 'mousedown')
    //        .subscribe(x => {
    //            console.log(x);
    //        });

    //    this.mouseup$ = Observable.fromEvent(ele.nativeElement, 'mouseup')
    //        .subscribe(x => {
    //            console.log(x);
    //        });
    //};    
    constructor(private pop: PopAlertService) { }

    ngOnInit() {
        this.pop.control
            .subscribe(x => {
                this.opts = x;

                if (this.opts.showAlert) {
                    this.pop.isOpen = true;
                }
                else {
                    this.pop.isOpen = false;
                }
                
                this.toggleBlur(this.opts.showAlert);
            });
    }

    ngAfterViewInit() {
        
    }
    ngOnDestroy() {
        this.mousedown$.unsubscribe();
        this.mouseup$.unsubscribe();
        this.mousemove$.unsubscribe();
    }
    
    animationStarted(e) {
        if (this.opts.showAlert) {
            this.pop.onOpen.next(true);
            this.pop.isOpen = true;
        }
    }
    animationDone(e) {
        if (!this.opts.showAlert) {
            this.pop.onClose.next(this.okButtonClicked);
            this.pop.isOpen = false;
        }
    }

    onOkButtonClick() {
        if (this.opts.onButtonClick) {
            this.opts.onButtonClick()
                .subscribe(this.finishOkClick);
        }
        else {
            this.finishOkClick(true);
        }

    }

    finishOkClick(shouldClose: boolean) {
        this.okButtonClicked = true;
        this.opts.showAlert = false;
        this.toggleBlur(false);
    }

    onBackgroundClick() {
        //this.opts.showAlert = false;
        //this.toggleBlur(false);
    }

    onCancelButtonClick() {
        this.okButtonClicked = false;
        this.opts.showAlert = false;
        this.toggleBlur(false);
    }

    toggleBlur(show: boolean) {
        let appNav = document.querySelector('[app-nav]');
        let siteContainer = document.querySelector('.site-container');

        if (show && this.opts.showBackground) {
            if (appNav) {
                appNav.classList.add('blur');
            }

            if (siteContainer) {
                siteContainer.classList.add('blur');
            }
        }
        else {
            if (appNav) {
                appNav.classList.remove('blur');
            }

            if (siteContainer) {
                siteContainer.classList.remove('blur');
            }
        }
    }

    getContext() {
        return new ContextContainer(this);
    }
}

export class ContextContainer
{
    ctx: any;
    constructor(ctx: any) {
        this.ctx = ctx;
    }
}
