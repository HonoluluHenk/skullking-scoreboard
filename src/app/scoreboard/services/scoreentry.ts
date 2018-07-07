export class ScoreEntry {
    private _guess: number | null = null;
    private _actual: number | null  = null;

    private _piratesCaught: number | null = null;
    private _skullKingsCaught: number | null = null;

    private _total = 0;

    constructor(readonly round: number) {
        if ((round || 0) <= 0) {
            throw new Error(`round number must be > 0 but was: ${round}`);
        }
    }

    get guess(): number | null {
        return this._guess;
    }

    set guess(theGuess: number | null) {
        this._guess = ScoreEntry.validateGt0(theGuess);
        this.update();
    }

    public get actual(): number | null {
        return this._actual;
    }

    public set actual(value: number | null) {
        this._actual = ScoreEntry.validateGt0(value);
        this.update();
    }

    public get piratesCaught(): number | null {
        return this._piratesCaught;
    }

    public set piratesCaught(value: number | null) {
        this._piratesCaught = ScoreEntry.validateGt0(value);
        this.update();
    }

    public get skullKingsCaught(): number | null {
        return this._skullKingsCaught;
    }

    public set skullKingsCaught(value: number | null) {
        this._skullKingsCaught = ScoreEntry.validateGt0(value);
        this.update();
    }

    public get total(): number {
        return this._total;
    }

    private static validateGt0(aNumber: number | null): number | null{
        if (aNumber !== null) {
            if (aNumber < 0) {
                throw new Error('score numbers must be >= 0');
            }
        }

        return aNumber;
    }

    private update() {
        if (this.guess === null || this.actual === null) {
            this._total = 0;
            return;
        }

        const win = this.guess === this.actual;
        let result;

        if (this.guess === 0) {
            const points = this.round * 10;

            result = win ? points : -points;
        } else {
            if (win) {
                result = 20 * this.guess;
            } else {
                const difference = Math.abs(this.guess - this.actual);
                result = -10 * difference;
            }
        }

        // add bonus
        if (win) {
            const pirateScore = (this.piratesCaught || 0) * 30;
            const skullKingScore = (this.skullKingsCaught || 0) * 50;
            result += pirateScore + skullKingScore;
        }

        this._total = result;
    }

}
