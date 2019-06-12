import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzEntityDetailSectionHeaderComponent } from './header.component';
import { SenzingSdkModule } from 'src/lib/sdk.module';

describe('SzEntityDetailSectionHeaderComponent', () => {
  let component: SzEntityDetailSectionHeaderComponent;
  let fixture: ComponentFixture<SzEntityDetailSectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SenzingSdkModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzEntityDetailSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
