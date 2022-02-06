import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil, map, filter, debounceTime, distinct, pairwise } from 'rxjs/operators';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/debounce';
import { LazyNgForService } from './lazy-ng-for.service';


@Component({
    selector: '[lazy-ng-for]',
    templateUrl: './lazy-ng-for.component.html',
    styleUrls: ['./lazy-ng-for.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyNgForComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private items$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    private callbackId: number;
    private scrollPosition: { sY: number, sH: number }[] = [];
    @Input() alertType: string;
    @Input() message: string;
    @Input() opts: LazyNgForOptions;
    @Input() trackByFn: Function;
    private _items;
    get items() { return this._items }
    @Input() set items(value: any[]) {
        this._items = [];
        this.visibleItems = [];

        if (value && value.length > 0) {
            this._items = value;
            this.items$.next(value);            
        }
    }

    private _orderBys: OrderBy[];
    get orderBys() { return this._orderBys }
    @Input() set orderBys(value: OrderBy[]) {
        this._orderBys = value;
    }
    private _orderBy: OrderBy;
    get orderBy() { return this._orderBy }
    @Input() set orderBy(value: OrderBy) {
        this._orderBy = value;
    }
    private _itemContainer;
    get itemContainer() { return this._itemContainer }
    @ViewChild('itemContainer', { static: false }) set itemContainer(value: ElementRef) {
        if (value) {
            this._itemContainer = value;
            this.initScroll();
        }
    }
    cacheOrderByKey: string = window.location.origin + window.location.pathname + 'orderBy';
    visibleItems: any[] = [];
    destroyed: boolean = false;
    hasOrdered: boolean = false;
    constructor(
        private cd: ChangeDetectorRef,
        private zone: NgZone,
        private timer: LazyNgForService
    ) { }

    ngOnInit() {
        this.items$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(x => {
                this.updateItems(this.getNumberOfItemsToDisplay());
                this.cd.detectChanges();
            });

        this.timer.init(100);

        if (!this.trackByFn) {
            this.trackByFn = i => i;
        }

        let cachedOrderBy = localStorage.getItem(this.cacheOrderByKey);
        if (cachedOrderBy) {
            let orderBy: OrderBy = JSON.parse(cachedOrderBy);
            this.orderBy = this.orderBys.find(x => x.key === orderBy.key && x.direction === orderBy.direction && x.name === orderBy.name);
        }
    }
    ngOnDestroy() {
        this.destroyed = true;
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();

        this.timer.removeCallback(this.callbackId);

        this.cd.detach();
    }
    scroll() {
        if (this.destroyed) {
            return;
        }

        if (this.scrollPosition.length === 0) {
            this.scrollPosition.push({
                sY: window.scrollY,
                sH: document.body.offsetHeight - (window.pageYOffset + window.innerHeight)
            });

            return;
        }

        if (this.scrollPosition.length === 1) {
            this.scrollPosition.push({
                sY: window.scrollY,
                sH: document.body.offsetHeight - (window.pageYOffset + window.innerHeight)
            });

            return;
        }

        this.scrollPosition[0] = this.scrollPosition[1];
        this.scrollPosition[1] = {
            sY: window.scrollY,
            sH: document.body.offsetHeight - (window.pageYOffset + window.innerHeight)
        };

        if (this.scrollPosition[0].sY <= this.scrollPosition[1].sY) {
            let x = this.scrollPosition[1];

            let itemSize = 50;

            if (this.opts && this.opts.itemSize) {
                itemSize = this.opts.itemSize;
            }

            if (x.sH <= itemSize) {
                this.updateItems(10);
                this.cd.detectChanges();
            }

            if (this.visibleItems.length === this.items.length) {                
                this.timer.destroy();
            }
        }        
    }
    initScroll() {
        this.callbackId = this.timer.addCallback(this.scroll.bind(this));       
    }

    getNumberOfItemsToDisplay() {
        let itemSize = 50;
        let windowSize = window.innerHeight;

        if (this.opts && this.opts.itemSize) {
            itemSize = this.opts.itemSize;
        }

        let maxItems = Math.ceil(windowSize / itemSize);

        return maxItems;
    }

    updateItems(numberAtOnce: number) {
        if (this.items && this.items.length > 0 && this.visibleItems.length <= this.items.length) {            
            let offset = this.visibleItems.length === 0 ? 0 : this.visibleItems.length;

            if (this.orderBy && !this.hasOrdered) {
                this.hasOrdered = true;
                this._items = this._items.sort((a, b) => {
                    if (this.orderBy.key in a && this.orderBy.key in b) {
                        if (a[this.orderBy.key] === null) {
                            return 1;
                        }
                        else if (b[this.orderBy.key] === null) {
                            return -1;
                        }

                        if (this.orderBy.direction === 'asc') {
                            return a[this.orderBy.key] > b[this.orderBy.key] ? 1 : a[this.orderBy.key] < b[this.orderBy.key] ? -1 : 0;
                        }
                        else {
                            return b[this.orderBy.key] > a[this.orderBy.key] ? 1 : b[this.orderBy.key] < a[this.orderBy.key] ? -1 : 0;
                        }
                    }

                    return -1;
                });
            }

            for (var i = offset; i < this._items.length && i < numberAtOnce + offset; i++) {
                let item = this._items[i];
                this.visibleItems.push(item);
            }
        }
    }

    onOrderByChange() {
        this.hasOrdered = false;
        this.visibleItems = [];
        this.updateItems(this.getNumberOfItemsToDisplay());
        localStorage.setItem(this.cacheOrderByKey, JSON.stringify(this.orderBy));
    }
}

export class LazyNgForOptions {
    template?: any;
    itemSize?: number;
}

export class OrderBy {
    key: string;
    direction: 'asc' | 'desc';
    name: string;
}