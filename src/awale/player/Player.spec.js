import create from './Player';

describe('Player', () => {
    it('create player 0 should return valid player', () => {
        expect(create(0)).toEqual({
            number: 0,
            isHuman: true,
            minPosition: 0,
            maxPosition: 6,
            minPick: 6,
            maxPick: 12,
        });
    });

    it('create player 2 should return valid player', () => {
        expect(create(1, false)).toEqual({
            number: 1,
            isHuman: false,
            minPosition: 6,
            maxPosition: 12,
            minPick: 0,
            maxPick: 6,
        });
    });
});
