import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Import this if using the schema method

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Include this if using the schema method
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome message', () => {
    const compiled = fixture.nativeElement;
    const welcomeMessage = compiled.querySelector('h1').textContent;
    expect(welcomeMessage).toContain('Welcome to the Task Manager App!');
  });
});
