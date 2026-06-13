describe("factorial", () => {
  test("returns 1 for 0", () => {
    expect(factorial(0)).toBe(1);
  });
  test("returns 1 for 1", () => {
    expect(factorial(1)).toBe(1);
  });
  test("calculates 5! = 120", () => {
    expect(factorial(5)).toBe(120);
  });
  test("returns NaN for negative input", () => {
    expect(factorial(-1)).toBeNaN();
  });
  test("returns Infinity for n > 170", () => {
    expect(factorial(171)).toBe(Infinity);
  });
});

describe("isPrime", () => {
  test("returns false for numbers <= 1", () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
  });
  test("returns true for 2", () => {
    expect(isPrime(2)).toBe(true);
  });
  test("returns true for prime numbers", () => {
    expect(isPrime(3)).toBe(true);
    expect(isPrime(17)).toBe(true);
    expect(isPrime(97)).toBe(true);
    expect(isPrime(7919)).toBe(true);
  });
  test("returns false for composite numbers", () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(15)).toBe(false);
    expect(isPrime(100)).toBe(false);
  });
});

describe("combination (nCr)", () => {
  test("returns 1 when k=0 or k=n", () => {
    expect(combination(5, 0)).toBe(1);
    expect(combination(5, 5)).toBe(1);
  });
  test("returns 0 when k > n", () => {
    expect(combination(3, 5)).toBe(0);
  });
  test("calculates 5C2 = 10", () => {
    expect(combination(5, 2)).toBe(10);
  });
  test("calculates 10C3 = 120", () => {
    expect(combination(10, 3)).toBe(120);
  });
  test("uses symmetry: nCr = nC(n-r)", () => {
    expect(combination(10, 3)).toBe(combination(10, 7));
  });
});

describe("trig functions", () => {
  test("sinDeg(0) = 0", () => {
    expect(sinDeg(0)).toBeCloseTo(0);
  });
  test("sinDeg(90) = 1", () => {
    expect(sinDeg(90)).toBeCloseTo(1);
  });
  test("cosDeg(0) = 1", () => {
    expect(cosDeg(0)).toBeCloseTo(1);
  });
  test("cosDeg(90) = 0", () => {
    expect(cosDeg(90)).toBeCloseTo(0);
  });
  test("tanDeg(45) = 1", () => {
    expect(tanDeg(45)).toBeCloseTo(1);
  });
  test("asinDeg(0) = 0", () => {
    expect(asinDeg(0)).toBeCloseTo(0);
  });
  test("asinDeg(1) = 90", () => {
    expect(asinDeg(1)).toBeCloseTo(90);
  });
  test("sinh(0) = 0", () => {
    expect(sinh(0)).toBe(0);
  });
  test("asinh(0) = 0", () => {
    expect(asinh(0)).toBe(0);
  });
});

describe("getWesternZodiac", () => {
  test("Pisces: Apr 10", () => {
    expect(getWesternZodiac(new Date(2000, 3, 10))).toBe("Pisces");
  });
  test("Aries: May 15", () => {
    expect(getWesternZodiac(new Date(2000, 4, 15))).toBe("Aries");
  });
  test("Cancer: Aug 10", () => {
    expect(getWesternZodiac(new Date(2000, 7, 10))).toBe("Cancer");
  });
  test("Capricorn: Jan 1", () => {
    expect(getWesternZodiac(new Date(2000, 0, 1))).toBe("Capricorn");
  });
  test("Sagittarius: Dec 31", () => {
    expect(getWesternZodiac(new Date(2000, 11, 31))).toBe("Sagittarius");
  });
});

describe("getChineseZodiac", () => {
  test("2020 is Year of the Rat", () => {
    expect(getChineseZodiac(2020)).toBe("Rat");
  });
  test("2024 is Year of the Dragon", () => {
    expect(getChineseZodiac(2024)).toBe("Dragon");
  });
  test("2025 is Year of the Snake", () => {
    expect(getChineseZodiac(2025)).toBe("Snake");
  });
  test("2000 is Year of the Dragon", () => {
    expect(getChineseZodiac(2000)).toBe("Dragon");
  });
});

describe("calculateAgeDetails", () => {
  test("returns correct age for known dates", () => {
    const birth = new Date(2000, 0, 1);
    const target = new Date(2025, 0, 1);
    const result = calculateAgeDetails(birth, target);
    expect(result.years).toBe(25);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
    expect(result.totalDays).toBe(9132);
  });
  test("calculates total hours correctly", () => {
    const birth = new Date(2000, 0, 1);
    const target = new Date(2025, 0, 1);
    const result = calculateAgeDetails(birth, target);
    expect(result.totalHours).toBe(9132 * 24);
  });
});

describe("normalizeSpeech", () => {
  test("converts number words to digits", () => {
    expect(normalizeSpeech("one plus two")).toContain("1");
    expect(normalizeSpeech("one plus two")).toContain("+");
    expect(normalizeSpeech("one plus two")).toContain("2");
  });
  test("converts operator words to symbols", () => {
    const tokens = normalizeSpeech("five times three");
    expect(tokens).toContain("5");
    expect(tokens).toContain("*");
    expect(tokens).toContain("3");
  });
  test("handles 'divided by'", () => {
    const tokens = normalizeSpeech("eight divided by two");
    expect(tokens).toContain("8");
    expect(tokens).toContain("/");
    expect(tokens).toContain("2");
  });
  test("handles 'multiplied by'", () => {
    const tokens = normalizeSpeech("seven multiplied by eight");
    expect(tokens).toContain("*");
  });
});

describe("numberToWords", () => {
  test("returns empty string for null/undefined", () => {
    expect(numberToWords(null)).toBe("");
    expect(numberToWords(undefined)).toBe("");
  });
  test("returns empty string for 0 due to !0 check in original code", () => {
    expect(numberToWords(0)).toBe("");
  });
  test("converts 1 to 'One'", () => {
    expect(numberToWords(1)).toBe("One");
  });
  test("converts 10 to 'Ten'", () => {
    expect(numberToWords(10)).toBe("Ten");
  });
  test("converts 15 to 'Fifteen'", () => {
    expect(numberToWords(15)).toBe("Fifteen");
  });
  test("converts 42 to 'Forty-Two'", () => {
    expect(numberToWords(42)).toBe("Forty-Two");
  });
  test("converts 100 to 'One Hundred'", () => {
    expect(numberToWords(100)).toBe("One Hundred");
  });
  test("converts 1000 to 'One Thousand'", () => {
    expect(numberToWords(1000)).toBe("One Thousand");
  });
  test("converts 1234 to words", () => {
    expect(numberToWords(1234)).toBe("One Thousand, Two Hundred Thirty-Four");
  });
  test("handles negative numbers", () => {
    expect(numberToWords(-42)).toBe("Negative Forty-Two");
  });
  test("handles decimal numbers", () => {
    const result = numberToWords(3.14);
    expect(result).toContain("Three");
    expect(result).toContain("Point");
    expect(result).toContain("One");
    expect(result).toContain("Four");
  });
});
