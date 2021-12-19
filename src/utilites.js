export function numeralsWithNouns(num, nouns) {
  let noun = null;
  if (num === 1 || (num > 20 && +String(num)[1] === 1)) {
    [noun] = nouns;
  } else if ((num > 1 && num < 5) || (num > 21 && +String(num)[1] > 1 && +String(num)[1] < 5)) {
    [, noun] = nouns;
  } else if (
    num === 0 ||
    (num > 4 && num < 21) ||
    (num > 21 && +String(num)[1] > 4) ||
    +String(num)[1] === 0
  ) {
    [, , noun] = nouns;
  }
  return noun;
}

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}
