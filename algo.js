function compute(array) {
  let slow = 0;
  let fast = 0;

  while (fast < array.length) {
    if (array[fast] != 0) {
      array[slow] = array[fast];
      array[fast] = 0;

      slow++;
    }

    fast++;
  }

  return array;
}

console.log(compute([0, 1, 0, 3, 12]));
// [1, 3, 12, 0, 0]
