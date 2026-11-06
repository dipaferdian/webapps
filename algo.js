function compute(array, target) {
  let pairs = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    for (let j = 0; j < i; j++) {
      const sub_element = array[j];

      const sum = element + sub_element;

      if (sum === target) {
        pairs.push(sub_element, element);
      }

      if (pairs.length == 2) return pairs;
    }
  }

  return null;
}

console.log(compute([1, 2, 3, 4], 5));
// [2, 3]

console.log(compute([1, 2, 3, 4], 8));
// null

console.log(compute([5, 5, 10], 10));
// [5, 5]
