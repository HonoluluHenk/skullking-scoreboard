import {inject} from '@angular/core/testing';
import {ScoreEntry} from './scoreentry';

fdescribe('ScoreEntry', () => {
    const ALL_ROUNDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const score = (guess: number, actual: number, round: number = 1, bonusPirates: number = null,
                   bonusKings: number = null) => {
        const score = new ScoreEntry(round);
        score.guess = guess;
        score.actual = actual;
        score.piratesCaught = bonusPirates;
        score.skullKingsCaught = bonusKings;
        return score;
    };

    beforeEach(() => {
        // TestBed.configureTestingModule({
        //     providers: [ScoreboardService]
        // });
    });

    it('should be created', inject([], () => {
        expect(new ScoreEntry(1)).toBeTruthy();
    }));

    it("should fail to construct", () => {
        expect(() => new ScoreEntry(0)).toThrow(new Error("round number must be > 0 but was: 0"));
        expect(() => new ScoreEntry(-1)).toThrow(new Error("round number must be > 0 but was: -1"));
    });

    it("total should be 0", () => {
        let score = new ScoreEntry(1);

        // variable reuse because we want to test changing/update, too!

        expect(score.total).toBe(0);

        score.guess = 0;
        score.actual = null;
        expect(score.total).toBe(0);

        score.guess = null;
        score.actual = 0;
        expect(score.total).toBe(0);

        score.guess = null;
        score.actual = null;
        expect(score.total).toBe(0);

        score.guess = 1;
        score.actual = null;
        expect(score.total).toBe(0);

        score.guess = null;
        score.actual = 1;
        expect(score.total).toBe(0);

        score.guess = null;
        score.actual = null;
        expect(score.total).toBe(0);
    });

    it("should total 0 guess correctly", () => {
        ALL_ROUNDS.forEach((round) => {
            let possibleWins = new Array<number>(round + 1)
                .fill(0)
                .map((_, idx) => idx);

            possibleWins.forEach((aWin) => {
                expect(score(0, aWin, round).total)
                    .toBe(round * 10 * (0 === aWin ? 1 : -1), `round/wins: ${round}/0/${aWin}`);
            });
        });
    });

    it("should total correct guesses (>=1) correctly", () => {
        expect(score(1, 0, 1).total).toBe(-10);
        expect(score(1, 1, 1).total).toBe(20);
        //TODO: throw if more wins than possible in round?
        expect(score(1, 0, 5).total).toBe(-10);
        expect(score(1, 1, 5).total).toBe(20);

        expect(score(2, 0, 5).total).toBe(-20);
        expect(score(2, 1, 5).total).toBe(-10);
        expect(score(2, 2, 5).total).toBe(40);
        expect(score(2, 3, 5).total).toBe(-10);
        expect(score(2, 4, 5).total).toBe(-20);

        expect(score(8, 7, 10).total).toBe(-10);
        expect(score(8, 8, 10).total).toBe(160);
        expect(score(8, 9, 10).total).toBe(-10);
        expect(score(8, 10, 10).total).toBe(-20);
    });

    it("should calculate skull king bonuc correctly", () => {
        // just for reference: win, no bonus
        expect(score(1, 1, 5, null, null).total).toBe(20);

        expect(score(1, 1, 5, 0, null).total).toBe(20);
        expect(score(1, 1, 5, 1, null).total).toBe(50);
        expect(score(1, 1, 5, 2, null).total).toBe(80);

        expect(score(1, 1, 5, null, 0).total).toBe(20);
        expect(score(1, 1, 5, null, 1).total).toBe(70);
        expect(score(1, 1, 5, null, 2).total).toBe(120);

        // just for reference: lose, no bonus
        expect(score(1, 0, 5, null, null).total).toBe(-10);

        expect(score(1, 0, 5, 0, null).total).toBe(-10);
        expect(score(1, 0, 5, 1, null).total).toBe(-10);
        expect(score(1, 0, 5, 2, null).total).toBe(-10);

        expect(score(1, 0, 5, null, 0).total).toBe(-10);
        expect(score(1, 0, 5, null, 1).total).toBe(-10);
        expect(score(1, 0, 5, null, 2).total).toBe(-10);
    });

});
