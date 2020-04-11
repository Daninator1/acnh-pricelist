import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ItemParserService, ItemEntry } from '../services/itemparser/itemparser.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemDialogComponent } from '../itemdialog/itemdialog.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Input() sourceFish: Observable<ItemEntry[]>;
  @Input() sourceInsects: Observable<ItemEntry[]>;

  fish: ItemEntry[] = [];
  insects: ItemEntry[] = [];

  myControl = new FormControl();
  options: Option[];
  filteredOptions: Observable<Option[]>;

  constructor(public translate: TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.sourceFish.subscribe(fish => {
      this.fish = fish;

      this.sourceInsects.subscribe(insects => {
        this.insects = insects;

        this.options = this.fish.map(x => ({
          data: x,
          name: this.translate.instant('FISH.' + x.name)
        })).concat(this.insects.map(x => (
          {
            data: x,
            name: this.translate.instant('INSECT.' + x.name)
          })));

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => value.length >= 1 ? this._filter(value) : [])
        );
      });
    });

    this.translate.onLangChange.subscribe(() => {
      this.myControl.setValue('');
      this.options = this.fish.map(x => ({
        data: x,
        name: this.translate.instant('FISH.' + x.name)
      })).concat(this.insects.map(x => (
        {
          data: x,
          name: this.translate.instant('INSECT.' + x.name)
        })));
    }
    );
  }

  onClick(data) {
    this.dialog.open(ItemDialogComponent, {
      width: '250px',
      data
    });
  }

  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

export class Option {
  data: ItemEntry;
  name: string;
}
