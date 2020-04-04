import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemParserService {

  constructor(private http: HttpClient) { }

  public loadFish(): Observable<ItemEntry[]> {
    return this.http.get('./assets/fish.json') as Observable<ItemEntry[]>;
  }
}

export interface ItemEntry {
  name: string;
  value: number;
  monthsNorth: Months;
  monthsSouth: Months;
  location: string;
  timeOfDay: TimeOfDay;
}

export interface Months {
  monthStart: number;
  monthEnd: number;
}

export interface TimeOfDay {
  hourStart: number;
  hourEnd: number;
}
