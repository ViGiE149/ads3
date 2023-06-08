import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResertPasswordPage } from './resert-password.page';

describe('ResertPasswordPage', () => {
  let component: ResertPasswordPage;
  let fixture: ComponentFixture<ResertPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResertPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
