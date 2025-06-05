import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor() { }

  hello(){
    console.log("hello");
  }
}
