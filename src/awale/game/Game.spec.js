import {
    create,
    playTurn,
} from './Game';

import createPlayer from '../player/Player';
import { initBoardTest } from '../board/Board';

describe('Game', () => {
    it('create should return current player One', () => {
        const game = create([createPlayer(0), createPlayer(1)]);
        expect(game.currentIndexPlayer).toEqual(0);
    });

    it('Play turn for new game should return expected game', () => {
        const game = create([createPlayer(0), createPlayer(1)]);
        const expectedGame = create([createPlayer(0), createPlayer(1)]);

        expectedGame.currentIndexPlayer = 1 - expectedGame.currentIndexPlayer;
        expectedGame.board = initBoardTest([
            4, 4, 4, 4, 4, 4,
            4, 0, 5, 5, 5, 5,
        ]);

        const currentGame = playTurn(game, 1);
        expect(currentGame).toEqual(expectedGame);
    });
});
