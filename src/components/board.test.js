import React from 'react';
import { shallow } from 'enzyme';
import Board from './board';
import { create as createBoard } from '../awale/board/Board';

describe('<Board />', () => {
    it('should render default board player one', () => {
        const boardGame = createBoard();
        const board = shallow(
            <Board
                pickPebble={() => {}}
                board={boardGame}
                currentIndexPlayer={0}
            />);
        expect(board.length).toEqual(1);
        expect(board.find('PitButton').length).toEqual(12);
        expect(board.find('div.pit-bottom_color').exists()).toEqual(true);
        expect(board.find('div.pit-top_color').exists()).toEqual(false);
    });

    it('should render default board player two', () => {
        const boardGame = createBoard();
        const board = shallow(
            <Board
                pickPebble={() => {}}
                board={boardGame}
                currentIndexPlayer={1}
            />);
        expect(board.find('div.pit-top_color').exists()).toEqual(true);
        expect(board.find('div.pit-bottom_color').exists()).toEqual(false);
    });

    it('should render 4 pit on board', () => {
        const boardGame = createBoard(4, 4);
        const board = shallow(
            <Board
                pickPebble={() => {}}
                board={boardGame}
                currentIndexPlayer={0}
            />);
        expect(board.find('PitButton').length).toEqual(4);
    });
});
