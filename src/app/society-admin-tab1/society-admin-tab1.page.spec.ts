import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocietyAdminTab1Page } from './society-admin-tab1.page';

describe('SocietyAdminTab1Page', () => {
  let component: SocietyAdminTab1Page;
  let fixture: ComponentFixture<SocietyAdminTab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyAdminTab1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocietyAdminTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
