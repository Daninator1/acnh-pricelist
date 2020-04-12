import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemParserService {

  public fish: Observable<ItemEntry[]>;
  public insects: Observable<ItemEntry[]>;

  constructor(private http: HttpClient) {
    this.fish = this.http.get(`./assets/data/fish.json`).pipe(
      map(data => data as ItemEntry[]),
      map(entry => {
        entry.forEach(x => x.type = ItemType.Fish);
        return entry;
      })
    );

    this.insects = this.http.get(`./assets/data/insects.json`).pipe(
      map(data => data as ItemEntry[]),
      map(entry => {
        entry.forEach(x => x.type = ItemType.Insect);
        return entry;
      })
    );
  }
}

export interface ItemEntry {
  name: string;
  type: ItemType;
  value: number;
  location: string;
  shadow?: string;
  monthsNorth: Months[];
  monthsSouth: Months[];
  timeOfDay: TimeOfDay[];
}

export interface Months {
  monthStart: number;
  monthEnd: number;
}

export interface TimeOfDay {
  hourStart: number;
  hourEnd: number;
}

export enum ItemType {
  Fish,
  Insect
}
