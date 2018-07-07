import { Injectable } from '@angular/core';

/*
 * !!!!!!!!!! compile with --strictNullChecks !!!!!!!!!!!!
 */
@Injectable()
export class SettersService {

  constructor() { }

  public foo(): void {
/*
      paramNumber(null); // compile error
      paramNumber(undefined); // compile error

      paramNull(null); // OK
      paramNull(undefined); // compile error

      paramUndef(null); // compile error
      paramUndef(undefined); // OK
      paramUndef(); // compile error

      paramOptional(null); // compile error
      paramOptional(undefined); // OK
      paramOptional(); // OK
*/
  }

}

function paramNumber(param: number): void {
    console.log('paramNumber', param);
}

function paramNull(param: number | null): void {
    console.log('paramNull', param);
}

function paramUndef(param: number | undefined): void {
    console.log('paramUndef', param);
}

function paramOptional(param?: number): void {
    console.log('paramOptional', param);
}
