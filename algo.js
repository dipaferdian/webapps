function compute(array) {
  let pointer1 = 0;
  let pointer2 = 0;

  while (pointer2 < array.length) {
    if (array[pointer2] !== 0) {
      const temporary = array[pointer2];

      array[pointer2] = array[pointer1];
      array[pointer1] = temporary;

      pointer1++;
    }

    pointer2++;
  }

  return array;
}

console.log(compute([0, 1, 0, 3, 12]));
console.log(compute([1, 0, 12]));

// cari angka yang bukan nol, jika ada, maka pointer 2 tukar element nya dengan pointer 1, dan pointer 1 maju satu langkah
// pointer 2 tetap melangkah sampai akhir
