import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { NavigationService } from './services/navigation.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['isAuthenticated']);
    const navigationServiceMock = jasmine.createSpyObj('NavigationService', ['restoreRoute']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule // Import RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    navigationServiceSpy = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
  });

  it('should restore route if user is authenticated', () => {
    userServiceSpy.isAuthenticated.and.returnValue(true);

    component.ngOnInit();

    expect(userServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(navigationServiceSpy.restoreRoute).toHaveBeenCalled();
  });

  it('should not restore route if user is not authenticated', () => {
    userServiceSpy.isAuthenticated.and.returnValue(false);

    component.ngOnInit();

    expect(userServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(navigationServiceSpy.restoreRoute).not.toHaveBeenCalled();
  });
});
