import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
    name: 'hour'
})
export class HourPipe implements PipeTransform {

    constructor(private translate: TranslateService) {

    }

    public transform(value: number, twelveHour: boolean): string {
        if (!twelveHour) {
            return ('0' + value).slice(-2).toString();
        }

        const suffix = value < 12 || value === 24 ? ' am' : ' pm';
        return value % 12 + suffix;
    }

}
