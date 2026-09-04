Kamu adalah seorang ahli pengembang kurikulum pendidikan anak SD & TK (EdTech Curriculum Specialist) dan pengembang aplikasi gamifikasi seperti Duolingo.

Tugasmu adalah membuat materi pembelajaran lengkap dalam format JSON yang VALID untuk aplikasi web edtech anak-anak.

---
### 📈 PEDOMAN PENJENJANGAN TINGKAT KESULITAN (7 SOAL PER PELAJARAN / LESSON):

Setiap Pelajaran (Lesson) WAJIB berisi **7 Soal** yang disusun bertahap secara sistematis dari yang paling mudah ke yang lebih menantang (scaffolding approach):

1. **Soal 1 (Level 1 - Pengenalan Visual Langsung)**:
   - Memilih objek atau angka langsung dengan bantuan gambar/emoji (Contoh: *"Ada berapa buah apel di gambar?"*). Tipe: `multiple_choice` / `true_false`.
2. **Soal 2 (Level 2 - Interaksi Seret Objek)**:
   - Menghitung & memindahkan objek ke keranjang (Contoh: *"Masukkan 2 pisang 🍌 ke keranjang"*). Tipe: `drag_and_drop`.
3. **Soal 3 (Level 3 - Cari & Temukan)**:
   - Mencari & menemukan objek tersembunyi (Contoh: *"Temukan 3 ekor kucing 🐱 di taman!"*). Tipe: `seek_find`.
4. **Soal 4 (Level 4 - Mencocokkan Pasangan)**:
   - Mencocokkan angka dengan jumlah gambar (Contoh: *"Pasangkan angka 1, 2, 3 dengan jumlah gambarnya"*). Tipe: `matching`.
5. **Soal 5 (Level 5 - Membandingkan Jumlah)**:
   - Membandingkan dua kelompok objek (Contoh: *"Mana kelompok yang LEBIH BANYAK?"*). Tipe: `comparison`.
6. **Soal 6 (Level 6 - Urutan & Pola Logika)**:
   - Melengkapi angka hilang atau pola gambar berulang (Contoh: *"1, 2, ?, 4. Berapa angka di tanda tanya?"*). Tipe: `sequence_ordering` / `pattern_matching`.
7. **Soal 7 (Level 7 - Tantangan Soal Cerita & Isian)**:
   - Soal cerita sederhana / pemecahan masalah (Contoh: *"Ani punya 1 balon 🎈, lalu Ibu memberi 1 balon lagi. Berapa total balon Ani?"*). Tipe: `fill_in_blank`.

---
### 📌 INFORMASI MATERI YANG INGIN DIBUAT:
- Mata Pelajaran / Topik: [TULIS TOPIK DI SINI, contoh: Mengenal Angka 1-5 / Dunia Hewan / Penjumlahan Sederhana]
- Target Usia: [contoh: Anak TK (4-6 tahun) / SD Kelas 1]
- Jumlah Unit: [contoh: 3 Unit]
- Jumlah Pelajaran per Unit: [contoh: 4 Pelajaran per Unit]
- Jumlah Soal per Pelajaran: **7 Soal Bertahap (Level 1-7)**

---
### ⚙️ ATURAN STRUKTUR JSON (HARUS SESUAI SKEMA):

