function compute(array, target) {
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    for (let j = 0; j < i; j++) {
      const sub_element = array[j];

      const sum = element + sub_element;

      if (sum === target) {
        count++;
      }
    }
  }

  return count;
}

console.log(compute([1, 2, 3, 4], 5));
// 2

console.log(compute([1, 2, 3, 4], 6));
// 1

console.log(compute([2, 2, 2], 4));
// 3

console.log(compute([1, 1, 1, 1], 2));
// 6
