import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('TaskFormComponent', () => {
 let component: TaskFormComponent;
 let fixture: ComponentFixture<TaskFormComponent>;
 let mockTaskService: jasmine.SpyObj<TaskService>;
 let mockUserService: jasmine.SpyObj<UserService>;
 let mockRouter: jasmine.SpyObj<Router>;
 beforeEach(async () => {
   mockTaskService = jasmine.createSpyObj('TaskService', ['addTask']);
   mockUserService = jasmine.createSpyObj('UserService', ['isAuthenticated', 'getLoggedInUserId']);
   mockRouter = jasmine.createSpyObj('Router', ['navigate']);
   await TestBed.configureTestingModule({
     declarations: [TaskFormComponent],
     imports: [FormsModule],
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
     providers: [
       { provide: TaskService, useValue: mockTaskService },
       { provide: UserService, useValue: mockUserService },
       { provide: Router, useValue: mockRouter },
     ],
   }).compileComponents();
   fixture = TestBed.createComponent(TaskFormComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });
 // Test case 1: Component should initialize
 it('should create the TaskFormComponent', () => {
   expect(component).toBeTruthy();
 });
 // Test case 2: calculateDays() should calculate days correctly
 it('should calculate correct number of days', () => {
   component.task.startDate = new Date('2024-12-01');
   component.task.endDate = new Date('2024-12-05');
   component.calculateDays();
   expect(component.daysRequired).toBe(4);
 });
 // Test case 3: Should submit task when user is authenticated
 it('should call TaskService.addTask and navigate on successful task submission', () => {
   mockUserService.isAuthenticated.and.returnValue(true);
   mockTaskService.addTask.and.returnValue(of(void 0));
   spyOn(component, 'resetForm');
   component.onSubmit();
   expect(mockTaskService.addTask).toHaveBeenCalledWith(component.task);
   expect(mockRouter.navigate).toHaveBeenCalledWith(['/task-list']);
   expect(component.resetForm).toHaveBeenCalled();
 });
 // Test case 4: Should not submit task when user is unauthenticated
 it('should alert the user when not authenticated', () => {
   mockUserService.isAuthenticated.and.returnValue(false);
   spyOn(window, 'alert');
   component.onSubmit();
   expect(mockTaskService.addTask).not.toHaveBeenCalled();
   expect(window.alert).toHaveBeenCalledWith('You must be logged in to submit a task.');
 });
});