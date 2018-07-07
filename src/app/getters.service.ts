import { Injectable } from '@angular/core';

@Injectable()
export class GettersService {

  constructor() { }

  foo(): void {
      console.log("foo");
      const n1: number = getNumber();

      // compile error: const n2: number = getNumberOrNullWithNumber();
      // compile error: const n3: number = getNumberOrNullWithNull();
      const n4: number | null = getNumberOrNullWithNumber();
      const n5: number | null = getNumberOrNullWithNull();

      // compile error: const n4Required: number = n4 + 1;
      const n4Required: number = n4! + 1;
      console.log("n4Required", n4, n4!, n4Required); // => 0, 0, 1
      const n5Required: number = n5! + 2;
      console.log("n5Required", n5, n5!, n5Required); // => null, null, 2

      const objValue = getObjectOrNullWithObject();
      console.log("objValue", objValue, objValue!.foo);
      const objNull = getObjectOrNullWithNull();
      // Runtime Error: console.log("objNull", objNull, objNull!.foo);
      console.log("objNull", objNull, (objNull || {foo: "default"}).foo);

  }

}


function getNumber(): number {
    return 0;
}

// compile error
// function getNumberReturnNull(): number {
//     return null;
// }

// compile error
// function getNumberReturnUndefined(): number {
//     return undefined;
// }

function getNumberOrNullWithNumber(): number | null {
    return 0;
}

function getNumberOrNullWithNull(): number | null {
    return null;
}

// compile error
// function getNumberOrNullWithUndefined(): number | null {
//     return undefined;
// }

function getNumberOrUndefinedWithNumber(): number | undefined {
    return 0;
}

// compile error
// function getNumberOrUndefinedWithNull(): number | undefined {
//     return null;
// }

function getNumberOrUndefinedWithUndefined(): number | undefined {
    return undefined;
}

// please note: no shorthand syntax for return types, e.g. (): number?

function getObjectOrNullWithObject(): {foo: number} | null {
    return {foo: 123};
}

function getObjectOrNullWithNull(): {foo: number} | null {
    return null;
}
