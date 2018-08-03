import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Injectable()
export class LazyNgForService {
    timer: any
    currentId: number = 0;
    private callbacks: ({ callbackId: number, callback: () => void })[] = [];
    constructor(
    ) {
        
    }

    addCallback(callback: () => void) {
        let id = this.currentId++;
        this.callbacks.push({ callbackId: id, callback: callback });        
        return id;
    }

    removeCallback(callbackId: number) {
        let index = this.callbacks.findIndex(x => x.callbackId === callbackId);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    onIntervalTick() {
        for (var i = 0; i < this.callbacks.length; i++) {
            let callback = this.callbacks[i];
            callback.callback();
        }
    }

    init(timer: number) {
        this.timer = setInterval(this.onIntervalTick.bind(this), timer);
    }

    destroy() {
        clearInterval(this.timer);
        this.callbacks = [];
        this.currentId = 0;
    }
}

