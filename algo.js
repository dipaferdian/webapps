function compute(array) {
  let max_number = -Infinity;
  let second_number = null;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element > max_number) {
      second_number = max_number;
      max_number = element;
    } else {
      if (element != max_number) {
        if (element > second_number) {
          second_number = element;
        }
      }
    }
  }

  if (second_number === -Infinity) return null;

  return second_number;
}

console.log(compute([10, 5, 8, 10, 3]));
// Output: 8

console.log(compute([7, 7, 7]));
// null

console.log(compute([5, 5, 4]));
// 4

console.log(compute([-1, -5, -3]));
// -3

// jika ada yang lebih besar, maka ganti element yang besar, dan jadikan element yang sebelumnya sebagai element ke dua
// jika tidak ada element yang lebih besar, maka ambil element terbesar yang tersedia dan jangan ambil yang terbesar pertama
