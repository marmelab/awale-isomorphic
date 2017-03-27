import { PIT_COUNT, GAME_CONTINUE, PEBBLE_COUNT } from '../constants/Constants';

export function create(pitnumber = 12, pebblenumber = 4) {
    if (pitnumber <= 0 || pitnumber % 2 !== 0) {
        throw new Error('Board size must be even.');
    }

    return Array(pitnumber).fill(pebblenumber);
}

export function dealPosition(board, position) {
    const newBoard = board.slice(0);
    let i = position;
    let seeds = newBoard[position];
    newBoard[position] = 0;

    while (seeds > 0) {
        i += 1;
        if (i % PIT_COUNT !== position) {
            newBoard[i % PIT_COUNT] += 1;
            seeds -= 1;
        }
    }

    return { endPosition: i % PIT_COUNT, board: newBoard };
}

export function isStarving(board, minPick, maxPick) {
    return board.slice(minPick, maxPick).reduce((a, b) => a + b, 0) === 0;
}

export function isPickPossible(board, minPick, maxPick, position) {
    return (minPick <= position && position < maxPick &&
            board[position] >= 2 && board[position] <= 3);
}

export function pick(player, board, position, score) {
    const deal = dealPosition(board, position);
    const newScore = score.slice(0);

    while (isPickPossible(deal.board, player.minPick, player.maxPick, deal.endPosition)) {
        newScore[player.number] += deal.board[deal.endPosition];
        deal.board[deal.endPosition] = 0;
        deal.endPosition -= 1;
    }

    return { score: newScore, board: deal.board };
}

export function willStarvePlayer(player, board, position) {
    //  Fake pick to simulate next turn
    const newResult = pick(player, board, position, [0, 0]);
    return isStarving(newResult.board, player.minPick, player.maxPick);
}

export function canFeedPlayer(player, board) {
    for (let i = player.minPosition; i < player.maxPosition; i += 1) {
        const starving = willStarvePlayer(player, board, i);
        if (!starving) {
            return true;
        }
    }

    return false;
}

export function canPlayerPlayPosition(player, board, position) {
    const canPlayerMove = (player.minPosition <= position) && (position < player.maxPosition);
    if (!canPlayerMove) {
        return false;
    }

    const movePossible = canPlayerMove && (board[position] !== 0);
    if (isStarving(board, player.minPick, player.maxPick)) {
        const isStarv = willStarvePlayer(player, board, position);
        const canFeed = canFeedPlayer(player, board);
        return movePossible && (!isStarv || !canFeed);
    }

    return movePossible;
}

export function getWinner(player, board, score) {
    const minScore = ((PIT_COUNT * PEBBLE_COUNT) / 2);
    const starving = isStarving(board, player.minPick, player.maxPick);
    if (starving || score[player.number] > minScore) {
        return player.number;
    } else if (score[1 - player.number] > minScore) {
        return 1 - player.number;
    }

    return GAME_CONTINUE;
}

export function initBoardTest(b) {
    return [b[6], b[7], b[8], b[9], b[10], b[11], b[5], b[4], b[3], b[2], b[1], b[0]];
}
