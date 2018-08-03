import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operator/filter';

@Component({
    selector: '[multi-select]',
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent implements OnInit, OnDestroy {
    muliselectItems: MultiSelectItemContainer[] = [];
    filter: string = '';
    private _opts: MultiSelectOptions;
    get opts() { return this._opts }
    @Input() set opts(value: MultiSelectOptions) {
        this._opts = value;

        if (value) {
            this.update();
        }
    }

    @Input() key: string = '';
    @ContentChild('itemDisplay') tempRef;
    @ContentChild('selectedItemDisplay') selectedTempRef;
    @ViewChild('selectContainer') selectRef: ElementRef;
    @Output() onNew: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeselect: EventEmitter<any> = new EventEmitter<any>();
    open: boolean = false;


    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private cd: ChangeDetectorRef) { }
    
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    onSelectContainerClick(event) {
        if (event.target === this.selectRef.nativeElement) {
            this.open = !this.open;
        }
    }

    onItemSelect(item: MultiSelectItemContainer) {
        item.selected = !item.selected;

        if (item.selected) {
            this.onSelect.emit(item.item);
        }
        else {
            this.onDeselect.emit(item.item);
        }

        this.open = false;
    }

    onItemRemove(item: MultiSelectItemContainer) {
        item.selected = false;
        this.onDeselect.emit(item);
    }

    onFilterKeyUp() {
        if (this.opts.items.length > 0 && this.filter.length > 0) {
            let keys = Object.keys(this.opts.items[0]);

            this.muliselectItems = this.opts
                .items
                .filter(x => {
                    for (var i = 0; i < keys.length; i++) {
                        let key = keys[i];
                        let value = x[key];

                        if (value && this.filter && value.toString().toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                            return true;
                        }
                    }
                })
                .map(x => <MultiSelectItemContainer>{ item: x })

            this.muliselectItems.forEach(x => {
                if (this.opts.selectedItems.indexOf(x.item) > -1) {
                    x.selected = true;
                }
            });
        }
        else {
            this.update();
        }

        this.cd.detectChanges();
    }

    getSelectedItems() {
        return this.muliselectItems.filter(x => x.selected);
    }

    update() {
        this.muliselectItems = this.opts.items.map(x => <MultiSelectItemContainer>{ item: x })

        this.muliselectItems.forEach(x => {
            if (this.opts.selectedItems.indexOf(x.item) > -1) {
                x.selected = true;
            }
        });

        this.cd.detectChanges();
    }
}

export class MultiSelectItemContainer {
    item: any;
    selected: boolean = false;
    edit: boolean = false;
}

export class MultiSelectOptions {
    items: any[] = [];
    selectedItems: any[] = [];
    showNewButton: boolean = true;
}