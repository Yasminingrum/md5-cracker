// ============================================================
// app.js - Menu utama MD5 PIN Cracker
// Jalankan: node app.js  atau  npm start
// ============================================================

import inquirer from "inquirer";
import { bruteForcePlain }    from "./soal/soal1.js";
import { bruteForceUnknownSalt } from "./soal/soal2.js";
import { bruteForceKDF3 }     from "./soal/soal3.js";
import { dictionaryAttack }   from "./soal/soal4.js";

function timeExecution(label, fn) {
  const start = Date.now();
  const result = fn();
  const elapsed = Date.now() - start;
  const summary = `Waktu eksekusi ${label}: ${elapsed} ms, PIN ditemukan: ${result}`;
  console.log(summary);
  return summary;
}

async function main() {
  console.log("\n=== Aplikasi Brute Force Password ===\n");

  const data = [];
  let lanjut = true;

  while (lanjut) {
    const { pilihan } = await inquirer.prompt([
      {
        type: "list",
        name: "pilihan",
        message: "Pilih jenis brute force:",
        choices: [
          { name: "Brute Force Plain",                value: "plain"      },
          { name: "Brute Force Unknown Salt",         value: "salted"     },
          { name: "Brute Force Unknown Salt + KDF 3", value: "kdf3"       },
          { name: "Dictionary Attack",                value: "dictionary" },
        ],
      },
    ]);

    let summary;
    if (pilihan === "plain") {
      summary = timeExecution("Brute Force Plain", bruteForcePlain);
    } else if (pilihan === "salted") {
      summary = timeExecution("Brute Force Unknown Salt", bruteForceUnknownSalt);
    } else if (pilihan === "kdf3") {
      summary = timeExecution("Brute Force Unknown Salt + KDF 3", bruteForceKDF3);
    } else if (pilihan === "dictionary") {
      summary = timeExecution("Brute Force Dictionary Attack", dictionaryAttack);
    }

    data.push(summary);

    const { lanjutLagi } = await inquirer.prompt([
      {
        type: "confirm",
        name: "lanjutLagi",
        message: "Ingin mencoba lagi?",
        default: true,
      },
    ]);

    lanjut = lanjutLagi;
  }

  console.log("\n=== Ringkasan Hasil ===");
  console.table(data);
}

main();
