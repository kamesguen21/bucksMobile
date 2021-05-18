import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrencyExchangeOperationComponent } from './currency-exchange-operation.component';

describe('CurrencyExchangeOperationComponent', () => {
  let component: CurrencyExchangeOperationComponent;
  let fixture: ComponentFixture<CurrencyExchangeOperationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyExchangeOperationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyExchangeOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
