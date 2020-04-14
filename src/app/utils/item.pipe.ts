import { Pipe, PipeTransform } from '@angular/core';
import { ItemEntry } from '../services/itemparser/itemparser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Pipe({
    name: 'current'
})
export class ItemPipe implements PipeTransform {

    constructor() {
    }

    public transform(obs: Observable<ItemEntry[]>): Observable<ItemEntry[]> {
        const date = new Date();
        const currentHours = date.getHours();
        const currentMonth = date.getMonth();
        return obs.pipe(
            map(items => items.filter(item => item.timeOfDay.some(t => t.hourStart <= currentHours && t.hourEnd > currentHours &&
                item.monthsNorth.some(m => m.monthStart <= currentMonth && m.monthEnd >= currentMonth))))
        );
    }
}
