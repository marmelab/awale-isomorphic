import {
    create,
    dealPosition,
    isStarving,
    isPickPossible,
    pick,
    canPlayerPlayPosition,
    initBoardTest,
    canFeedPlayer,
    getWinner,
} from './Board';

import { GAME_CONTINUE } from '../constants/Constants';
import createPlayer from '../player/Player';

describe('Board', () => {
    it('create should return valid board', () => {
        const expectedBoard = Array(12).fill(4);
        expect(create()).toEqual(expectedBoard);
    });

    it('Board size even should throw an Error on invalid board size', () => {
        const evenSizeBoard = () => {
            create(13, 4);
        };
        expect(evenSizeBoard).toThrowError();
    });

    it('Is pick posible should return true for position zero', () => {
        const board = create();
        board[0] = 2;
        expect(isPickPossible(board, 0, 5, 0)).toEqual(true);
    });

    it('Is pick posible should return false for position zero', () => {
        const board = create();
        board[0] = 2;
        expect(isPickPossible(board, 6, 11, 0)).toEqual(false);
    });

    it('Is starving for empty side should return true', () => {
        const board = create();
        for (let i = 6; i <= 11; i += 1) {
            board[i] = 0;
        }
        expect(isStarving(board, 6, 11)).toEqual(true);
    });

    it('Is starving for new board should return false', () => {
        const board = create();
        expect(isStarving(board, 0, 5)).toEqual(false);
    });

    it('Is starving for empty board should return true', () => {
        const board = create(12, 0);
        expect(isStarving(board, 0, 5)).toEqual(true);
    });

    it('Can feed player for new board should return true', () => {
        const board = create();
        const playerOne = createPlayer(0);
        expect(canFeedPlayer(playerOne, board)).toEqual(true);
    });

    it('Can feed player for empty board should return true', () => {
        const board = create();
        for (let i = 6; i <= 11; i += 1) {
            board[i] = 0;
        }
        const playerOne = createPlayer(0);
        expect(canFeedPlayer(playerOne, board)).toEqual(true);
    });

    it('Can feed player for empty side position should return false', () => {
        const board = create(12, 0);
        board[0] = 5;
        board[1] = 0;
        board[2] = 2;
        board[3] = 0;
        board[4] = 1;
        board[5] = 0;

        const playerOne = createPlayer(0);
        expect(canFeedPlayer(playerOne, board)).toEqual(false);
    });

    it('Deal position for new board should return four', () => {
        const board = create();
        const deal = dealPosition(board, 0);

        const expectedBoard = initBoardTest([
            4, 4, 4, 4, 4, 4,
            0, 5, 5, 5, 5, 4,
        ]);

        expect(deal.board).toEqual(expectedBoard);
        expect(deal.endPosition).toEqual(4);
    });

    it('Deal position for empty side board should return nine', () => {
        const board = initBoardTest([
            0, 0, 0, 0, 0, 0,
            4, 4, 4, 4, 4, 4,
        ]);
        const deal = dealPosition(board, 5);

        const expectedBoard = initBoardTest([
            0, 0, 1, 1, 1, 1,
            4, 4, 4, 4, 4, 0,
        ]);

        expect(deal.board).toEqual(expectedBoard);
        expect(deal.endPosition).toEqual(9);
    });

    it('Deal position for 13 pebble board should return seven', () => {
        const board = initBoardTest([
            0, 0, 0, 0, 0, 0,
            4, 4, 4, 4, 14, 4,
        ]);
        const deal = dealPosition(board, 4);

        const expectedBoard = initBoardTest([
            1, 1, 1, 1, 2, 2,
            5, 5, 5, 5, 0, 6,
        ]);

        expect(deal.board).toEqual(expectedBoard);
        expect(deal.endPosition).toEqual(7);
    });

    it('Pick for new board should return empty score', () => {
        const board = create();
        const playerOne = createPlayer(0);
        const newResult = pick(playerOne, board, 6, [0, 0]);
        expect(newResult.score).toEqual([0, 0]);
    });

    it('Pick for empty side should return empty score', () => {
        const board = initBoardTest([
            0, 0, 0, 0, 0, 0,
            4, 4, 4, 4, 4, 4,
        ]);
        const playerOne = createPlayer(0);
        const newResult = pick(playerOne, board, 6, [0, 0]);
        expect(newResult.score).toEqual([0, 0]);
    });

    it('Pick for position with empty side should return 7 score', () => {
        const board = initBoardTest([
            5, 4, 1, 2, 1, 0,
            4, 4, 4, 4, 4, 4,
        ]);
        const playerOne = createPlayer(0);
        const newResult = pick(playerOne, board, 5, [0, 0]);
        expect(newResult.score).toEqual([7, 0]);
    });

    it('Can player play position for new board should return true', () => {
        const board = create();
        const playerOne = createPlayer(0);
        expect(canPlayerPlayPosition(playerOne, board, 0)).toEqual(true);
    });

    it('Can player play position for new board should return true', () => {
        const board = create();
        const playerOne = createPlayer(0);
        expect(canPlayerPlayPosition(playerOne, board, 99)).toEqual(false);
    });

    it('Get winner for max score should return player one', () => {
        const board = create();
        const playerOne = createPlayer(0);
        expect(getWinner(playerOne, board, [48, 0])).toEqual(0);
    });

    it('Get winner for zero score should return player one', () => {
        const board = create();
        const playerTwo = createPlayer(1);
        expect(getWinner(playerTwo, board, [48, 0])).toEqual(0);
    });

    it('Get winner for zero score should return player one', () => {
        const board = create();
        const playerOne = createPlayer(0);
        expect(getWinner(playerOne, board, [20, 10])).toEqual(GAME_CONTINUE);
    });
});
