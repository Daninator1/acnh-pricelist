import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
    name: 'hour',
    pure: false
})
export class HourPipe implements PipeTransform {

    constructor(private translate: TranslateService) {

    }

    public transform(value: number): string {
        if (this.translate.currentLang !== 'en') {
            return value.toString();
        }

        const suffix = value < 12 || value === 24 ? ' am' : ' pm';
        return value % 12 + suffix;
    }

}
