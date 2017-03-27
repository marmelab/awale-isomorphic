import { PIT_COUNT } from '../constants/Constants';

export default function create(number, isHuman = true) {
    const halfPit = PIT_COUNT / 2;
    return {
        number,
        isHuman,
        minPosition: number * halfPit,
        maxPosition: (1 + number) * halfPit,
        minPick: (1 - number) * halfPit,
        maxPick: (2 - number) * halfPit,
    };
}
