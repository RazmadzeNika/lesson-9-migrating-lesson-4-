import {
  Component,
  ElementRef,
  AfterViewInit,
  inject, viewChild, signal, computed, effect
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { fromEvent } from 'rxjs';
import { Todos } from './todos';
import { Counter } from './counter';
import {Todo} from './todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: 'todoListComponent.html',
  styleUrl: 'todoListComponent.css',
})
export class TodoListComponent implements AfterViewInit {
  private todosService = inject(Todos);
  private counterStore = inject(Counter);

  // @ViewChild('randomBtn')
  // randomBtn!: ElementRef<HTMLButtonElement>;
  randomBtn = viewChild.required<ElementRef<HTMLButtonElement>>('randomBtn');


  // todos$ = this.todosService.getTodos();
  todos = signal<Todo[]|null>(null);
  // counter$ = this.counterStore.value$;
  todo = signal<Todo|null>(null)
  counter = this.counterStore.value

  // todo$ = this.counter$.pipe(
  //   switchMap(id => this.todosService.getTodo(id))
  // );

  todoId = computed(()=>this.counter());

  constructor() {
    this.todosService.getTodos().subscribe((todos)=>{
      this.todos.set(todos);
    });

    effect(() => {
      const id = this.todoId();
      if (id>0){
        this.todosService.getTodo(id).subscribe((todo)=>{
          this.todo.set(todo)
        })
      }
    });
  }

  ngAfterViewInit() {
    const buttonEl = this.randomBtn();
    fromEvent(buttonEl.nativeElement, 'click').subscribe(()=>{
      const randomId = Math.floor(Math.random()*200)+1;
      this.counterStore.set(randomId);
    })

  }

  increment() {
    this.counterStore.increment();
  }

  decrement() {
    this.counterStore.decrement();
  }
}
