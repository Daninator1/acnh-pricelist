import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemEntry } from '../services/itemparser/itemparser.service';

@Component({
  selector: 'app-itemdialog',
  templateUrl: './itemdialog.component.html',
  styleUrls: ['./itemdialog.component.scss']
})
export class ItemDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ItemEntry) { }

  ngOnInit(): void {
  }
}
