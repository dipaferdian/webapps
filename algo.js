function compute(array, n) {
  let set = new Set();

  for (let index = 0; index < n; index++) {
    const number = index + 1;

    set.add(number);
  }

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (set.has(element)) set.delete(element);
  }

  return [...set.values()][0];
}

console.log(compute([5, 1, 4, 2], 5));

console.log(compute([5, 1, 4, 3], 5));

// simpan n perulangan index + 1 kedalam hash set
// cari angka yang sama dengan di hash set
// jika ditemukan, maka delete key dari hash set
