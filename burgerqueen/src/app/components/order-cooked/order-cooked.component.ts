import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuItemServiceTs } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-order-cooked',
  templateUrl: './order-cooked.component.html',
  styleUrls: ['./order-cooked.component.css']
})
export class OrderCookedComponent implements OnInit {
  navbarTabs = [ {textS: "PN", text: "Pedidos nuevos", link: "/order-for-cook"}, {textS: "PP", text: "Pedido preparados", link: "/order-cooked"} ]
  orderItems:any =[]
  state = "entregado"
  buttonAction = "Preparado"

  constructor(
    public firestore: FirestoreService,
    public menuItemService: MenuItemServiceTs,
  ) { console.log('tas aquí') }

  ngOnInit(): void { this.listOrdes('preparando')  }
  
  listOrdes(state:string) {
    this.firestore.getOrdersByState(state).subscribe( doc => {
        this.orderItems = [];
        doc.forEach(document => {
          let docData = document.payload.doc.data();
        console.log(docData);
        
          this.orderItems.push({
            id: document.payload.doc.id,
            ...this.menuItemService.saveOrder(docData)
          })
          console.log(this.orderItems)
        });
        console.log(this.orderItems)
      })
  }
}
