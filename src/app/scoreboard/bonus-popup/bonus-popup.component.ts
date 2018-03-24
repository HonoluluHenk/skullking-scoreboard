import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-bonus-popup',
    templateUrl: './bonus-popup.component.html',
    styleUrls: ['./bonus-popup.component.scss']
})
export class BonusPopupComponent implements OnInit {

    @Input() kingBonus: number;
    @Output() kingBonusChange = new EventEmitter<number>();
    @Input() pirateBonus: number;
    @Output() pirateBonusBonusChange = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

}
