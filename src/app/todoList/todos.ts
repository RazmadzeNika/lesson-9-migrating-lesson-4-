import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class Todos {
  #http = inject(HttpClient);

  getTodos() {
    return this.#http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  getTodo(id:number){
    return this.#http.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
