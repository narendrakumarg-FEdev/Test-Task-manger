import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask', 'editTask']);
    taskServiceMock.getTasks.and.returnValue(of([]));
    taskServiceMock.deleteTask.and.returnValue(of({}));

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [MatTableModule], // Include MatTableModule here,
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create the component and load tasks', () => {
    expect(component).toBeTruthy();
    expect(taskServiceMock.getTasks).toHaveBeenCalled();
  });

  it('should filter tasks based on search term and status', () => {
    component.tasks = [
      { id: 1, name: 'Task 1', description: 'Description 1', startDate: new Date(), endDate: new Date(), status: 'Pending', userId: 1 },
      { id: 2, name: 'Task 2', description: 'Description 2', startDate: new Date(), endDate: new Date(), status: 'Completed', userId: 1 }
    ];

    component.searchTerm = 'Task 1';
    component.selectedStatus = 'Pending';

    const filteredTasks = component.filterTasks();
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].name).toBe('Task 1');
  });

  it('should update pagination when tasks are loaded', () => {
    component.tasks = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Task ${i}`,
      description: `Description ${i}`,
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending',
      userId: 1
    }));
    component.pageSize = 5;
    component.currentPage = 1;

    component.updatePagination();

    expect(component.paginatedTasks.length).toBe(5);
    expect(component.totalPages).toBe(2);
  });

  it('should delete a task and reload tasks', () => {
    const taskId = 1;
    spyOn(component, 'loadTasks');

    component.deleteTask(taskId);

    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(taskId);
    expect(component.loadTasks).toHaveBeenCalled();
  });

});
