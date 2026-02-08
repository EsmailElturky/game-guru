import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Refunds } from './refunds';
import { TranslateModule } from '@ngx-translate/core';

describe('Refunds', () => {
  let component: Refunds;
  let fixture: ComponentFixture<Refunds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Refunds, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(Refunds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
