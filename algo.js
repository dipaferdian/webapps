function compute(array) {
  let new_array = [];

  for (let index = 0; index < array.length; index++) {
    for (let check = 0; check < index; check++) {
      new_array.push([array[check], array[index]]);
    }
  }

  return new_array;
}

console.log(compute([1, 2, 3]));
// [[1, 2], [1, 3], [2, 3]]

console.log(compute([4, 5, 6, 7]));
// [[4, 5], [4, 6], [4, 7], [5, 6], [5, 7], [6, 7]]

console.log(compute([10, 20]));
// [[10, 20]]

console.log(compute([5]));
// []
