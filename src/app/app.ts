import { Component, signal } from '@angular/core';
import {TodoListComponent} from './todoList/todoListComponent';

@Component({
  selector: 'app-root',
  imports: [ TodoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lesson-4');
}
