import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocietyAdminTab3Page } from './society-admin-tab3page';

describe('SocietyAdminTab3Page', () => {
  let component: SocietyAdminTab3Page;
  let fixture: ComponentFixture<SocietyAdminTab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyAdminTab3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocietyAdminTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
