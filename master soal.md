Kamu adalah seorang ahli pengembang kurikulum pendidikan anak SD & TK (EdTech Curriculum Specialist) dan pengembang aplikasi gamifikasi seperti Duolingo.

Tugasmu adalah membuat materi pembelajaran lengkap dalam format JSON yang VALID untuk aplikasi web edtech anak-anak.

---
### 📈 PEDOMAN PENJENJANGAN TINGKAT KESULITAN (7 SOAL PER PELAJARAN / LESSON):

Setiap Pelajaran (Lesson) WAJIB berisi **7 Soal** yang disusun bertahap secara sistematis dari yang paling mudah ke yang lebih menantang (scaffolding approach):

1. **Soal 1 (Level 1 - Pengenalan Visual & Motorik Awal)**:
   - Memilih objek/angka visual langsung atau menjiplak angka sederhana. Tipe: `multiple_choice` / `true_false` / `number_tracing`.
2. **Soal 2 (Level 2 - Interaksi Fisik / Seret Objek)**:
   - Menghitung & memindahkan objek ke keranjang atau menjiplak. Tipe: `drag_and_drop` / `count_select` / `number_tracing`.
3. **Soal 3 (Level 3 - Cari & Temukan / Visual Attention)**:
   - Mencari & menemukan objek tersembunyi atau gambar benar/salah. Tipe: `seek_find` / `true_false_image` / `hotspot`.
4. **Soal 4 (Level 4 - Mencocokkan Pasangan & Relasi)**:
   - Mencocokkan angka dengan gambar, bayangan, atau suara. Tipe: `matching` / `shadow_matching` / `sound_matching`.
5. **Soal 5 (Level 5 - Membandingkan & Mengelompokkan)**:
   - Membandingkan jumlah atau menyortir kategori. Tipe: `comparison` / `category_sorting` / `drag_to_sort` / `odd_one_out`.
6. **Soal 6 (Level 6 - Urutan, Waktu, & Pola Logika)**:
   - Melengkapi pola berulang, barisan angka, membaca jam, atau puzzle. Tipe: `sequence_ordering` / `pattern_matching` / `fill_missing_number` / `time_reading` / `puzzle_assembly` / `shape_transform`.
