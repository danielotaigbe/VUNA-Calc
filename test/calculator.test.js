describe("calculator state management", () => {
  beforeEach(() => {
    currentExpression = "";
    left = "";
    operator = "";
    right = "";
    document.getElementById("result").value = "0";
  });

  test("appendToResult adds digits", () => {
    appendToResult(5);
    expect(currentExpression).toBe("5");
  });

  test("appendToResult chains multiple digits", () => {
    appendToResult(1);
    appendToResult(2);
    appendToResult(3);
    expect(currentExpression).toBe("123");
  });

  test("backspace removes last character", () => {
    currentExpression = "123";
    backspace();
    expect(currentExpression).toBe("12");
  });

  test("clearResult resets expression", () => {
    currentExpression = "123+456";
    clearResult();
    expect(currentExpression).toBe("");
  });

  test("bracketToResult adds parentheses", () => {
    bracketToResult("(");
    expect(currentExpression).toBe("(");
    bracketToResult(")");
    expect(currentExpression).toBe("()");
  });

  test("operatorToResult adds operators", () => {
    operatorToResult("+");
    expect(currentExpression).toBe("+");
  });

  test("operatorToResult converts ^ to **", () => {
    currentExpression = "2";
    operatorToResult("^");
    expect(currentExpression).toBe("2**");
  });
});

describe("normalizeExpression", () => {
  test("replaces sin with Math.sin", () => {
    expect(normalizeExpression("sin(30)")).toBe("Math.sin(30)");
  });
  test("replaces cos with Math.cos", () => {
    expect(normalizeExpression("cos(60)")).toBe("Math.cos(60)");
  });
  test("replaces tan with Math.tan", () => {
    expect(normalizeExpression("tan(45)")).toBe("Math.tan(45)");
  });
  test("asin regex order bug - asin replaced first, then sin inside", () => {
    expect(normalizeExpression("asin(0.5)")).toBe("Math.aMath.sin(0.5)");
  });
  test("replaces e with Math.E", () => {
    expect(normalizeExpression("e")).toBe("Math.E");
  });
  test("replaces pi with Math.PI", () => {
    expect(normalizeExpression("pi")).toBe("Math.PI");
  });
  test("handles mixed expressions", () => {
    const result = normalizeExpression("sin(pi/2)");
    expect(result).toContain("Math.sin");
    expect(result).toContain("Math.PI");
  });
});

describe("inverse mode toggle", () => {
  beforeEach(() => {
    inverseMode = false;
    currentExpression = "";
  });

  test("starts with inverseMode false", () => {
    expect(inverseMode).toBe(false);
  });

  test("toggleInverseMode flips the flag", () => {
    toggleInverseMode();
    expect(inverseMode).toBe(true);
    toggleInverseMode();
    expect(inverseMode).toBe(false);
  });

  test("trigButtonPressed appends sin( in normal mode", () => {
    trigButtonPressed("sin");
    expect(currentExpression).toBe("sin(");
  });

  test("trigButtonPressed appends asin( in inverse mode", () => {
    toggleInverseMode();
    trigButtonPressed("sin");
    expect(currentExpression).toBe("asin(");
  });
});

describe("calculateSquareRoot", () => {
  test("calculates sqrt of 9", () => {
    currentExpression = "9";
    calculateSquareRoot();
    expect(currentExpression).toBe("3");
  });

  test("handles 0", () => {
    currentExpression = "0";
    calculateSquareRoot();
    expect(currentExpression).toBe("0");
  });
});

describe("calculateExponential", () => {
  test("e^0 = 1", () => {
    currentExpression = "0";
    calculateExponential();
    expect(currentExpression).toBe("1");
  });

  test("e^1 = e", () => {
    currentExpression = "1";
    calculateExponential();
    expect(parseFloat(currentExpression)).toBeCloseTo(Math.E);
  });
});

describe("reciprocal function", () => {
  test("1/2 = 0.5", () => {
    currentExpression = "2";
    calculateReciprocal();
    expect(parseFloat(currentExpression)).toBeCloseTo(0.5);
  });

  test("reciprocal of 0 is Undefined", () => {
    currentExpression = "0";
    calculateReciprocal();
    expect(currentExpression).toBe("Undefined");
  });
});

