function compute(array, target) {
  let count = 0;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element === target) {
      count++;
    }
  }

  return count;
}

console.log(compute([1, 2, 2, 3, 2], 2));
// 3

console.log(compute([1, 2, 3, 4], 5));
// 0

console.log(compute([5, 5, 5], 5));
// 3
