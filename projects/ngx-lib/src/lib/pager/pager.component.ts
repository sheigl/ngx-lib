import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: '[pager]',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnInit, OnDestroy {
    private _items: any[] = [];
    get items() { return this._items; }
    @Input() set items(value: any[]) {
        this._items = value;
        this.createPages();
    }

    pages: Page[] = [];
    currentPage: number = 1;
    pageSizes = [
        10,
        15,
        20,
        25,
        50,
        100,
        500,
        'all'
    ];
    @Input() template: any;
    @Input() pagesize: any = 50;
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

    cachePageSizeKey: string = window.location.origin + window.location.pathname + 'pageSize';
    cacheOrderByKey: string = window.location.origin + window.location.pathname + 'orderBy';
    @ViewChild('itemContainer', { static: false }) itemContainer: ElementRef;
    //onWindowScroll: Observable;

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    constructor(
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
        let cachedPageSize = localStorage.getItem(this.cachePageSizeKey);
        
        if (cachedPageSize) {
            this.pagesize = cachedPageSize === 'all' ? cachedPageSize : parseInt(cachedPageSize);
        }

        let cachedOrderBy = localStorage.getItem(this.cacheOrderByKey);
        if (cachedOrderBy) {
            let orderBy: OrderBy = JSON.parse(cachedOrderBy);
            this.orderBy = this.orderBys.find(x => x.key === orderBy.key && x.direction === orderBy.direction && x.name === orderBy.name);
        }

        //this.onWindowScroll = fromEvent(window, 'scroll')
        //    .takeUntil(this.ngUnsubscribe);
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    getPages() {
        if (!this.items) {
            return [];
        }

        if (this.pagesize === 'all') {
            return [];
        }

        let returnValue = [];

        let numberOfPages = Math.ceil(this.items.length / this.pagesize);

        for (var i = 0; i < numberOfPages; i++) {
            returnValue.push(i + 1);
        }
        
        return returnValue;
    }

    getContext() {

        let page = this.pages.find(x => x.pageNumber == this.currentPage);

        if (page) {
            return { ctx: page.items }
        }
        else {
            return { ctx: [] }
        }
    }

    createPages() {
        this.currentPage = 1;
        let count: number = 0;
        let pageNumber: number = 1;

        let page = new Page();

        let items = this.items;

        if (this.orderBy) {
            items = this.items.sort((a, b) => {
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

        if (!items || items.length === 0) {
            this.pages = [];
        }

        if (this.pagesize === 'all') {
            page = new Page();
            page.pageNumber = 1;
            page.items = this.items;
            return;
        }

        for (var i = 0; i < items.length; i++) {

            let item = this.items[i];

            if (count === this.pagesize || i === this.items.length - 1) {
                count = 0;                
                page.items.push(item);
                page.pageNumber = pageNumber;

                let indexOfPage = this.pages.findIndex(x => x.pageNumber === pageNumber);
                if (indexOfPage > -1) {
                    this.pages.splice(indexOfPage, 1);
                }

                this.pages.push(page);

                page = new Page();
                pageNumber++;
            }
            else {
                page.items.push(item);
            }
            
            count++;
        }        
    }

    onPageSizeChange() {
        this.createPages();

        localStorage.setItem(this.cachePageSizeKey, this.pagesize.toString());
    }

    onOrderByChange() {
        this.createPages();    

        localStorage.setItem(this.cacheOrderByKey, JSON.stringify(this.orderBy));
    }

    onPageClick(pageNumber: number) {
        this.currentPage = pageNumber;
        this.cd.detectChanges();
    }
}

export class Page {
    pageNumber: number;
    items: any[] = [];
}

export class OrderBy {
    key: string;
    direction: 'asc' | 'desc';
    name: string;
}
