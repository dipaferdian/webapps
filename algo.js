function compute(array) {
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    if (array[left] != array[right]) return false;

    left++;
    right--;
  }

  return true;
}

console.log(compute("katak")); // true
console.log(compute("malam")); // true
console.log(compute("coding")); // false
console.log(compute("level")); // true
