export class ScoreEntry {
    private _guess?: number = null;
    private _actual?: number = null;

    private _piratesCaught?: number = null;
    private _skullKingsCaught?: number = null;

    private _total: number = 0;

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
            this._total = 0;
            return;
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
                let difference = Math.abs(this.guess - this.actual);
                result = -10 * difference;
            }
        }

        // add bonus
        if (win) {
            let pirateScore = (this.piratesCaught || 0) * 30;
            let skullKingScore = (this.skullKingsCaught || 0) * 50;
            result += pirateScore + skullKingScore;
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
