function compute(array) {
  let new_array = [];

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element % 2 === 0) {
      new_array.push(element);
    }
  }

  return new_array;
}

console.log(compute([1, 2, 3, 4, 5, 6]));
// [2, 4, 6]

console.log(compute([1, 3, 5]));
// []

console.log(compute([2, 4, 8]));
// [2, 4, 8]
