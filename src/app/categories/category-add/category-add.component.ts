import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ICategory, IColor} from '../category';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {
  @Input() category: ICategory = {};
  colorList = ['#6b715b', '#ce0018', '#e15d03', '#586903', '#ffe4e1', '#fff69a', '#8fcb95', '#b00b69', '#7d6fff', '#b786a4', '#efad73', '#f08a99', '#af9f9c', '#1b456b', '#a3bdd4', '#c3dcff', '#c38080', '#e6e6fa', '#af9f9c', '#f39e7d', '#fbab81', '#87a7ca', '#a3bdd4', '#80ca9f', '#89b8b3', '#83ae9b', '#88c4b2', '#9ecba7', '#83b695', '#7dbfc7', '#aa8fb2', '#79a3b6', '#9cc698', '#92c7a4', '#8299b3', '#90aba9', '#8fcb95', '#9cc58c', '#a3ba9b', '#f79887', '#fe8f8c', '#f08a99'];
  colors: IColor[] = [];
  selectedColor = null;

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
    for (const color1 of this.colorList) {
      this.colors.push({
        color: color1,
        selected: false
      });
    }
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  save(form: NgForm) {
    const cc = this.getSelectedColor();
    if (form.status === 'VALID' && cc) {
      this.category.color = cc;
      this.modalCtrl.dismiss({
        dismissed: true,
        category: this.category,
      });
    }
  }

  select(color: string) {
    for (const color1 of this.colors) {
      color1.selected = color1.color === color;
    }
  }

  private getSelectedColor() {
    for (const color1 of this.colors) {
      if (color1.selected) {
        return color1.color;
      }
    }
    return null;

  }
}
