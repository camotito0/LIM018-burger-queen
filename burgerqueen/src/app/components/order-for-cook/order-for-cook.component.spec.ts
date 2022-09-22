import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderForCookComponent } from './order-for-cook.component';
import { OrderTableComponent } from '../order-table/order-table.component';
import { orderItemsDummie } from 'src/assets/fakeFirestoreService'
import { FirestoreService } from 'src/app/services/firestore.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebaseConfig } from '../../app.module';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

xdescribe('OrderForCookComponent', () => {
  let component: OrderForCookComponent;
  let fixture: ComponentFixture<OrderForCookComponent>;
  let childComponent: OrderTableComponent
  let deliverDebugEl
  let mainEl
  let firestoreService
  let firestoreServiceStub

  beforeEach(async () => {
    // mock firestore
    firestoreServiceStub = {
      updateOrder: function (id, { state: state}) {
        orderItemsDummie[0].state = state
      },

      getOrdersByState: function (state) {
        const filteredItems = orderItemsDummie.filter(item=> item.state === state)
        component.orderItems = filteredItems
        return of(filteredItems)
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ OrderForCookComponent, OrderTableComponent ],
      providers: [ 
        {provide:  FIREBASE_OPTIONS, useValue: firebaseConfig},
        {provide:  FirestoreService, useValue: firestoreServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderForCookComponent);
    component = fixture.componentInstance;
    firestoreService = TestBed.inject(FirestoreService)
    component.orderItems = orderItemsDummie
    fixture.detectChanges();
    childComponent = fixture.debugElement.query(By.directive(OrderTableComponent)).componentInstance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create childComponent', () => {
    expect(childComponent).toBeTruthy();
  });

  it('should call listOrdes() when component instantiates', () => {
    spyOn(component, 'listOrdes');
    component.ngOnInit();
    expect(component.listOrdes).toHaveBeenCalled();
  });

  it('should not display the table with state "preparando"', () => {
    fixture.detectChanges()
    console.log(component.orderItems);
    
    mainEl = fixture.nativeElement.querySelector('main')
    fixture.detectChanges();
    console.log(mainEl);
    console.log(orderItemsDummie, 'ANtes del click');

    deliverDebugEl = fixture.debugElement.query(By.css('.deliver-btn'))
    deliverDebugEl.triggerEventHandler('click', null)
    console.log(orderItemsDummie);
    
    fixture.detectChanges();
    console.log(orderItemsDummie);

    const itemWithCookingState = mainEl.textContent.includes('Candas')
    expect(itemWithCookingState).toBe(false);
  });
});
