import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[appEnterAsTab]'
})
export class EnterAsTabDirective {

    constructor(element: ElementRef) {
        const elem: HTMLInputElement = element.nativeElement;
        let listener = (event: KeyboardEvent) => {
            if (event.which === 13) {
                event.preventDefault();

                const nextElem = EnterAsTabDirective.findNextTabbableElement(elem);
                nextElem.focus();
            } else {
                return true;
            }
        };
        elem.addEventListener("keydown", listener);
        elem.addEventListener("keypress", listener);
    }

    private static findNextTabbableElement(elem: HTMLInputElement) {
        const tabbables = Array.from(document.querySelectorAll("input"));

        tabbables.sort((a, b) => {
            return a.tabIndex - b.tabIndex;
        });

        const currentIdx = tabbables.indexOf(elem);
        const nextElem = tabbables[(currentIdx + 1) % tabbables.length];
        return nextElem;
    }
}
