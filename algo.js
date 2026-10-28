function compute(array) {
  let low_price = Infinity;
  let high_price = -Infinity;
  let low_move = 0;
  let high_move = 0;

  while (high_move < array.length) {
    if (array[low_move] < low_price) {
      low_price = array[low_move];

      high_move++;
    }

    if (array[high_move] > high_price) {
      high_price = array[high_move];
    }

    low_move++;
    high_move++;
  }

  console.log(low_price);
}

console.log(compute([7, 1, 5, 3, 6, 4]));
console.log(compute([7, 3, 2, 1]));
console.log(compute([3, 2, 1, 9]));
