function compute(array) {
  let slow = 0;
  let fast = 0;

  while (fast < array.length) {
    if (array[fast] % 2 === 0) {
      const temp = array[fast];

      array[fast] = array[slow];
      array[slow] = temp;

      slow++;
    }

    fast++;
  }

  return array;
}

console.log(compute([1, 2, 3, 4, 5, 6]));
// [2, 4, 6, 1, 5, 3]

console.log(compute([1, 3, 5]));
// [1, 3, 5]

console.log(compute([2, 4, 6]));
// [2, 4, 6]
