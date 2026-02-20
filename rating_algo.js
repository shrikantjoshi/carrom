function calculateNewRatings(r1, r2, boards, scoreDiff) {
  const F = 400;
  const P = 5;

  let S = scoreDiff;
  let D = r1 - r2;

  let Sw = Math.sign(S) * Math.abs(S) *
      (1 + 0.3 *
      ((Math.pow(10, (Math.abs(S)/boards - P)) - 1) /
       (Math.pow(10, (Math.abs(S)/boards - P)) + 1)));

  let expected = 25 - (50 / (1 + Math.pow(10, D / F)));
  let Cr = Sw - expected;

  return {
    newR1: Math.round(r1 + Cr),
    newR2: Math.round(r2 - Cr)
  };
}

module.exports = calculateNewRatings;

