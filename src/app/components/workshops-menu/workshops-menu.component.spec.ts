import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsMenuComponent } from './workshops-menu.component';

describe('WorkshopsMenuComponent', () => {
  let component: WorkshopsMenuComponent;
  let fixture: ComponentFixture<WorkshopsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
