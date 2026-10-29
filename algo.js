function compute(s) {
  let map = new Map();

  for (let index = 0; index < s.length; index++) {
    const element = s[index];

    if (map.has(element)) {
      const count = map.get(element) + 1;

      map.set(element, count);
    } else {
      map.set(element, 1);
    }
  }

  if (map.size === 0) return null;

  for (const [key, value] of map) {
    if (value === 1) return key;
  }
}

console.log(compute("leetcode"));
console.log(compute("aabbcde"));

// simpan dan hitung jumlah kemculan huruf ke hash map
// jika di temukan lagi maka count value + 1
// iterate hasil hash map, kembalikan jika ditemukan value nya 1
