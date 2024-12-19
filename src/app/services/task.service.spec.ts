import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { Task } from '../models/Task';

describe('TaskService', () => {
  let taskService: TaskService;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['getLoggedInUserId']);
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: UserService, useValue: spy }
      ]
    });
    taskService = TestBed.inject(TaskService);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should add a task', (done: DoneFn) => {
    userServiceSpy.getLoggedInUserId.and.returnValue(1);
    const newTask: Task = {
      id: 0,
      name: 'Test Task',
      description: 'Description',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending',
      userId: 1
    };

    taskService.addTask(newTask).subscribe(() => {
      const tasks = taskService['getAllTasks']();
      expect(tasks.length).toBe(1);
      expect(tasks[0].name).toBe('Test Task');
      done();
    });
  });

  it('should delete a task', (done: DoneFn) => {
    userServiceSpy.getLoggedInUserId.and.returnValue(1);
    const task: Task = {
      id: 1,
      name: 'Test Task',
      description: 'Description',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending',
      userId: 1
    };
    localStorage.setItem('tasks', JSON.stringify([task]));

    taskService.deleteTask(1).subscribe(() => {
      const tasks = taskService['getAllTasks']();
      expect(tasks.length).toBe(0);
      done();
    });
  });

  it('should edit a task', () => {
    const task: Task = {
      id: 1,
      name: 'Old Task',
      description: 'Old Description',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending',
      userId: 1
    };
    localStorage.setItem('tasks', JSON.stringify([task]));

    const updatedTask: Task = {
      id: 1,
      name: 'Updated Task',
      description: 'Updated Description',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Completed',
      userId: 1
    };

    taskService.editTask(updatedTask);
    const tasks = taskService['getAllTasks']();
    expect(tasks[0].name).toBe('Updated Task');
    expect(tasks[0].status).toBe('Completed');
  });

  it('should find a task by name', () => {
    const task: Task = {
      id: 1,
      name: 'Find Me',
      description: 'Description',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending',
      userId: 1
    };
    localStorage.setItem('tasks', JSON.stringify([task]));

    const foundTask = taskService.findTaskByName('Find Me');
    expect(foundTask).toBeDefined();
    expect(foundTask?.name).toBe('Find Me');
  });
});
