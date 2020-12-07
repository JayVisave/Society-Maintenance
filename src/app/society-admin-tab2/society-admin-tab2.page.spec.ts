import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocietyAdminTab2Page } from './society-admin-tab2.page';

describe('SocietyAdminTab2Page', () => {
  let component: SocietyAdminTab2Page;
  let fixture: ComponentFixture<SocietyAdminTab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyAdminTab2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocietyAdminTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
