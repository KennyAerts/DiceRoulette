// risk and payouts per bet

const payoutLookupValues = {
  column1: 5,
  column2: 5,
  column3: 5,
  column4: 5,
  column5: 5,
  column6: 5,
  firstHalfColumn: 1,
  secondHalfColumn: 1,
  first12Column: 2,
  second12Column: 2,
  third12Column: 2,
  row6: 5,
  row5: 5,
  row4: 5,
  row3: 5,
  row2: 5,
  row1: 5,
  secondHalfRow: 1,
  firstHalfRow: 1,
  third12Row: 2,
  second12Row: 2,
  first12Row: 2,
  secondQuarter: 3,
  fourthQuarter: 3,
  firstQuarter: 3,
  thirdQuarter: 3,
  odd: 1,
  even: 1,
  red: 1,
  blk: 1,
  same: 5, // trailing comma is valid
};

// Bets mapped to winning values

const column1 = [11, 12, 13, 14, 15, 16];
const column2 = [21, 22, 23, 24, 25, 26];
const column3 = [31, 32, 33, 34, 35, 36];
const column4 = [41, 42, 43, 44, 45, 46];
const column5 = [51, 52, 53, 54, 55, 56];
const column6 = [61, 62, 63, 64, 65, 66];

const firstHalfColumn = [11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36];
const secondHalfColumn = [41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56, 61, 62, 63, 64, 65, 66];

const first12Column = [11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26];
const second12Column = [31, 32, 33, 34, 35, 36, 41, 42, 43, 44, 45, 46];
const third12Column = [51, 52, 53, 54, 55, 56, 61, 62, 63, 64, 65, 66];

const row6 = [16,	26,	36,	46,	56, 66];
const row5 = [15,	25,	35,	45,	55, 65];
const row4 = [14,	24,	34,	44,	54, 64];
const row3 = [13,	23,	33,	43,	53, 63];
const row2 = [12,	22,	32,	42,	52, 62];
const row1 = [11,	21,	31,	41,	51, 61];

const secondHalfRow = [16,	26,	36,	46,	56, 66, 15,	25,	35,	45,	55, 65, 14,	24,	34,	44,	54, 64];
const firstHalfRow = [13,	23,	33,	43,	53, 63, 12,	22,	32,	42,	52, 62, 11,	21,	31,	41,	51, 61];

const third12Row = [16,	26,	36,	46,	56, 66, 15,	25,	35,	45,	55, 65];
const second12Row = [14, 24, 34, 44, 54, 64, 13, 23, 33, 43, 53, 63];
const first12Row = [12,	22,	32,	42,	52, 62, 11,	21,	31,	41,	51, 61];

const secondQuarter = [14, 15, 16, 24, 25, 26, 34, 35, 36];
const fourthQuarter = [44, 45, 46, 54, 55, 56, 64, 65, 66];
const firstQuarter = [11, 12, 13, 21, 22, 23, 31, 32, 33];
const thirdQuarter = [41, 42, 43, 51, 52, 53, 61, 62, 63];

const odd = [11, 13, 15, 21, 23, 25, 31, 33, 35, 41, 43, 45, 51, 53, 55, 61, 63, 65];
const even = [12, 14, 16, 22, 24, 26, 32, 34, 36, 42, 44, 46, 52, 54, 56, 62, 64, 66];

const red = [11, 12, 15, 16, 23, 24, 31, 32, 35, 36, 43, 44, 51, 52, 55, 56, 63, 64];
const blk = [13, 14, 21, 22, 25, 26, 33, 34, 41, 42, 45, 46, 53, 54, 61, 62, 65, 66];

const same = [11, 22, 33, 44, 55, 66];
