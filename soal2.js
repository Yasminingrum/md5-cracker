// ============================================================
// Soal #2 - Brute-force + Unknown Salt (1 digit)
// Algoritma: hash = MD5(salt || PIN), salt ∈ {"0",...,"9"}
// Target   : 8d4c531eb4b0f54df72aa6839abbeaec
// Jalankan : node soal2.js
// ============================================================

import { createHash } from "crypto";

const TARGET = "8d4c531eb4b0f54df72aa6839abbeaec";

function md5(text) {
  return createHash("md5").update(text).digest("hex");
}

export function bruteForceUnknownSalt() {
  for (let salt = 0; salt <= 9; salt++) {
    for (let i = 0; i <= 999999; i++) {
      const pin = String(i).padStart(6, "0");
      const hash = md5(salt + pin);
      if (hash === TARGET) {
        return `${salt} + ${pin} → ${hash}`;
      }
    }
  }
  return "PIN tidak ditemukan";
}

// Jalankan langsung jika dipanggil via: node soal2.js
if (process.argv[1]?.endsWith("soal2.js")) {
  console.log("=== Soal #2: Brute-force + Unknown Salt (1 digit) ===");
  console.log(`Target : ${TARGET}`);
  console.log("Mencari kombinasi salt (0-9) x PIN (000000-999999)...\n");

  for (let s = 0; s <= 9; s++) {
    process.stdout.write(`[salt = ${s}] sedang dicari...\n`);
  }

  const start = Date.now();
  const result = bruteForceUnknownSalt();
  const elapsed = Date.now() - start;

  const [saltPin, hash] = result.split(" → ");
  console.log(`\nDitemukan     : ${saltPin}`);
  console.log(`Hash          : ${hash}`);
  console.log(`Waktu         : ${elapsed} ms`);
}
