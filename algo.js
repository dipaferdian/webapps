function compute(array) {
  let count = 0;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element > 0) {
      count++;
    }
  }

  return count;
}

console.log(compute([-2, 5, 0, 8, -1, 3]));
