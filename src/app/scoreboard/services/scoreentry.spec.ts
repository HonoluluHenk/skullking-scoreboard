import {ScoreboardService} from './scoreboard.service';
import {inject, TestBed} from '@angular/core/testing';
import {ScoreEntry} from './scoreentry';

fdescribe('ScoreEntry', () => {
    const ALL_ROUNDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const score = (guess: number, actual: number, round: number = 1) => {
        const score = new ScoreEntry(round);
        score.guess = guess;
        score.actual = actual;
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

    fit("should total 0 guess correctly", () => {
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
    })

});
