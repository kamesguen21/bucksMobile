import {Component, OnInit} from '@angular/core';
import {UserServiceService} from './user-service.service';
import {User} from './User';
import {ModalController} from '@ionic/angular';
import {EntryComponent} from '../entry/entry.component';
import {EntryService} from '../entry/entry.service';
import {Entry, IEntry} from '../entry/entry';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User = null;
  entries: Entry[] = [];

  constructor(
    public userService: UserServiceService,
    public entryService: EntryService,
    public dbService: DbService,
    public modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.dbService.dbState().subscribe(val => {
      if (val) {
        this.userService.get().then(value => {
          if (value && value.id) {
            this.user = value;
            this.getEntries();
            console.log(this.user);
          } else {
            this.user = {};
          }
        }, error1 => {
          console.log(error1);
        });
      }

    }, error1 => {
      console.log(error1);
    });
  }

  async presentModal(type: string) {
    const modal = await this.modalController.create({
      component: EntryComponent,
      componentProps: {
        type
      }
    });
    this.onDismiss(modal.onDidDismiss());

    return await modal.present();
  }


  private onDismiss(onDidDismiss: Promise<any>) {
    onDidDismiss.then(data => {
      console.log(data);
      const entry: IEntry = data.data.entry;
      console.log(entry);
      if (entry) {
        this.entryService.save(entry).then(() => {
          if (entry.type === 'in') {
            this.user.earned += entry.amount;
          }
          if (entry.type === 'out') {
            this.user.spent += entry.amount;
          }
          this.user.balance = this.user.earned - this.user.spent;
          this.userService.put(this.user);
          this.getEntries();

        });
      }

    });
  }

  private getEntries() {
    this.entryService.get().then(data => {
      this.entries = data;
    });
  }
}
