function compute(array) {
  let slow = 0;
  let fast = 0;

  while (fast < array.length) {
    if (array[slow] != array[fast]) {
      slow++;
      array[slow] = array[fast];
    }

    fast++;
  }

  array.length = slow + 1;

  return array;
}

console.log(compute([1, 1, 2]));
// [1, 2]

console.log(compute([0, 0, 1, 1, 2, 2, 3]));
// [0, 1, 2, 3]

console.log(compute([1, 2, 3]));
// [1, 2, 3]
