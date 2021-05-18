import {Component, OnInit} from '@angular/core';
import {UserServiceService} from '../user/user-service.service';
import {ICurrency, User} from '../user/User';
import {NgForm} from '@angular/forms';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  user: User = null;
  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  currencies: ICurrency[];


  constructor(
    public userService: UserServiceService,
    public dbService: DbService
  ) {
  }

  ngOnInit() {
    this.dbService.dbState().subscribe(val => {
      if (val) {
        this.userService.get().then(value => {
          if (value && value.id) {
            this.user = value;
            console.log(this.user);
          } else {
            this.user = {};
          }
        }, error1 => {
          console.log(error1);
        });
        this.userService.getCurrencies().then(res => {
          if (res) {
            this.currencies = res;
          }
        });
      }

    }, error1 => {
      console.log(error1);
    });
  }

  save(form: NgForm) {
    if (form.status === 'VALID') {
      this.user.balance = 0;
      this.user.earned = 0;
      this.user.spent = 0;
      if (!this.user.currency) {
        this.user.currency = 'USD';
      }
      this.userService.save(this.user).then(value => {
        this.userService.get().then(val => {
          this.user = val;
          console.log(this.user);

        });
      }, error1 => {
      });
    }

  }
}
