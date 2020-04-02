import { TestBed } from '@angular/core/testing';

import { ItemParserService } from './itemparser.service';

describe('ItemparserService', () => {
  let service: ItemParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
