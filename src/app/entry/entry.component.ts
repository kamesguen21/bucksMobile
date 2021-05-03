import {Component, Input, OnInit} from '@angular/core';
import {IEntry} from './entry';
import {NgForm} from '@angular/forms';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  @Input() entry: IEntry = {};
  @Input() type: string;


  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    console.log('ed');
    if (form.status === 'VALID') {
      this.entry.type = this.type;
      this.modalCtrl.dismiss({
        dismissed: true,
        entry: this.entry,
      });
    }
  }
}
