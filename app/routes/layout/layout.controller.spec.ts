import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.controller';

describe('layout.controller', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
    })
      .overrideComponent(LayoutComponent, {
        remove: {
          template: './layout.html',
        },
        add: {
          template: '<div></div>',
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should init the component', () => {
    expect(component.test).not.be.undefined;
    expect(component.test).to.eql('test');
  });
});
