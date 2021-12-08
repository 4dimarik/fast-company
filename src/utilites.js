export function numeralsWithNouns(num, nouns) {
    if (num === 1 || (num > 20 && +String(num)[1] === 1)) {
        return nouns[0];
    } else if ((num > 1 && num < 5) || (num > 21 && +String(num)[1] > 1 && +String(num)[1] < 5)) {
        return nouns[1];
    } else if (num === 0 || (num > 4 && num < 21) || (num > 21 && +String(num)[1] > 4) || +String(num)[1] === 0) {
        return nouns[2];
    }
}