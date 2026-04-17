// ============================================================
// Soal #3 - Brute-force + Unknown Salt (1 digit) + KDF 3x
// Algoritma: h1=MD5(salt||PIN), h2=MD5(h1), h3=MD5(h2)
// Target   : b20f8b0405b88e2b0b50eb3356d34ba7
// Jalankan : node soal3.js
// ============================================================

import { createHash } from "crypto";

const TARGET = "b20f8b0405b88e2b0b50eb3356d34ba7";

function md5(text) {
  return createHash("md5").update(text).digest("hex");
}

export function bruteForceKDF3() {
  for (let salt = 0; salt <= 9; salt++) {
    for (let i = 0; i <= 999999; i++) {
      const pin = String(i).padStart(6, "0");
      const h1 = md5(salt + pin);
      const h2 = md5(h1);
      const h3 = md5(h2);
      if (h3 === TARGET) {
        return `${salt} + ${pin} → ${h3}`;
      }
    }
  }
  return "PIN tidak ditemukan";
}

// Jalankan langsung jika dipanggil via: node soal3.js
if (process.argv[1]?.endsWith("soal3.js")) {
  console.log("=== Soal #3: Brute-force + Unknown Salt + KDF 3x ===");
  console.log(`Target : ${TARGET}`);
  console.log("Setiap kandidat di-hash 3 kali berantai...\n");

  const start = Date.now();
  const result = bruteForceKDF3();
  const elapsed = Date.now() - start;

  const [saltPin, h3] = result.split(" → ");
  const [salt, pin] = saltPin.split(" + ");
  const h1 = md5(salt + pin);
  const h2 = md5(h1);

  function md5(text) { return createHash("md5").update(text).digest("hex"); }

  console.log(`PIN ditemukan : ${pin}`);
  console.log(`Salt          : ${salt}`);
  console.log(`h0 (input)    : ${salt}${pin}`);
  console.log(`h1 = MD5(h0)  : ${h1}`);
  console.log(`h2 = MD5(h1)  : ${h2}`);
  console.log(`h3 = MD5(h2)  : ${h3}`);
  console.log(`Waktu         : ${elapsed} ms`);
}
