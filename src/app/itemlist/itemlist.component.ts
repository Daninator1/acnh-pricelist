import { Component, OnInit, Input } from '@angular/core';
import { ItemParserService, ItemEntry } from '../services/itemparser/itemparser.service';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../itemdialog/itemdialog.component';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {

  @Input() source: string;

  type: string;
  displayedColumns: string[] = ['name', 'value', 'monthsNorth', 'monthsSouth', 'location', 'timeOfDay'];
  dataSource: ItemEntry[];
  dataSourceSorted: ItemEntry[];

  constructor(private parser: ItemParserService, public translate: TranslateService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.type = this.source.toUpperCase() + '.';

    this.parser.loadItems(this.source).subscribe(res => {
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
        case 'name': return compare(this.translate.instant(this.type + a.name),
          this.translate.instant(this.type + b.name), isAsc);
        case 'value': return compare(a.value, b.value, isAsc);
        case 'monthsNorth': return compare(a.monthsNorth.monthStart, b.monthsNorth.monthStart, isAsc);
        case 'monthsSouth': return compare(a.monthsSouth.monthStart, b.monthsSouth.monthStart, isAsc);
        case 'location': return compare(this.translate.instant(this.type + a.location),
          this.translate.instant(this.type + b.location), isAsc);
        case 'timeOfDay': return compare(a.timeOfDay.hourStart, b.timeOfDay.hourStart, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