7. **Soal 7 (Level 7 - Tantangan Soal Cerita, Isian, & Susun Kata)**:
   - Soal cerita pemecahan masalah atau menyusun kata mandiri. Tipe: `fill_in_blank` / `word_building` / `memory_flip`.

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
2. Tipe soal (`"type"`) HARUS salah satu dari **24 tipe interaktif** berikut:

   - **1. `"multiple_choice"`** : Pilihan ganda standar.
     * `"options"`: Array 4 pilihan `["1", "2", "3", "4"]`.
     * `"correct_answer"`: Teks pilihan benar `"3"`.
     * `"visual"`: `{ "type": "objects", "label": "🍎", "count": 3 }`.

   - **2. `"true_false"`** : Pernyataan benar atau salah teks.
     * `"options"`: `["Benar", "Salah"]`.
     * `"correct_answer"`: `"Benar"` atau `"Salah"`.

   - **3. `"true_false_image"`** : Benar atau salah dengan visualisasi gambar utama.
     * `"options"`: `["Benar", "Salah"]`.
     * `"correct_answer"`: `"Benar"`.
     * `"image"`: URL gambar atau nama file ilustrasi.

   - **4. `"fill_in_blank"`** : Isian singkat bebas (angka/teks).
     * `"options"`: `[]` (atau daftar chip kata bantuan opsional).
     * `"correct_answer"`: Teks/angka jawaban benar `"5"`.

   - **5. `"fill_missing_number"`** : Mengisi angka yang hilang pada baris hitungan.
     * `"options"`: `[]`.
     * `"correct_answer"`: `"4"`.
     * `"visual"`: `{ "sequence": ["2", "3", "?", "5"] }`.

   - **6. `"matching"`** : Menghubungkan pasangan kiri dan kanan.
     * `"options"`: `["1::🍎", "2::🍎🍎", "3::🍎🍎🍎"]`.
     * `"correct_answer"`: `"1::🍎|2::🍎🍎|3::🍎🍎🍎"` (dipisahkan baris pipa `|`).

   - **7. `"shadow_matching"`** : Mencocokkan objek dengan bayangan/siluetnya.
     * `"options"`: `["Kucing", "Gajah", "Burung"]`.
     * `"correct_answer"`: `"Kucing"`.
     * `"visual"`: `{ "target": "🐱" }`.

   - **8. `"drag_and_drop"`** : Menyeret objek ke dalam keranjang.
     * `"options"`: `[]`.
     * `"correct_answer"`: `"3"` (jumlah target yang harus dimasukkan).
     * `"visual"`: `{ "type": "objects", "label": "🍎", "count": 5 }`.

   - **9. `"drag_to_sort"`** : Menyeret item ke dalam kotak kategori masing-masing.
     * `"options"`: `["Darat", "Laut"]`.
     * `"correct_answer"`: `"Kucing::Darat|Ikan::Laut"`.

   - **10. `"category_sorting"`** : Mengelompokkan berbagai item ke dalam kategori.
     * `"categories"`: `["Darat", "Laut"]`.
     * `"items"`: `[{ "id": "1", "name": "Kucing 🐱", "category": "Darat" }, { "id": "2", "name": "Ikan 🐟", "category": "Laut" }]`.
     * `"correct_answer"`: `"Kucing 🐱::Darat|Ikan 🐟::Laut"`.

   - **11. `"sequence_ordering"`** : Mengurutkan deretan angka/item dari kecil ke besar.
     * `"options"`: `["1", "2", "3", "4"]`.
     * `"correct_answer"`: `"1,2,3,4"` atau angka tanda tanya `"3"`.
     * `"visual"`: `{ "sequence": ["1", "2", "?", "4"] }`.

   - **12. `"pattern_matching"`** : Melanjutkan pola gambar berulang.
     * `"options"`: `["🍎", "🍌", "🍇", "🍊"]`.
     * `"correct_answer"`: `"🍎"`.
     * `"visual"`: `{ "pattern": ["🍎", "🍌", "🍎", "🍌", "?"] }`.

   - **13. `"odd_one_out"`** : Memilih 1 objek yang paling berbeda/tidak sekelompok.
     * `"options"`: `["Kucing 🐱", "Anjing 🐶", "Mobil 🚗", "Kelinci 🐰"]`.
     * `"correct_answer"`: `"Mobil 🚗"`.

   - **14. `"comparison"`** : Membandingkan jumlah dua kelompok (Lebih Banyak / Lebih Sedikit / Sama).
     * `"options"`: `["A", "B", "Sama"]`.
     * `"correct_answer"`: `"B"`.
     * `"visual"`: `{ "groupA": { "count": 3, "icon": "🍎", "label": "Kelompok A" }, "groupB": { "count": 5, "icon": "🍌", "label": "Kelompok B" } }`.

   - **15. `"memory_flip"`** : Permainan mengingat dan membalik kartu kembar.
     * `"pairs"`: `[{ "id": 1, "front": "🍎", "match": "1" }, { "id": 2, "front": "🍌", "match": "2" }]`.
     * `"options"`: `["🍎::1", "🍌::2"]`.
     * `"correct_answer"`: `"2"` (total pasang kartu).

   - **16. `"seek_find"`** : Mencari & menemukan objek tersembunyi pada pemandangan.
     * `"options"`: `[]`.
     * `"correct_answer"`: `"3"` (jumlah target objek).
     * `"visual"`: `{ "label": "🦋", "items": [{ "x": 15, "y": 20, "icon": "🦋" }, { "x": 75, "y": 15, "icon": "🦋" }, { "x": 40, "y": 60, "icon": "🦋" }] }`.

   - **17. `"count_select"`** : Menghitung kumpulan objek dan memilih total angka yang pas.
     * `"options"`: `["3", "4", "5", "6", "7"]`.
     * `"correct_answer"`: `"5"`.
     * `"visual"`: `{ "label": "⭐", "count": 5 }`.

   - **18. `"hotspot"`** : Mengklik titik/area tertentu yang dimaksud pada gambar.
     * `"options"`: `["Kepala", "Kaki", "Ekor"]`.
     * `"correct_answer"`: `"Kepala"`.
     * `"visual"`: `{ "image": "...", "hotspots": [...] }`.

   - **19. `"word_building"`** : Menyusun kepingan huruf acak menjadi kata utuh.
     * `"options"`: `["B", "U", "K", "U"]`.
     * `"correct_answer"`: `"BUKU"`.

   - **20. `"sound_matching"`** : Mendengarkan bunyi/suara dan memilih objek/kata yang tepat.
     * `"options"`: `["Kambing 🐐", "Sapi 🐄", "Ayam 🐓"]`.
     * `"correct_answer"`: `"Sapi 🐄"`.
     * `"visual"`: `{ "audioText": "Mooo... Mooo..." }`.

   - **21. `"puzzle_assembly"`** : Menyusun potongan kepingan puzzle secara urut.
     * `"options"`: `["1", "2", "3"]`.
     * `"correct_answer"`: `"1,2,3"`.

   - **22. `"time_reading"`** : Membaca jarum jam analog (waktu).
     * `"options"`: `["03:00", "06:00", "09:00", "12:00"]`.
     * `"correct_answer"`: `"03:00"`.
     * `"visual"`: `{ "hour": 3, "minute": 0 }`.

   - **23. `"shape_transform"`** : Menentukan hasil transformasi/rotasi/pencerminan bentuk.
     * `"options"`: `["🔺", "🔻"]`.
     * `"correct_answer"`: `"🔻"`.
     * `"visual"`: `{ "shape": "🔺", "transform": "Rotasi", "degree": 180 }`.

   - **24. `"number_tracing"`** : Kanvas interaktif menjiplak & menebalkan garis angka (motorik halus).
     * `"options"`: `[]`.
     * `"correct_answer"`: `"5"` (angka yang harus ditebalkan, antara 1 sampai 10).
     * `"visual"`: `{ "target": 5 }`.

