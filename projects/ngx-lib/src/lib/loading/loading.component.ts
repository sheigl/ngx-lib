import { Component, OnInit, ElementRef, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';

import { LoadingService } from './loading.service';
@Component({
  selector: '[app-loading]',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
      trigger('fadeInOut', [
          state('in', style({ opacity: 1 })),
          transition('void => *', [style({ opacity: 0 }), animate('.5s ease-in-out', style({ opacity: 1 }))]),
          transition('* => void', [style({ opacity: 1 }), animate('1s ease-in-out', style({opacity: 0}))])
      ])
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoadingComponent implements OnInit, OnDestroy {
    show: boolean = false;
    native: HTMLElement;
    constructor(
        private eleRef: ElementRef,
        private loadingService: LoadingService,
        private cd: ChangeDetectorRef
    ) {
        this.native = eleRef.nativeElement;
    }
    ngOnInit() {
        this.loadingService
            .getLoading()
            .subscribe(x => {
                this.show = x;
                this.toggleBlur(x);
            });
    }

    ngOnDestroy() {
    }

    toggleBlur(show: boolean) {
        let appNav = document.querySelector('[app-nav]');
        let siteContainer = document.querySelector('.site-container');

        if (show) {
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
}
