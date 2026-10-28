function compute(array) {
  let left = 0;
  let right = 0;

  while (right < array.length) {
    if (array[right] != 0) {
      const temporary = array[right];

      array[right] = array[left];
      array[left] = temporary;

      left++;
    }

    right++;
  }

  return array;
}

function test(input, expected) {
  const nums = [...input];
  compute(nums);

  const actual = JSON.stringify(nums);

  if (actual !== JSON.stringify(expected)) {
    console.log("\x1b[31m❌ FAIL\x1b[0m");
    console.log(`input: ${JSON.stringify(input)}`);
    console.log(`expected: ${JSON.stringify(expected)}`);
    console.log(`actual: ${actual}`);
    console.log("--------------------");
  }
}

test([0, 1, 0, 3, 12], [1, 3, 12, 0, 0]);
test([0, 0, 1], [1, 0, 0]);
test([1, 2, 3], [1, 2, 3]);
test([0], [0]);
test([1, 0, 1], [1, 1, 0]);
test([4, 0, 0, 2, 0, 3], [4, 2, 3, 0, 0, 0]);
