import {Injectable} from '@angular/core';
import {ScoreEntry} from './scoreentry';

@Injectable()
export class ScoreboardService {
    public readonly board: Board = new Board();

    constructor() {
        console.info("Hello ScoreboardService");
    }
}

const MAX_PLAYERS = 10;
const MAX_ROUNDS = 10;
const DEFAULT_ENABLED_PLAYERS = 5;

export class Board {
    public readonly MAX_PLAYERS = MAX_PLAYERS;
    public readonly MAX_ROUNDS = MAX_ROUNDS;

    private _rounds: Round[] = new Array(MAX_ROUNDS)
        .fill(null)
        .map((a, index) => new Round(index + 1));
    private _players: Player[] = new Array(MAX_PLAYERS)
        .fill(null)
        .map((a, index) => new Player(index < DEFAULT_ENABLED_PLAYERS));

    constructor() {
    }

    get rounds(): Round[] {
        return this._rounds;
    }

    get players(): Player[] {
        return this._players;
    }

    total(player: Player): number {
        const playerIdx = this.players.indexOf(player);
        const total = this._rounds.reduce((runningTotal: number, round: Round) => {
            return runningTotal + (round.scores[playerIdx].total || 0);
        }, 0);
        return total;
    }

    reset() {
        this.rounds.forEach(round => round.reset());
    }
}

export class Round {
    private _scores: ScoreEntry[] = new Array(MAX_PLAYERS)
        .fill(null);
    private _roundNum: number;

    /**
     *
     * @param {number} roundNum 1-based index!
     */
    constructor(roundNum: number) {
        this._roundNum = roundNum;
        this.reset();
    }

    reset() {
        this._scores.forEach((_, idx) => {
            this._scores[idx] = new ScoreEntry(this._roundNum);
        })
    }

    get roundNum() {
        return this._roundNum;
    }

    get scores() {
        return this._scores;
    }

    toString(): string {
        return `[Round ${this._roundNum}]`;
    }
}

export class Player {
    name: string;
    enabled: boolean;

    constructor(enabled: boolean = true, name?: string) {
        this.enabled = enabled;
        this.name = name || "";
    }

    toString(): string {
        return `[Player ${this.name}=${this.enabled}]`;
    }
}

