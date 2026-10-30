function compute(l, r) {
  let map = new Map();

  for (let index = 0; index < l.length; index++) {
    const element = l[index];

    if (map.has(element)) {
      const count = map.get(element) + 1;

      map.set(element, count);
    } else {
      map.set(element, 1);
    }
  }

  for (let index = 0; index < r.length; index++) {
    const element = r[index];

    if (map.has(element)) {
      if (map.get(element) != 0) {
        const reduce_count = map.get(element) - 1;

        map.set(element, reduce_count);

        if (reduce_count === 0) {
          map.delete(element);
        }
      }
    } else {
      return false;
    }
  }

  return map.size === 0;
}

console.log(compute("listen", "silent")); // true
console.log(compute("hello", "world")); // false
console.log(compute("anagram", "nagaram")); // true
console.log(compute("rat", "car")); // false
console.log(compute("aab", "abb")); // false

// iterate l dan simpan ke map key sebagai huruf, simpan value sebagai jumlah kemunculan
// iterate r dan jika di temukan huruh di l maka kurangi value
// jika value nya sudah 0 maka hapus key dari map
