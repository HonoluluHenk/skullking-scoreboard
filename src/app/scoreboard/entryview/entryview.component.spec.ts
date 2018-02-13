import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryviewComponent } from './entryview.component';

describe('EntryviewComponent', () => {
  let component: EntryviewComponent;
  let fixture: ComponentFixture<EntryviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
