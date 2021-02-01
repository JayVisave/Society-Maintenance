import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabVisitorPage } from './tab-visitor.page';

describe('TabVisitorPage', () => {
  let component: TabVisitorPage;
  let fixture: ComponentFixture<TabVisitorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabVisitorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabVisitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
