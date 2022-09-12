import { Component, OnInit, Input, ElementRef, ViewChild , AfterViewInit  } from '@angular/core';
import { MenuItemServiceTs } from 'src/app/services/menu-item.service';
import { Item } from 'src/assets/menu';
@Component({
  selector: 'app-menu-item',
  styleUrls: ['./menu-item.component.css'],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  @Input() item!: Item;
  @ViewChild("additem") additem: ElementRef;

  ngAfterViewInit() {
    console.log(this.additem);
  }

  /* ---- Change file name ----- */
  constructor(public menuItemService : MenuItemServiceTs) {}
  getItemInfo (name:string, price:string) {
    let item = {
      name: name,
      price: price
    }
    this.menuItemService.addItemToSummaryTable(item)
  }
}
