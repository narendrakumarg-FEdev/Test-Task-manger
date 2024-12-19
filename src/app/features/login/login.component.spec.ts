import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['authenticateUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule, // Import MatFormFieldModule
        MatInputModule // Import MatInputModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should log in a user successfully', () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      phoneNo: '1234567890',
      password: 'password123'
    };
    userServiceSpy.authenticateUser.and.returnValue(of(mockUser));

    component.email = 'test@example.com';
    component.password = 'password123';
    component.onLogin();

    expect(userServiceSpy.authenticateUser).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    // Optionally, you can spy on window.alert to verify the success message
  });

  it('should handle invalid credentials', () => {
    userServiceSpy.authenticateUser.and.returnValue(of(undefined));

    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';
    component.onLogin();

    expect(userServiceSpy.authenticateUser).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
    // Optionally, you can spy on window.alert to verify the error message
    // Ensure no navigation occurs
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
