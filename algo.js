function compute(array) {
  let pointer1 = 0;
  let pointer2 = 0;

  while (pointer2 < array.length) {
    if (array[pointer2] != 0) {
      array[pointer1] = array[pointer2];
      array[pointer2] = 0;

      pointer1++;
    }

    pointer2++;
  }

  return array;
}

console.log(compute([0, 1, 0, 3, 12]));
// [1, 3, 12, 0, 0]

console.log(compute([0, 0, 1]));
// [1, 0, 0]

console.log(compute([1, 2, 3]));
// [1, 2, 3]
