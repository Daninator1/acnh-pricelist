import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemEntry } from '../services/itemparser/itemparser.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-itemdialog',
  templateUrl: './itemdialog.component.html',
  styleUrls: ['./itemdialog.component.scss']
})
export class ItemDialogComponent implements OnInit {

  constructor(public translate: TranslateService, public dialogRef: MatDialogRef<ItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { item: ItemEntry, showSouth: boolean }) { }

  ngOnInit(): void {
  }
}
