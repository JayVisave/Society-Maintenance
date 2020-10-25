import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminTab3Page } from './admin-tab3.page';

describe('AdminTab3Page', () => {
  let component: AdminTab3Page;
  let fixture: ComponentFixture<AdminTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTab3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
