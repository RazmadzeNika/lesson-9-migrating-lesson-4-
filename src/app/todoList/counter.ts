import {Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Counter {
  // private readonly _value = new BehaviorSubject<number>(Math.floor(Math.random() * 200) + 1);
  // readonly value$ = this._value.asObservable();
  value = signal(Math.floor(Math.random() * 100));

  set(value: number) {
    this.value.set(value);
  }

  increment() {
    this.value.update(value=>value+1);
  }

  decrement() {
    this.value.update(value=>Math.max(1,value-1));
  }
}
