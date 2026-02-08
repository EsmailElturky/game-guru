import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsErrorComponent } from './controls-error.component';

describe('ControlsErrorComponent', () => {
  let component: ControlsErrorComponent;
  let fixture: ComponentFixture<ControlsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
