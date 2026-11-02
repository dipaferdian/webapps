function compute(array) {
  let first = 0;
  let last = array.length - 1;

  while (first < last) {
    const temp = array[first];

    array[first] = array[last];
    array[last] = temp;

    first++;
    last--;
  }

  return array;
}

console.log(compute([1, 2, 3, 4]));
// [4, 2, 3, 1]

console.log(compute([10, 20, 30]));
// [30, 20, 10]

console.log(compute([5]));
// [5]
