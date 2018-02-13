import {Injectable, Input} from '@angular/core';

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
        .map((a, index) => new Player(index < DEFAULT_ENABLED_PLAYERS, `Player ${index + 1}`));

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

export class ScoreEntry {
    private _guess?: number = null;
    private _actual?: number = null;

    private _piratesCaught?: number = null;
    private _skullKingsCaught?: number = null;

    private _total: number = null;

    constructor(readonly round: number) {
        if ((round || 0) <= 0) {
            throw new Error(`round number must be > 0 but was: ${round}`);
        }
    }

    get guess() {
        return this._guess;
    }

    set guess(theGuess: number) {
        this._guess = ScoreEntry.validateGt0(theGuess);
        this.update();
    }

    public get actual(): number {
        return this._actual;
    }

    public set actual(value: number) {
        this._actual = ScoreEntry.validateGt0(value);
        this.update();
    }

    public get piratesCaught(): number {
        return this._piratesCaught;
    }

    public set piratesCaught(value: number) {
        this._piratesCaught = ScoreEntry.validateGt0(value);
        this.update();
    }

    public get skullKingsCaught(): number {
        return this._skullKingsCaught;
    }

    public set skullKingsCaught(value: number) {
        this._skullKingsCaught = ScoreEntry.validateGt0(value);
        this.update();
    }

    public get total(): number {
        return this._total;
    }

    private update() {
        if (this.guess === null || this.actual === null) {
            return null;
        }

        const win = this.guess === this.actual;
        let result;

        if (this.guess === 0) {
            let points = this.round * 10;

            result = win ? points : -points;
        } else {
            if (win) {
                result = 20 * this.guess;
            } else {
                result = -10 * this.guess;
            }
        }

        // add bonus
        if (win) {
            result += (this.piratesCaught || 0) + (this.skullKingsCaught || 0);
        }

        this._total = result;
    }

    private static validateGt0(aNumber: number): number {
        if (aNumber !== null) {
            if (aNumber < 0) {
                throw new Error("score numbers must be >= 0");
            }
        }

        return aNumber;
    }

}
