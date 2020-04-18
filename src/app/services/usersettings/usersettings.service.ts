import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor() { }

  public get savedLanguage(): string {
    return localStorage.getItem('language');
  }


  public set savedLanguage(value: string) {
    localStorage.setItem('language', value);
  }

  public get savedSouth(): boolean {
    return JSON.parse(localStorage.getItem('south'));
  }


  public set savedSouth(value: boolean) {
    localStorage.setItem('south', value.toString());
  }

}
