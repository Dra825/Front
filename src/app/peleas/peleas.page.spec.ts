import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeleasPage } from './peleas.page';

describe('PeleasPage', () => {
  let component: PeleasPage;
  let fixture: ComponentFixture<PeleasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PeleasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
