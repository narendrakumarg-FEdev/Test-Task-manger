import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { UserService } from './user.service';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor(private userService: UserService) { }

  getTasks(): Observable<Task[]> {
    return new Observable<Task[]>(observer => {
      const tasks = localStorage.getItem(this.localStorageKey);
      const userId = this.userService.getLoggedInUserId();

      if (tasks) {
        const filteredTasks = JSON.parse(tasks).filter((task: Task) => task.userId === userId);
        observer.next(filteredTasks);
      } else {
        observer.next([]);
      }

      observer.complete();
    });
  }

  private getAllTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  addTask(task: Task): Observable<void> {
    return new Observable<void>(observer => {
      const userId = this.userService.getLoggedInUserId();

      if (userId === null) {
        observer.error(new Error('User  is not logged in. Cannot add task.'));
        return;
      }

      const allTasks = this.getAllTasks();

      task.id = this.generateUniqueId(allTasks);
      task.userId = userId;
      allTasks.push(task);
      localStorage.setItem(this.localStorageKey, JSON.stringify(allTasks));

      observer.next();
      observer.complete();
    }).pipe(
      delay(1000)
    );
  }


  private generateUniqueId(tasks: Task[]): number {
    if (tasks.length === 0) {
      return 1;
    }
    const maxId = Math.max(...tasks.map(task => task.id));
    return maxId + 1;
  }


  deleteTask(taskId: number): Observable<void> {
    return new Observable<void>(observer => {
      let tasks = this.getAllTasks();
      tasks = tasks.filter(task => task.id !== taskId);

      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));

      observer.next();
      observer.complete();
    }).pipe(
      delay(1000)
    );
  }


  editTask(updatedTask: Task): void {
    const tasks = this.getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      updatedTask.userId = tasks[taskIndex].userId;
      tasks[taskIndex] = updatedTask;
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }
  }


  findTaskByName(name: string): Task | undefined {
    const tasks = this.getAllTasks();
    return tasks.find(task => task.name === name);
  }


  findTaskById(id: number): Task | undefined {
    const tasks = this.getAllTasks();
    return tasks.find(task => task.id === id);
  }
}