import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { AuthtenticationService } from 'src/app/services/authtentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      providers: [ 
        {provide:  AuthtenticationService, useValue: {}},
        {provide:  FirestoreService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 6 inputs', () => {

  });

});
