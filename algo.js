function compute(array) {
  let max_profit = 0;
  let min_price = Infinity;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    min_price = Math.min(element, min_price);
    const profit = element - min_price;

    if (profit > max_profit) {
      max_profit = profit;
    }
  }

  return max_profit;
}

function test(input, expected) {
  const actual = compute(input);

  if (actual !== expected) {
    console.log("\x1b[31m❌ FAIL\x1b[0m");
    console.log(`input: ${JSON.stringify(input)}`);
    console.log(`expected: ${expected}`);
    console.log(`actual: ${actual}`);
    console.log("--------------------");
  }
}

test([7, 1, 5, 3, 6, 4], 5);
test([7, 6, 4, 3, 1], 0);
test([2, 4, 1], 2);
test([1, 2], 1);
test([2, 1, 2, 1, 0, 1, 2], 2);
test([3, 2, 6, 1, 4], 4);
test([5], 0);
test([2, 2, 2, 2], 0);
