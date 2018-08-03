import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { state, transition, style, animate, trigger } from '@angular/animations';

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  animations: [
      trigger('flyInOut', [
          state('in', style({ opacity: 1, transform: 'translateX(0)' })),
          transition('void => *', [
              style({
                  opacity: 0,
                  transform: 'translateY(-100%)'
              }),
              animate('0.2s ease-in')
          ]),
          transition('* => void', [
              animate('0.2s 0.1s ease-out', style({
                  opacity: 0,
                  transform: 'translateY(100%)'
              }))
          ])
      ])
  ]
})
export class ScrollToTopComponent implements OnInit {    
    show: boolean = false;

    constructor() { }

    ngOnInit() {
        window.addEventListener('scroll', (event) => {
            if (window.pageYOffset <= 250) {
                this.show = false;
            }
            else {
                this.show = true;
            }
        });
    }

    onClick() {
        window.scrollTo(<ScrollToOptions>{
            behavior: 'smooth',
            top: 0,
            left: 0
        });
    }
}
