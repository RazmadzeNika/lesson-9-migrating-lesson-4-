import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Counter {
  private readonly _value = new BehaviorSubject<number>(Math.floor(Math.random() * 200) + 1);
  readonly value$ = this._value.asObservable();

  set(value: number) {
    this._value.next(value);
  }

  increment() {
    this._value.next(this._value.value + 1);
  }

  decrement() {
    const next = this._value.value - 1;
    if (next > 0) {
      this._value.next(next);
    }
  }
}
