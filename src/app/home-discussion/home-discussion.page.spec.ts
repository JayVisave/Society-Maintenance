import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeDiscussionPage } from './home-discussion.page';

describe('HomeDiscussionPage', () => {
  let component: HomeDiscussionPage;
  let fixture: ComponentFixture<HomeDiscussionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDiscussionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDiscussionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
