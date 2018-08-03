import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Injectable()
export class LazyShowService {
    private onWindowScroll$: Subject<Event> = new Subject<Event>();
    get onWindowScroll() { return this.onWindowScroll$.asObservable() }

    constructor(
    ) {
        window.addEventListener('scroll', this.onNativeWindowScroll.bind(this));        
    }

    private onNativeWindowScroll(e) {
        this.onWindowScroll$.next(e);
    }
}

