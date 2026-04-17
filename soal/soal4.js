// ============================================================
// Soal #4 - Dictionary Attack (Wordlist)
// Algoritma: hash = MD5(PIN) dari pinlist.txt
// Target   : 0110b96270248f746ecca06f1ce09746
// Jalankan : node soal4.js
// ============================================================

import { createHash } from "crypto";
import { readFileSync } from "fs";

const TARGET = "0110b96270248f746ecca06f1ce09746";

function md5(text) {
  return createHash("md5").update(text).digest("hex");
}

export function dictionaryAttack() {
  const candidates = readFileSync("pinlist.txt", "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const pin of candidates) {
    const hash = md5(pin);
    if (hash === TARGET) {
      return `PIN ditemukan: ${pin} → ${hash}`;
    }
  }
  return "PIN tidak ditemukan di wordlist";
}

// Jalankan langsung jika dipanggil via: node soal4.js
if (process.argv[1]?.endsWith("soal4.js")) {
  console.log("=== Soal #4: Dictionary Attack ===");
  console.log(`Target   : ${TARGET}`);
  console.log("Wordlist : pinlist.txt\n");

  const candidates = readFileSync("pinlist.txt", "utf-8")
    .split("\n").map((l) => l.trim()).filter(Boolean);
  console.log(`Total kandidat : ${candidates.length} PIN\n`);

  const start = Date.now();
  const result = dictionaryAttack();
  const elapsed = Date.now() - start;

  console.log(result);
  console.log(`Waktu : ${elapsed} ms`);
}