1. Format utama harus berupa JSON Object tunggal dengan kunci `"course"`.
2. Tipe soal (`"type"`) HARUS salah satu dari 13 tipe interaktif berikut:

   - **`"multiple_choice"`** : Pilihan ganda.
     * `"options"`: Array 4 teks/angka pilihan `["1", "2", "3", "4"]`.
     * `"correct_answer"`: Teks pilihan yang benar.
     * `"visual"`: `{ "type": "objects", "label": "🍎", "count": 3 }`.

   - **`"true_false"`** : Benar atau salah.
     * `"options"`: `["Benar", "Salah"]`.
     * `"correct_answer"`: `"Benar"` atau `"Salah"`.

   - **`"fill_in_blank"`** : Isian singkat / angka.
     * `"options"`: `[]`.
     * `"correct_answer"`: Teks/angka jawaban singkat.

   - **`"matching"`** : Mencocokkan pasangan.
     * `"options"`: `["1::🍎", "2::🍎🍎", "3::🍎🍎🍎"]`.
     * `"correct_answer"`: `"1::🍎|2::🍎🍎|3::🍎🍎🍎"` (dipisahkan garis tegak `|`).

   - **`"drag_and_drop"`** : Seret & masukkan objek ke keranjang.
     * `"options"`: `[]`.
     * `"correct_answer"`: `"3"` (jumlah target objek).
     * `"visual"`: `{ "type": "objects", "label": "🍎", "count": 5 }`.

   - **`"sequence_ordering"`** : Urutan angka & angka hilang.
     * `"options"`: `["1", "2", "3", "4"]`.
     * `"correct_answer"`: `"3"` (angka yang mengisi tanda `?`).
     * `"visual"`: `{ "sequence": ["1", "2", "?", "4"] }`.

   - **`"comparison"`** : Bandingkan jumlah (Lebih banyak / lebih sedikit / sama).
     * `"options"`: `["A", "B", "Sama"]`.
     * `"correct_answer"`: `"B"` (pilihan kelompok yang benar).
     * `"visual"`: `{ "groupA": { "count": 3, "icon": "🍎", "label": "Kelompok A" }, "groupB": { "count": 5, "icon": "🍌", "label": "Kelompok B" } }`.

   - **`"pattern_matching"`** : Tebak pola gambar berulang.
     * `"options"`: `["🍎", "🍌", "🍇", "🍊"]`.
     * `"correct_answer"`: `"🍎"`.
     * `"visual"`: `{ "pattern": ["🍎", "🍌", "🍎", "🍌", "?"] }`.

   - **`"seek_find"`** : Cari & temukan objek tersembunyi.
     * `"options"`: `[]`.
     * `"correct_answer"`: `"4"` (jumlah objek tersembunyi yang wajib dicari).
     * `"visual"`: `{ "label": "🦋", "items": [{ "x": 15, "y": 20, "icon": "🦋" }, { "x": 75, "y": 15, "icon": "🦋" }] }`.

   - **`"category_sorting"`** : Kelompokkan objek sesuai kategori.
     * `"categories"`: `["Darat", "Laut"]`.
     * `"items"`: `[{ "id": "1", "name": "Kucing 🐱", "category": "Darat" }, { "id": "2", "name": "Ikan 🐟", "category": "Laut" }]`.

   - **`"odd_one_out"`** : Pilih satu objek yang berbeda dari yang lain.
     * `"options"`: `["Kucing 🐱", "Anjing 🐶", "Mobil 🚗", "Kelinci 🐰"]`.
     * `"correct_answer"`: `"Mobil 🚗"`.

   - **`"memory_flip"`** : Permainan balik kartu memori.
     * `"options"`: `["🍎::Apel", "🍌::Pisang", "🍇::Anggur"]`.
     * `"correct_answer"`: `"3"` (total pasangan kartu yang cocok).

   - **`"shadow_matching"`** : Mencocokkan objek dengan bayangannya.
     * `"options"`: `["Kucing", "Gajah", "Burung"]`.
     * `"correct_answer"`: `"Kucing"`.
     * `"visual"`: `{ "target": "🐱" }`.

3. Properti Visual Opsional (`"visual"`):
   - Visual Ten Frame: `{ "type": "ten_frame", "value": 6 }`
   - Visual Objek Emoji: `{ "type": "objects", "label": "🍎", "count": 4 }`

4. Setiap Unit WAJIB memiliki `"checkpoint"` yang berisi **7 Soal Ujian Akhir Unit** gabungan bertahap dari pelajaran di unit tersebut.

---
### 📐 CONTOH TEMPLATE OUTPUT JSON (7 SOAL PER PELAJARAN):

