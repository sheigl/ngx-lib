import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { PopAlertOptions } from './pop-alert.model';
@Injectable()
export class PopAlertService implements OnDestroy {
    private controlSub$: BehaviorSubject<PopAlertOptions> = new BehaviorSubject<PopAlertOptions>(<PopAlertOptions>{ showAlert: false });
    private onClose$: Subject<boolean> = new Subject<boolean>();
    private onOpen$: Subject<boolean> = new Subject<boolean>();
    private queue: PopAlertOptions[] = [];

    private isReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    get control() { return this.controlSub$.asObservable(); }
    get onClose() { return this.onClose$; }
    get onOpen() { return this.onOpen$; }

    isOpen: boolean = false;

    constructor(
    ) {        

        this.isReady$
            .subscribe(x => {
                if (x) {
                    this.showNext();
                }
            })

        this.onOpen$
            .subscribe(() => {
                this.isReady$.next(false);
            })

        this.onClose$
            .subscribe(() => {
                this.isReady$.next(true);
            })
    }
    
    ngOnDestroy() {
        this.controlSub$.complete();
        this.onClose$.complete();
    }
    error(msg?: string) {
        console.error(msg);
        let opts = <PopAlertOptions>{
            isError: true,
            headerText: 'Error!',
            showHeader: true,
            bodyText: msg || 'Something went wrong.',
            showBody: true,
            showFooter: true,
            okButtonText: 'Ok'
        };

        this.show(opts);
    }
    show(opts?: PopAlertOptions) {
        if (!opts) {
            opts = new PopAlertOptions();
        }

        opts.showAlert = true;

        this.queueNext(opts);

        if (!this.isOpen) {
            this.isReady$.next(true);
        }

        return this.onClose;
    }

    hide() {
        let hideAlert = new PopAlertOptions();
        hideAlert.showAlert = false;

        this.controlSub$.next(hideAlert);
    }

    private queueNext(opts: PopAlertOptions) {
        this.queue.push(opts);
    }

    private showNext() {
        if (this.queue.length > 0) {
            let item = this.queue.splice(0, 1);
            this.controlSub$.next(item[0]);
        }
    }
}

