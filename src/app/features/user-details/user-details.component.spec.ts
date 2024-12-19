import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserDetailsComponent } from './user-details.component'; // Correct import
import { UserService } from '../../services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe(' UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture< UserDetailsComponent>;
  let router: Router;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: DummyComponent }])
      ],
      declarations: [ UserDetailsComponent, DummyComponent],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( UserDetailsComponent); // Correct usage
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login and call logout on UserService', () => {
    spyOn(router, 'navigate');
    spyOn(userService, 'logout');

    component.logout();

    expect(router.navigate). toHaveBeenCalledWith(['/login']);
    expect(userService.logout).toHaveBeenCalled();
  });

  it('should render toolbar with correct elements', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();

    const appName = toolbar.nativeElement.querySelector('.app-name');
    expect(appName.textContent).toContain('Task Manager');

    const welcomeMessage = toolbar.nativeElement.querySelector('.welcome-message');
    expect(welcomeMessage.textContent).toContain('Welcome to the Task Manager Application');
  });
});

@Component({ template: '' })
class DummyComponent {}