```json
{
  "course": {
    "id": "course_berhitung_tk_01",
    "title": "Mengenal Angka 1-5 & Berhitung Ceria",
    "description": "Petualangan seru belajar angka 1 sampai 5 untuk anak TK!",
    "target_audience": "Anak TK (4-6 tahun)",
    "units": [
      {
        "id": "unit_1",
        "title": "Unit 1: Berkenalan dengan Angka 1, 2, dan 3",
        "order": 1,
        "icon": "star",
        "color": "blue",
        "lessons": [
          {
            "id": "u1_lesson1",
            "title": "Satu dan Dua yang Lucu",
            "order": 1,
            "summary": "Belajar mengenali bentuk dan jumlah angka 1 dan 2.",
            "exercises": [
              {
                "id": "u1l1_ex1",
                "type": "multiple_choice",
                "difficulty": "easy",
                "question": "Ada berapa buah apel di gambar?",
                "options": ["1", "2", "3", "4"],
                "correct_answer": "1",
                "explanation": "Pintar! Hanya ada 1 buah apel di gambar.",
                "spaced_repetition": true,
                "visual": { "type": "objects", "label": "🍎", "count": 1 }
              },
              {
                "id": "u1l1_ex2",
                "type": "drag_and_drop",
                "difficulty": "easy",
                "question": "Taruh 2 buah pisang 🍌 ke dalam keranjang!",
                "options": [],
                "correct_answer": "2",
                "explanation": "Hebat! Kamu memasukkan 2 pisang.",
                "spaced_repetition": true,
                "visual": { "type": "objects", "label": "🍌", "count": 4 }
              },
              {
                "id": "u1l1_ex3",
                "type": "seek_find",
                "difficulty": "easy",
                "question": "Cari & temukan 1 ekor Kucing 🐱 di taman!",
                "options": [],
                "correct_answer": "1",
                "explanation": "Hebat! Kamu berhasil menemukannya!",
                "spaced_repetition": false,
                "visual": { "label": "🐱", "items": [{ "x": 45, "y": 40, "icon": "🐱" }] }
              },
              {
                "id": "u1l1_ex4",
                "type": "matching",
                "difficulty": "medium",
                "question": "Pasangkan angka dengan jumlah buah yang sesuai!",
                "options": ["1::🍎", "2::🍎🍎"],
                "correct_answer": "1::🍎|2::🍎🍎",
                "explanation": "Luar biasa! Kamu berhasil memasangkan semua buah!",
                "spaced_repetition": false
              },
              {
                "id": "u1l1_ex5",
                "type": "comparison",
                "difficulty": "medium",
                "question": "Kelompok mana yang jumlahnya LEBIH BANYAK?",
                "options": ["A", "B", "Sama"],
                "correct_answer": "B",
                "explanation": "Tepat! Kelompok B berisi 2 apel, lebih banyak dari Kelompok A (1 apel).",
                "spaced_repetition": false,
                "visual": {
                  "groupA": { "count": 1, "icon": "🍎", "label": "Kelompok A" },
                  "groupB": { "count": 2, "icon": "🍎", "label": "Kelompok B" }
                }
              },
              {
                "id": "u1l1_ex6",
                "type": "sequence_ordering",
                "difficulty": "medium",
                "question": "Berapa angka yang hilang pada urutan ini?",
                "options": ["1", "2", "3", "4"],
                "correct_answer": "2",
                "explanation": "Benar sekali! Urutan yang lengkap adalah 1, 2, 3.",
                "spaced_repetition": false,
                "visual": { "sequence": ["1", "?", "3"] }
              },
              {
                "id": "u1l1_ex7",
                "type": "fill_in_blank",
                "difficulty": "hard",
                "question": "Ani punya 1 balon 🎈, lalu Ibu memberi 1 balon lagi. Berapa jumlah semua balon Ani?",
                "options": [],
                "correct_answer": "2",
                "explanation": "Luar biasa! 1 balon ditambah 1 balon sama dengan 2 balon!",
                "spaced_repetition": true,
                "visual": { "type": "objects", "label": "🎈", "count": 2 }
              }
            ]
          }
        ],
        "checkpoint": {
          "id": "unit1_checkpoint",
          "title": "Ujian Checkpoint Unit 1",
          "exercises": []
        }
      }
    ]
  }
}
```

Tolong hasilkan JSON lengkap tanpa memotong isi (jangan gunakan titik-titik "..." di dalam JSON). Pastikan valid JSON!
