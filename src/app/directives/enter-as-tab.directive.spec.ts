import {EnterAsTabDirective} from './enter-as-tab.directive';
import {ElementRef} from '@angular/core';

describe('EnterAsTabDirective', () => {
    let elem: HTMLInputElement;
    var directive;

    beforeEach(() => {
        console.log("beforeeach");
        elem = document.createElement("input");
        directive = new EnterAsTabDirective(new ElementRef(elem));
    });

    it('should create an instance', () => {
        console.error("foo directive", elem);
        expect(elem).toBeTruthy();
    });

    it("should test something", () => {

    });

});

