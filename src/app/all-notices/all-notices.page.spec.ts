import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllNoticesPage } from './all-notices.page';

describe('AllNoticesPage', () => {
  let component: AllNoticesPage;
  let fixture: ComponentFixture<AllNoticesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNoticesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllNoticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
