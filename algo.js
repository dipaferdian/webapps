function compute(array1, array2) {
  let pointer1 = 0;
  let pointer2 = 0;
  let new_array = [];

  while (pointer1 < array1.length && pointer2 < array2.length) {
    if (array1[pointer1] > array2[pointer2]) {
      new_array.push(array2[pointer2]);
      pointer2++;
    } else {
      new_array.push(array1[pointer1]);
      pointer1++;
    }
  }

  while (pointer1 < array1.length) {
    new_array.push(array1[pointer1]);

    pointer1++;
  }

  while (pointer2 < array2.length) {
    new_array.push(array2[pointer2]);

    pointer2++;
  }

  return new_array;
}

console.log(compute([1, 3, 5], [2, 4, 6]));
// [1, 2, 3, 4, 5, 6]

console.log(compute([1, 2, 8], [3, 4, 5]));
// [1, 2, 3, 4, 5, 8]

console.log(compute([], [1, 2]));
// [1, 2]
