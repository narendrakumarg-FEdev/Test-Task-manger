import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup.component';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['addUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        FormsModule,
        MatFormFieldModule, // Import MatFormFieldModule
        MatInputModule      // Import MatInputModule if using <input> fields
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should sign up a user successfully', () => {
    userServiceSpy.addUser.and.returnValue(of(undefined));

    component.onSignup();

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(component.user);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    // Add assertions for alert if needed, using a spy on window.alert
  });

  it('should handle signup error', () => {
    const errorResponse = new Error('Signup failed');
    userServiceSpy.addUser.and.returnValue(throwError(errorResponse));

    component.onSignup();

    expect(userServiceSpy.addUser).toHaveBeenCalledWith(component.user);
    // Add assertions for alert if needed, using a spy on window.alert
  });
}); 
