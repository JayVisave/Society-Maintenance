import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocietyAllVisitorsPage } from './society-all-visitors.page';

describe('SocietyAllVisitorsPage', () => {
  let component: SocietyAllVisitorsPage;
  let fixture: ComponentFixture<SocietyAllVisitorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyAllVisitorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocietyAllVisitorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
