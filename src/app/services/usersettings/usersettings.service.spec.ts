import { TestBed } from '@angular/core/testing';

import { UserSettingsService } from './usersettings.service';

describe('UsersettingsService', () => {
  let service: UserSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
