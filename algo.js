function compute(array) {
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    for (let j = 0; j < i; j++) {
      const sub_element = array[j];

      if (element === sub_element) {
        count++;
      }
    }
  }

  return count;
}

console.log(compute([1, 2, 1]));
// 1

console.log(compute([2, 2, 2]));
// 3

console.log(compute([1, 2, 3, 4]));
// 0

console.log(compute([5, 5, 3, 3]));
// 2
