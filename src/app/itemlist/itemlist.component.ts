import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ItemParserService, ItemEntry } from '../services/itemparser/itemparser.service';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../itemdialog/itemdialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit, OnChanges {

  @Input() source: Observable<ItemEntry[]>;
  @Input() translationPrefix: string;
  @Input() title: string;
  @Input() showSouth = false;

  displayedColumns: string[] = ['name', 'value', 'location', 'monthsNorth', 'timeOfDay'];
  dataSource: ItemEntry[];
  dataSourceSorted: ItemEntry[];

  constructor(public translate: TranslateService, public dialog: MatDialog) {
  }

  ngOnChanges() {
    if (this.showSouth) {
      this.displayedColumns[3] = 'monthsSouth';
    } else {
      this.displayedColumns[3] = 'monthsNorth';
    }
  }

  ngOnInit(): void {
    this.source.subscribe(res => {
      console.log(res);
      this.dataSource = res;
      this.dataSourceSorted = res;
    });
  }

  onClick(data) {
    this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSourceSorted = data;
      return;
    }

    this.dataSourceSorted = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(this.translate.instant(this.translationPrefix + a.name),
          this.translate.instant(this.translationPrefix + b.name), isAsc);
        case 'value': return compare(a.value, b.value, isAsc);
        case 'monthsNorth': return compare(a.monthsNorth[0].monthStart, b.monthsNorth[0].monthStart, isAsc);
        case 'monthsSouth': return compare(a.monthsSouth[0].monthStart, b.monthsSouth[0].monthStart, isAsc);
        case 'location': return compare(this.translate.instant(this.translationPrefix + a.location),
          this.translate.instant(this.translationPrefix + b.location), isAsc);
        case 'timeOfDay': return compare(a.timeOfDay[0].hourStart, b.timeOfDay[0].hourStart, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
