import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class CounterService{
    private counterServiceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
    constructor() { }

    setCount(count: number): void {
        this.counterServiceSubject.next(count);
      }
    
      getCount(): Observable<number> {
        return this.counterServiceSubject.asObservable();
      }
  }  