import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminNoticesPage } from './admin-notices.page';

describe('AdminNoticesPage', () => {
  let component: AdminNoticesPage;
  let fixture: ComponentFixture<AdminNoticesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNoticesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNoticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
