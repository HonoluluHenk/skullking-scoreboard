import {Component, Input, OnInit} from '@angular/core';
import {ScoreEntry} from '../services/scoreentry';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
    @Input() score?: ScoreEntry;
    @Input() roundIdx?: number;
    @Input() maxRounds?: number;
    @Input() playerIdx?: number;
    @Input() maxPlayers?: number;
    public hidden = true;

    constructor() {
    }

    ngOnInit() {
    }

    setFocus() {
        this.hidden = false;
    }

    blurFocus() {
        this.hidden = true;
    }
}
