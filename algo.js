function compute(array) {
  const get_first_element = array.shift();

  array.push(get_first_element);

  return array;
}

console.log(compute([1, 2, 3, 4]));
// [2, 3, 4, 1]

console.log(compute(["a", "b", "c"]));
// ["b", "c", "a"]

console.log(compute([10]));
// [10]
