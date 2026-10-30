function compute(array) {
  const get_last_element = array.pop();

  array.unshift(get_last_element);

  return array;
}

console.log(compute([1, 2, 3, 4]));
// [4, 1, 2, 3]

console.log(compute(["a", "b", "c"]));
// ["c", "a", "b"]

console.log(compute([10]));
// [10]
