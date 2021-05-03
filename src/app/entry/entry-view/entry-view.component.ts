import {Component, Input, OnInit} from '@angular/core';
import {IEntry} from '../entry';

@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss'],
})
export class EntryViewComponent implements OnInit {
  @Input() entry: IEntry;

  constructor() {
  }

  ngOnInit() {
  }

}