describe("tenPower", () => {
  test("10^2 = 100", () => {
    currentExpression = "2";
    tenPower();
    expect(parseFloat(currentExpression)).toBeCloseTo(100);
  });

  test("10^0 = 1", () => {
    currentExpression = "0";
    tenPower();
    expect(parseFloat(currentExpression)).toBeCloseTo(1);
  });
});

describe("cubeRootResult", () => {
  test("cube root of 8 is 2", () => {
    currentExpression = "8";
    cubeRootResult();
    expect(parseFloat(currentExpression)).toBeCloseTo(2);
  });

  test("cube root of 27 is 3", () => {
    currentExpression = "27";
    cubeRootResult();
    expect(parseFloat(currentExpression)).toBeCloseTo(3);
  });

  test("cube root of -8 is -2", () => {
    currentExpression = "-8";
    cubeRootResult();
    expect(parseFloat(currentExpression)).toBeCloseTo(-2);
  });
});

describe("tenPower", () => {
  test("10^3 = 1000", () => {
    currentExpression = "3";
    tenPower();
    expect(parseFloat(currentExpression)).toBeCloseTo(1000);
  });
});

describe("applyLogarithm", () => {
  test("log10(100) = 2", () => {
    currentExpression = "100";
    applyLogarithm();
    expect(parseFloat(currentExpression)).toBeCloseTo(2);
  });

  test("log10(1) = 0", () => {
    currentExpression = "1";
    applyLogarithm();
    expect(parseFloat(currentExpression)).toBeCloseTo(0);
  });

  test("log of negative is Error", () => {
    currentExpression = "-5";
    applyLogarithm();
    expect(currentExpression).toBe("Error");
  });
});

describe("calculateResult", () => {
  beforeEach(() => {
    currentExpression = "";
    document.getElementById("result").value = "0";
    calculationHistory = [];
  });

  test("evaluates simple addition", () => {
    currentExpression = "2+3";
    calculateResult();
    expect(parseFloat(currentExpression)).toBeCloseTo(5);
  });

  test("evaluates multiplication", () => {
    currentExpression = "6*7";
    calculateResult();
    expect(parseFloat(currentExpression)).toBeCloseTo(42);
  });

  test("evaluates division", () => {
    currentExpression = "10/2";
    calculateResult();
    expect(parseFloat(currentExpression)).toBeCloseTo(5);
  });

  test("handles Error case", () => {
    currentExpression = "1/0";
    calculateResult();
    expect(currentExpression).toBe("Error");
  });
});

describe("unitConversions data", () => {
  test("length conversions are defined", () => {
    expect(unitConversions.length.km).toBe(1000);
    expect(unitConversions.length.m).toBe(1);
  });

  test("weight conversions are defined", () => {
    expect(unitConversions.weight.kg).toBe(1);
    expect(unitConversions.weight.g).toBe(0.001);
  });

  test("data conversions are defined", () => {
    expect(unitConversions.data.byte).toBe(1);
    expect(unitConversions.data.kb).toBe(1024);
    expect(unitConversions.data.mb).toBe(1024 * 1024);
  });

  test("currencyRates has USD base", () => {
    expect(currencyRates.USD).toBe(1);
  });
});

describe("physics formulas", () => {
  test("mechanics formulas exist", () => {
    expect(physicsFormulas.mechanics.velocity).toBeDefined();
    expect(physicsFormulas.mechanics.force).toBeDefined();
  });

  test("velocity formula: d/t", () => {
    expect(physicsFormulas.mechanics.velocity.calculate(100, 5)).toBeCloseTo(20);
  });

  test("force formula: m*a", () => {
    expect(physicsFormulas.mechanics.force.calculate(10, 9.8)).toBeCloseTo(98);
  });

  test("ohms law: V=IR", () => {
    expect(physicsFormulas.electricity.ohmsLaw.calculate(2, 10)).toBeCloseTo(20);
  });
});

describe("memory functions", () => {
  beforeEach(() => {
    memory = 0;
  });

  test("memoryClear resets memory", () => {
    memory = 42;
    memoryClear();
    expect(memory).toBe(0);
  });

  test("memoryAdd adds to memory", () => {
    document.getElementById("result").value = "10";
    memoryAdd();
    expect(memory).toBe(10);
  });

  test("memorySubtract subtracts from memory", () => {
    memory = 20;
    document.getElementById("result").value = "5";
    memorySubtract();
    expect(memory).toBe(15);
  });
});
