import { Injectable } from '@angular/core';
import json from './fish.json';

@Injectable({
  providedIn: 'root'
})
export class ItemParserService {

  constructor() { }

  public loadFish(): ItemEntry[] {
    return json as ItemEntry[];
  }
}

export interface ItemEntry {
  name: string;
  value: number;
  timeOfYearNorth: TimeOfYear;
  timeOfYearSouth: TimeOfYear;
  timeOfDay: TimeOfDay;
}

export interface TimeOfYear {
  monthStart: string;
  monthEnd: string;
}

export interface TimeOfDay {
  hourStart: number;
  hourEnd: number;
}
