function compute(array, target) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    for (let j = 0; j < i; j++) {
      const sub_element = array[j];

      const decreaseOne = element - sub_element;
      const decreaseSecond = sub_element - element;

      if (decreaseOne === target) {
        return [sub_element, element];
      }

      if (decreaseSecond === target) {
        return [sub_element, element];
      }
    }
  }

  return null;
}

console.log(compute([1, 5, 3, 8], 2));
// [1, 3]

console.log(compute([10, 4, 7, 2], 3));
// [10, 7]

console.log(compute([1, 2, 3, 4], 10));
// null

console.log(compute([5, 5, 8], 0));
// [5, 5]
