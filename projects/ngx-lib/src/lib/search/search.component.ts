import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: '[app-search]',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {    
    @Input() filter: string;
    @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
    @Input() searching: boolean = false;
    @Input() placeholder: string = 'search communities...';
    @Output() searchingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('searchRef') searchRef: ElementRef;
    constructor(
        private router: ActivatedRoute
    ) { }

    ngOnInit() { }

    search(event?: KeyboardEvent) {
        if (!event || event.keyCode === 13) {
            this.onSearch.emit(this.filter);
            this.searchingChange.emit(this.searching);
            this.filterChange.emit(this.filter);
        }
    }
    clearSearch() {
        this.filter = '';
        this.onSearch.emit(this.filter);
        this.searchingChange.emit(this.searching);
        this.filterChange.emit(this.filter);
    }
}
