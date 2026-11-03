function compute(array) {
  let slow = 0;
  let fast = 0;

  while (fast < array.length) {
    if (array[fast] >= 0) {
      array[slow] = array[fast];

      slow++;
    }

    fast++;
  }

  array.length = slow;

  return array;
}

console.log(compute([1, -2, 3, -4, 5]));
// [1, 3, 5]

console.log(compute([-1, -2, 3, 4]));
// [3, 4]

console.log(compute([1, 2, 3]));
// [1, 2, 3]
