import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/User';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);

    // Clear localStorage and reset loggedInUser before each test
    localStorage.clear();
    userService['loggedInUser'] = null; // Ensure no user is logged in
  });

  it('should add a user', (done: DoneFn) => {
    const newUser: User = {
      id: 0,
      name: 'John Doe',
      phoneNo: ' 1234567890',
      email: ' john.doe@example.com',
      password: 'password123'
    };

    userService.addUser(newUser).subscribe(() => {
      const usersJson = localStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('John Doe');
      done();
    });
  });

  it('should authenticate a user', (done: DoneFn) => {
    const user: User = {
      id: 1,
      name: 'Jane Doe',
      phoneNo: ' 0987654321',
      email: ' jane.doe@example.com',
      password: 'password456'
    };
    localStorage.setItem('users', JSON.stringify([user]));

    userService.authenticateUser(' jane.doe@example.com', 'password456').subscribe(authenticatedUser => {
      expect(authenticatedUser).toBeDefined();
      expect(authenticatedUser?.email).toBe(' jane.doe@example.com');
      done();
    });
  });

  it('should return false for isAuthenticated when no user is logged in', () => {
    expect(userService.isAuthenticated()).toBeFalse();
  });

  it('should log out a user', () => {
    const user: User = {
      id: 1,
      name: 'Jane Doe',
      phoneNo: ' 0987654321',
      email: ' jane.doe@example.com',
      password: 'password456'
    };
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    userService['loggedInUser'] = user; // Simulate user being logged in

    userService.logout();
    expect(userService.isAuthenticated()).toBeFalse();
    expect(localStorage.getItem('loggedInUser')).toBeNull();
  });
});
