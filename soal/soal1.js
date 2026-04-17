// ============================================================
// Soal #1 - Brute-force Plain
// Algoritma: hash = MD5(PIN)
// Target   : 0110b96270248f746ecca06f1ce09746
// Jalankan : node soal1.js
// ============================================================

import { createHash } from "crypto";

const TARGET = "0110b96270248f746ecca06f1ce09746";

function md5(text) {
  return createHash("md5").update(text).digest("hex");
}

export function bruteForcePlain() {
  for (let i = 0; i <= 999999; i++) {
    const pin = String(i).padStart(6, "0");
    const hash = md5(pin);
    if (hash === TARGET) {
      return `${pin} → ${hash}`;
    }
  }
  return "PIN tidak ditemukan";
}

// Jalankan langsung jika dipanggil via: node soal1.js
if (process.argv[1]?.endsWith("soal1.js")) {
  console.log("=== Soal #1: Brute-force Plain ===");
  console.log(`Target : ${TARGET}`);
  console.log("Mencari PIN dari 000000 sampai 999999...\n");

  const start = Date.now();
  const result = bruteForcePlain();
  const elapsed = Date.now() - start;

  const [pin, hash] = result.split(" → ");
  console.log(`PIN ditemukan : ${pin}`);
  console.log(`Hash          : ${hash}`);
  console.log(`Waktu         : ${elapsed} ms`);
}
