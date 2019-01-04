import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
    public getRandomNumber(n: number): number {
    return Math.floor(Math.random() * Math.floor(n));
  }
}
