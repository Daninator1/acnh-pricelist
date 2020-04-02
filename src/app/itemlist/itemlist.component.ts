import { Component, OnInit } from '@angular/core';
import { ItemParserService, ItemEntry } from '../services/itemparser/itemparser.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {

  displayedColumns: string[] = ['name', 'value', 'timeOfYearNorth', 'timeOfYearSouth', 'timeOfDay'];
  dataSource: ItemEntry[];

  constructor(private parser: ItemParserService) { }

  ngOnInit(): void {

    const fish = this.parser.loadFish();
    console.log(fish);
    this.dataSource = fish;
  }

}
