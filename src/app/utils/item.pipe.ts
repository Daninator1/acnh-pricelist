import { Pipe, PipeTransform } from '@angular/core';
import { ItemEntry, TimeOfDay, Months } from '../services/itemparser/itemparser.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Pipe({
    name: 'current'
})
export class ItemPipe implements PipeTransform {

    constructor() {
    }

    public transform(obs: Observable<ItemEntry[]>, south: boolean): Observable<ItemEntry[]> {
        const date = new Date();
        const currentHours = date.getHours();
        const currentMonth = date.getMonth();

        const isValidTimeOfDay = (timeOfDay: TimeOfDay[]) => timeOfDay.some(t => t.hourStart <= currentHours && t.hourEnd > currentHours);
        const isValidMonths = (months: Months[]) => months.some(m => m.monthStart <= currentMonth && m.monthEnd >= currentMonth);

        return obs.pipe(
            map(items => items.filter(item => isValidTimeOfDay(item.timeOfDay) &&
                isValidMonths((south) ? item.monthsSouth : item.monthsNorth)))
        );
    }
}
