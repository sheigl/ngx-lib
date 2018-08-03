import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Injectable()
export class LoadingService implements OnDestroy {
    private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(
    ) { }

    ngOnDestroy() {
        this.loading$.complete();
    }

    getLoading() {
        return this.loading$.asObservable();
    }

    show() {
        this.loading$.next(true);
    }

    hide() {
        this.loading$.next(false);
    }
}

