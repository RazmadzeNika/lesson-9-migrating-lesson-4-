import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { fromEvent, map, tap, switchMap } from 'rxjs';
import { Todos } from './todos';
import { Counter } from './counter';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: 'todoListComponent.html',
  styleUrl: 'todoListComponent.css',
})
export class TodoListComponent implements AfterViewInit {
  private todosService = inject(Todos);
  private counterStore = inject(Counter);

  @ViewChild('randomBtn')
  randomBtn!: ElementRef<HTMLButtonElement>;

  todos$ = this.todosService.getTodos();

  counter$ = this.counterStore.value$;

  todo$ = this.counter$.pipe(
    switchMap(id => this.todosService.getTodo(id))
  );

  ngAfterViewInit() {
    fromEvent(this.randomBtn.nativeElement, 'click')
      .pipe(
        map(() => Math.floor(Math.random() * 200) + 1),
        tap(randomId => this.counterStore.set(randomId))
      )
      .subscribe();
  }

  increment() {
    this.counterStore.increment();
  }

  decrement() {
    this.counterStore.decrement();
  }
}
