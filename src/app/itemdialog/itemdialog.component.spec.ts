import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdialogComponent } from './itemdialog.component';

describe('ItemdialogComponent', () => {
  let component: ItemdialogComponent;
  let fixture: ComponentFixture<ItemdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