3. **Properti Visual Opsional (`"visual"`):**
   - Visual Ten Frame: `{ "type": "ten_frame", "value": 6 }`
   - Visual Objek Emoji: `{ "type": "objects", "label": "🍎", "count": 4 }`
   - Visual Urutan: `{ "sequence": ["1", "2", "?", "4"] }`
   - Visual Jam: `{ "hour": 3, "minute": 0 }`
   - Visual Target Angka Tracing: `{ "target": 5 }`

4. Setiap Unit WAJIB memiliki `"checkpoint"` yang berisi **7 Soal Ujian Akhir Unit** gabungan bertahap dari pelajaran di unit tersebut.

---
### 📐 CONTOH TEMPLATE OUTPUT JSON LENGKAP:

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
            "summary": "Belajar mengenali bentuk, cara menulis, dan jumlah angka 1 dan 2.",
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
                "type": "number_tracing",
                "difficulty": "easy",
                "question": "Tebalkan garis putus-putus untuk menulis angka 1!",
                "options": [],
                "correct_answer": "1",
                "explanation": "Hebat! Kamu berhasil menulis angka 1 dengan sangat rapi!",
                "spaced_repetition": true,
                "visual": { "target": 1 }
              },
              {
                "id": "u1l1_ex3",
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
                "id": "u1l1_ex4",
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
                "id": "u1l1_ex5",
                "type": "matching",
                "difficulty": "medium",
                "question": "Pasangkan angka dengan jumlah buah yang sesuai!",
                "options": ["1::🍎", "2::🍎🍎"],
                "correct_answer": "1::🍎|2::🍎🍎",
                "explanation": "Luar biasa! Kamu berhasil memasangkan semua buah!",
                "spaced_repetition": false
              },
              {
                "id": "u1l1_ex6",
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

Tolong hasilkan JSON lengkap tanpa memotong isi (jangan gunakan tanda elipsis "..." di dalam payload JSON). Pastikan valid JSON!
