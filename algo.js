function compute(array) {
  let slow = 0;
  let fast = 0;

  while (fast < array.length) {
    if (array[fast] < 0) {
      const temp = array[fast];

      array[fast] = array[slow];
      array[slow] = temp;

      slow++;
    }

    fast++;
  }

  return array;
}

console.log(compute([1, -2, 3, -4, 5]));
// [-2, -4, 3, 1, 5]

console.log(compute([0, -1, 2, -3]));
// [-1, -3, 2, 0]

console.log(compute([1, 2, 3]));
// [1, 2, 3]
