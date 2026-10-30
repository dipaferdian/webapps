function compute(l, r) {
  let pointer1 = 0;
  let pointer2 = 0;
  let new_array = [];

  while (pointer1 < l.length && pointer2 < r.length) {
    if (l[pointer1] < r[pointer2]) {
      new_array.push(l[pointer1]);
      pointer1++;
    } else {
      new_array.push(r[pointer2]);
      pointer2++;
    }
  }

  while (pointer1 < l.length) {
    new_array.push(l[pointer1]);

    pointer1++;
  }

  while (pointer2 < r.length) {
    new_array.push(r[pointer2]);

    pointer2++;
  }

  return new_array;
}

console.log(compute([1, 3, 5], [2, 4, 6]));
// [1, 2, 3, 4, 5, 6]

// pointer 1 dan pointer 2 bergerak maju
// jika pointer 1 lebih besar dari pointer 2, maka push ke new_array, dan pointer1 bergerak
// jika pointer 2 lebih kecil dari pointer 1, maka push ke new_array, dan pointer2 bergerak
