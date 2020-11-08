import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminTab4Page } from './admin-tab4.page';

describe('AdminTab4Page', () => {
  let component: AdminTab4Page;
  let fixture: ComponentFixture<AdminTab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTab4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
