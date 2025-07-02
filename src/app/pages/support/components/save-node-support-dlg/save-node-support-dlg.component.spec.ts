import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveNodeSupportDlgComponent } from './save-node-support-dlg.component';

describe('SaveNodeSupportDlgComponent', () => {
  let component: SaveNodeSupportDlgComponent;
  let fixture: ComponentFixture<SaveNodeSupportDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveNodeSupportDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveNodeSupportDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
