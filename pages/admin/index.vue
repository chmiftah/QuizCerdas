<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 select-none">
    <div class="max-w-7xl mx-auto space-y-6">

      <!-- Admin Top Header Banner -->
      <div class="bg-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2 z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-heading font-extrabold text-purple-100">
            <span>🛡️ Panel Kontrol Administrator</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <h1 class="font-heading text-3xl sm:text-4xl font-black tracking-tight">
            Dashboard Pengelola EdTech
          </h1>
          <p class="text-purple-100 text-sm sm:text-base max-w-2xl font-heading">
            Kelola data pengguna, buat bank soal kuis via Form GUI / JSON, atur toko Kiko, album stiker, dan pantau progres statistik belajar siswa.
          </p>
        </div>

        <!-- Role Quick Switcher & User Status -->
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0">
          <div class="text-center sm:text-right">
            <p class="text-xs font-heading text-purple-200">Login Sebagai:</p>
            <p class="font-heading font-black text-sm text-white flex items-center gap-1">
              <span>{{ userStore.userAvatar }}</span>
              <span>{{ userStore.userDisplayName }}</span>
            </p>
            <span class="inline-block px-2 py-0.5 mt-1 bg-amber-400 text-amber-950 font-heading font-black text-[10px] rounded-md uppercase">
              {{ userStore.currentUser?.role || 'Admin' }}
            </span>
          </div>
          <button 
            @click="userStore.toggleAdminRole()"
            type="button"
            class="px-4 py-2.5 bg-white text-purple-900 hover:bg-purple-50 font-heading font-extrabold text-xs rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>⚙️</span>
            <span>Switch Role (Admin/User)</span>
          </button>
        </div>
      </div>

      <!-- Admin Tab Navigation -->
      <div class="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-sm overflow-x-auto">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          type="button"
          class="px-4 py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          :class="activeTab === tab.id ? 'bg-purple-600 text-white shadow-md scale-[1.02]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- TAB 1: OVERVIEW & STATS -->
      <div v-if="activeTab === 'overview'" class="space-y-6 animate-pop">
        <!-- Stats Summary Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-black shrink-0">
              👥
            </div>
            <div>
              <p class="text-xs font-heading font-bold text-slate-400 uppercase">Total User</p>
              <h3 class="text-2xl font-heading font-black text-slate-800">{{ adminStore.totalUsers }}</h3>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-black shrink-0">
              🎓
            </div>
            <div>
              <p class="text-xs font-heading font-bold text-slate-400 uppercase">Total Siswa</p>
              <h3 class="text-2xl font-heading font-black text-slate-800">{{ adminStore.totalStudents }}</h3>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black shrink-0">
              ⚡
            </div>
            <div>
              <p class="text-xs font-heading font-bold text-slate-400 uppercase">Total XP Beredar</p>
              <h3 class="text-2xl font-heading font-black text-slate-800">{{ adminStore.totalXPGranted }} XP</h3>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-black shrink-0">
              📚
            </div>
            <div>
              <p class="text-xs font-heading font-bold text-slate-400 uppercase">Total Kursus</p>
              <h3 class="text-2xl font-heading font-black text-slate-800">{{ courseStore.catalogRegistry.length || Object.keys(courseStore.courses).length }}</h3>
            </div>
          </div>
        </div>

        <!-- Quick Action Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <button @click="activeTab = 'courses'" class="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-3xl text-left hover:shadow-md transition-all cursor-pointer group">
            <div class="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl font-bold mb-3 group-hover:scale-110 transition-transform">
              ➕
            </div>
            <h4 class="font-heading font-black text-lg text-emerald-950">Tambah / Edit Soal Kursus</h4>
            <p class="text-xs text-emerald-800 font-heading mt-1">Buat kuis interaktif baru menggunakan Form GUI Visual atau JSON.</p>
          </button>

          <button @click="activeTab = 'shop'" class="p-6 bg-amber-50 border-2 border-amber-200 rounded-3xl text-left hover:shadow-md transition-all cursor-pointer group">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold mb-3 group-hover:scale-110 transition-transform">
              🛍️
            </div>
            <h4 class="font-heading font-black text-lg text-amber-950">Atur Toko Kiko</h4>
            <p class="text-xs text-amber-800 font-heading mt-1">Tambah item topi, aksesori, atau skin avatar Kiko baru.</p>
          </button>

          <button @click="activeTab = 'progress'" class="p-6 bg-purple-50 border-2 border-purple-200 rounded-3xl text-left hover:shadow-md transition-all cursor-pointer group">
            <div class="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-3 group-hover:scale-110 transition-transform">
              📈
            </div>
            <h4 class="font-heading font-black text-lg text-purple-950">Laporan Siswa</h4>
            <p class="text-xs text-purple-800 font-heading mt-1">Pantau statistik pengerjaan kuis dan pencapaian anak.</p>
          </button>
        </div>
      </div>

      <!-- TAB 2: MANAJEMEN USER -->
      <div v-if="activeTab === 'users'" class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6 animate-pop">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-heading text-xl font-black text-slate-800">Daftar Pengguna & Role</h3>
            <p class="text-xs text-slate-500 font-heading">Kelola role pengguna (Admin, Siswa, Orang Tua), tambah XP, atau atur akun.</p>
          </div>
          <button @click="showAddUserModal = true" type="button" class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5">
            <span>➕</span> Tambah User Baru
          </button>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs font-heading">
            <thead class="bg-slate-100 text-slate-600 uppercase font-black">
              <tr>
                <th class="p-3.5 rounded-l-xl">User</th>
                <th class="p-3.5">Role</th>
                <th class="p-3.5">XP</th>
                <th class="p-3.5">Nyawa</th>
                <th class="p-3.5">Pelajaran Selesai</th>
                <th class="p-3.5 text-right rounded-r-xl">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="u in adminStore.users" :key="u.id" class="hover:bg-slate-50/80 transition-colors">
                <td class="p-3.5 flex items-center gap-3">
                  <span class="text-2xl p-1.5 bg-slate-100 rounded-xl">{{ u.avatar }}</span>
                  <div>
                    <p class="font-black text-slate-800 text-sm">{{ u.name }}</p>
                    <p class="text-[11px] text-slate-400 font-normal">{{ u.email }} • {{ u.grade }}</p>
                  </div>
                </td>
                <td class="p-3.5">
                  <select 
                    :value="u.role" 
                    @change="(e) => adminStore.updateUserRole(u.id, e.target.value)"
                    class="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-extrabold text-slate-700 cursor-pointer"
                  >
                    <option value="student">🎓 Siswa</option>
                    <option value="admin">🛡️ Admin</option>
                    <option value="parent">👨‍👩‍👧 Orang Tua</option>
                  </select>
                </td>
                <td class="p-3.5">
                  <span class="px-2 py-1 bg-amber-100 text-amber-900 rounded-lg font-black text-xs">⚡ {{ u.xp }} XP</span>
                </td>
                <td class="p-3.5">
                  <span class="px-2 py-1 bg-rose-100 text-rose-800 rounded-lg font-black text-xs">❤️ {{ u.hearts }}</span>
                </td>
                <td class="p-3.5 font-extrabold text-slate-700">
                  {{ u.completedLessonsCount }} Modul
                </td>
                <td class="p-3.5 text-right space-x-1">
                  <button @click="editUserXP(u)" class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg font-extrabold cursor-pointer">
                    +XP
                  </button>
                  <button @click="adminStore.deleteUser(u.id)" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-lg font-extrabold cursor-pointer">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB 3: SOAL & KURSUS -->
      <div v-if="activeTab === 'courses'" class="space-y-6 animate-pop">
        
        <!-- Toggle Input Mode: GUI Form vs JSON -->
        <div class="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="font-heading text-lg font-black text-slate-800">Editor Pembuat Kursus & Soal</h3>
            <p class="text-xs text-slate-500 font-heading">Pilih metode pembuatan kuis: menggunakan Form Visual GUI tanpa coding atau via Teks JSON.</p>
          </div>

          <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl shrink-0 font-heading font-extrabold text-xs">
            <button 
              @click="courseEditorMode = 'gui'"
              type="button"
              class="px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              :class="courseEditorMode === 'gui' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'"
            >
              <span>📝</span> Mode Form GUI
            </button>
            <button 
              @click="courseEditorMode = 'json'"
              type="button"
              class="px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              :class="courseEditorMode === 'json' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'"
            >
              <span>💻</span> Mode Teks JSON
            </button>
          </div>
        </div>

        <!-- MODE 1: VISUAL FORM GUI BUILDER -->
        <div v-if="courseEditorMode === 'gui'" class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6 animate-pop">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 class="font-heading text-xl font-black text-slate-800">📝 Form GUI Pembuat Kursus & Soal</h3>
              <p class="text-xs text-slate-500 font-heading">Isi formulir di bawah ini untuk membuat atau mengedit kursus tanpa perlu menyentuh kode JSON!</p>
            </div>

            <button 
              @click="saveGuiCourse" 
              type="button" 
              class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>💾</span> Simpan Kursus ke Database
            </button>
          </div>

          <!-- Section A: Course Metadata Form -->
          <div class="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 space-y-4">
            <h4 class="font-heading font-black text-sm text-slate-800 uppercase flex items-center gap-2">
              <span>📌</span> 1. Informasi Utama Kursus
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-heading text-xs">
              <div>
                <label class="font-bold text-slate-600">ID Kursus (Unik)</label>
                <input v-model="guiCourseForm.id" type="text" placeholder="course_matematika_01" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold mt-1 bg-white" />
              </div>

              <div>
                <label class="font-bold text-slate-600">Judul Kursus</label>
                <input v-model="guiCourseForm.title" type="text" placeholder="Mengenal Angka & Berhitung" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold mt-1 bg-white" />
              </div>

              <div>
                <label class="font-bold text-slate-600">Target Pembaca</label>
                <input v-model="guiCourseForm.target_audience" type="text" placeholder="Anak TK (4-6 Tahun)" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold mt-1 bg-white" />
              </div>

              <div class="sm:col-span-2">
                <label class="font-bold text-slate-600">Deskripsi Singkat</label>
                <input v-model="guiCourseForm.description" type="text" placeholder="Modul kuis interaktif seru untuk belajar angka..." class="w-full p-2.5 rounded-xl border border-slate-300 font-bold mt-1 bg-white" />
              </div>

              <div>
                <label class="font-bold text-slate-600">Ikon Emoji</label>
                <input v-model="guiCourseForm.icon" type="text" placeholder="⭐" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold mt-1 bg-white" />
              </div>
            </div>
          </div>

          <!-- Section B: Units & Lessons Builder -->
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h4 class="font-heading font-black text-sm text-slate-800 uppercase flex items-center gap-2">
                <span>🗺️</span> 2. Struktur Unit, Pelajaran, & Bank Soal
              </h4>

              <button @click="addUnitToGuiForm" type="button" class="px-3.5 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 font-heading font-extrabold text-xs rounded-xl cursor-pointer">
                ➕ Tambah Unit Baru
              </button>
            </div>

            <!-- Units Accordion/List -->
            <div v-for="(unit, uIdx) in guiCourseForm.units" :key="uIdx" class="bg-purple-50/50 p-5 rounded-3xl border-2 border-purple-200 space-y-4">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 flex-1">
                  <span class="px-2.5 py-1 bg-purple-600 text-white font-heading font-black text-xs rounded-lg">Unit {{ uIdx + 1 }}</span>
                  <input v-model="unit.title" type="text" placeholder="Judul Unit..." class="flex-1 p-2 rounded-xl border border-purple-300 font-heading font-extrabold text-sm bg-white" />
                </div>
                <button @click="guiCourseForm.units.splice(uIdx, 1)" class="text-rose-600 hover:bg-rose-100 px-2 py-1 rounded-lg text-xs font-bold">Hapus Unit</button>
              </div>

              <!-- Lessons List inside Unit -->
              <div class="pl-4 space-y-4 border-l-2 border-purple-300">
                <div v-for="(lesson, lIdx) in unit.lessons" :key="lIdx" class="bg-white p-4 rounded-2xl border-2 border-slate-200 space-y-4 shadow-2xs">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 flex-1">
                      <span class="px-2 py-0.5 bg-blue-100 text-blue-800 font-heading font-black text-xs rounded-md">Pelajaran {{ lIdx + 1 }}</span>
                      <input v-model="lesson.title" type="text" placeholder="Judul Pelajaran..." class="flex-1 p-1.5 rounded-lg border border-slate-300 font-heading font-bold text-xs" />
                    </div>
                    <button @click="unit.lessons.splice(lIdx, 1)" class="text-rose-600 text-xs font-bold">Hapus Pelajaran</button>
                  </div>

                  <!-- Exercises List in Lesson -->
                  <div class="space-y-3 pt-2">
                    <div class="flex items-center justify-between">
                      <p class="font-heading font-extrabold text-xs text-slate-700">Daftar Soal ({{ lesson.exercises.length }} Soal Bertahap):</p>
                      <button @click="addExerciseToGuiForm(uIdx, lIdx)" type="button" class="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-heading font-extrabold text-xs rounded-lg cursor-pointer">
                        ➕ Tambah Soal
                      </button>
                    </div>

                    <!-- Individual Exercise Form Card -->
                    <div v-for="(ex, exIdx) in lesson.exercises" :key="exIdx" class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="font-heading font-black text-xs text-purple-700">Soal #{{ exIdx + 1 }} (Level: {{ ex.difficulty || 'easy' }})</span>
                        <button @click="lesson.exercises.splice(exIdx, 1)" class="text-rose-600 text-xs font-bold">Hapus Soal</button>
                      </div>

                      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-heading text-xs">
                        <div class="sm:col-span-2">
                          <label class="font-bold text-slate-600">Teks Pertanyaan Soal</label>
                          <input v-model="ex.question" type="text" placeholder="Ada berapa buah apel di gambar?" class="w-full p-2 rounded-lg border border-slate-300 bg-white" />
                        </div>

                        <div>
                          <label class="font-bold text-slate-600">Tipe Soal (13 Tipe Interaktif)</label>
                          <select v-model="ex.type" class="w-full p-2 rounded-lg border border-slate-300 bg-white font-bold">
                            <option value="multiple_choice">Pilihan Ganda (Multiple Choice)</option>
                            <option value="drag_and_drop">Seret Objek (Drag & Drop)</option>
                            <option value="seek_find">Cari & Temukan (Seek & Find)</option>
                            <option value="matching">Pasangan / Tarik Garis (Matching)</option>
                            <option value="comparison">Bandingkan Jumlah (Comparison)</option>
                            <option value="sequence_ordering">Urutan Angka / Objek (Sequence)</option>
                            <option value="pattern_matching">Pola Gambar (Pattern)</option>
                            <option value="fill_in_blank">Isian Singkat (Fill Blank)</option>
                            <option value="true_false">Benar / Salah (True/False)</option>
                            <option value="category_sorting">Kelompokkan Kategori (Category Sort)</option>
                            <option value="odd_one_out">Temukan yang Berbeda (Odd One Out)</option>
                            <option value="memory_flip">Kartu Memori (Memory Flip)</option>
                            <option value="shadow_matching">Pencocokan Bayangan (Shadow Match)</option>
                          </select>
                        </div>

                        <div>
                          <label class="font-bold text-slate-600">Tingkat Kesulitan</label>
                          <select v-model="ex.difficulty" class="w-full p-2 rounded-lg border border-slate-300 bg-white font-bold">
                            <option value="easy">🟢 Mudah (Easy)</option>
                            <option value="medium">🟡 Sedang (Medium)</option>
                            <option value="hard">🔴 Menantang (Hard)</option>
                          </select>
                        </div>

                        <div>
                          <label class="font-bold text-slate-600">Jawaban Benar</label>
                          <input v-model="ex.correct_answer" type="text" placeholder="1" class="w-full p-2 rounded-lg border border-slate-300 bg-white font-black text-emerald-700" />
                        </div>

                        <div>
                          <label class="font-bold text-slate-600">Visual Emoji</label>
                          <input v-model="ex.visual_emoji" type="text" placeholder="🍎" class="w-full p-2 rounded-lg border border-slate-300 bg-white" />
                        </div>

                        <div>
                          <label class="font-bold text-slate-600">Jumlah Objek Visual</label>
                          <input v-model.number="ex.visual_count" type="number" placeholder="1" class="w-full p-2 rounded-lg border border-slate-300 bg-white" />
                        </div>

                        <div>
                          <label class="font-bold text-slate-600">Pilihan (Dipisahkan Koma)</label>
                          <input 
                            :value="Array.isArray(ex.options) ? ex.options.join(', ') : ex.options" 
                            @input="(e) => ex.options = e.target.value.split(',').map(s => s.trim())"
                            type="text" 
                            placeholder="1, 2, 3, 4" 
                            class="w-full p-2 rounded-lg border border-slate-300 bg-white" 
                          />
                        </div>
                      </div>

                      <div>
                        <label class="font-heading font-bold text-xs text-slate-600">Penjelasan / Umpan Balik Kiko</label>
                        <input v-model="ex.explanation" type="text" placeholder="Pintar! Hanya ada 1 buah apel." class="w-full p-2 rounded-lg border border-slate-300 bg-white font-heading text-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                <button @click="addLessonToGuiForm(uIdx)" type="button" class="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-800 font-heading font-extrabold text-xs rounded-xl cursor-pointer">
                  ➕ Tambah Pelajaran ke Unit {{ uIdx + 1 }}
                </button>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span v-if="guiStatus" class="text-xs font-heading font-bold" :class="guiStatus.error ? 'text-rose-600' : 'text-emerald-600'">
              {{ guiStatus.message }}
            </span>
            <span v-else></span>

            <button 
              @click="saveGuiCourse" 
              type="button" 
              class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-black text-sm rounded-xl shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>🚀</span> Simpan & Publish Kursus via GUI
            </button>
          </div>
        </div>

        <!-- MODE 2: TEKS JSON IMPORTER -->
        <div v-if="courseEditorMode === 'json'" class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 animate-pop">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-heading text-xl font-black text-slate-800">💻 Impor / Edit Kursus via Kode JSON</h3>
              <p class="text-xs text-slate-500 font-heading">Tempelkan format JSON kuis bertahap (7 soal per pelajaran) untuk ditambahkan langsung ke database.</p>
            </div>
            <a href="/master soal.md" target="_blank" class="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-heading font-extrabold border border-blue-200">
              📄 Buka Master Soal.md
            </a>
          </div>

          <textarea 
            v-model="jsonInput"
            rows="10"
            placeholder='{ "course": { "id": "course_baru", "title": "Judul Kuis", "units": [...] } }'
            class="w-full p-4 rounded-2xl border-2 border-slate-200 font-mono text-xs text-slate-800 focus:border-purple-500 focus:outline-none"
          ></textarea>

          <div class="flex items-center justify-between">
            <span v-if="jsonStatus" class="text-xs font-heading font-bold" :class="jsonStatus.error ? 'text-rose-600' : 'text-emerald-600'">
              {{ jsonStatus.message }}
            </span>
            <span v-else></span>

            <button @click="importCourseJSON" type="button" class="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-heading font-extrabold text-xs rounded-xl shadow-md cursor-pointer">
              🚀 Impor & Simpan Kursus JSON
            </button>
          </div>
        </div>

        <!-- Active Courses List Explorer -->
        <div class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
          <h3 class="font-heading text-xl font-black text-slate-800">Daftar Kursus Aktif di Aplikasi</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="c in courseStore.catalogRegistry" :key="c.id" class="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-black">{{ c.id }}</span>
                  <span class="text-xs text-slate-400 font-extrabold">{{ c.courseData?.units?.length || 0 }} Unit</span>
                </div>
                <h4 class="font-black text-slate-800 text-base">{{ c.title }}</h4>
                <p class="text-xs text-slate-600 line-clamp-2">{{ c.description }}</p>
              </div>

              <div class="pt-2 flex items-center gap-2 border-t border-slate-200/60">
                <button 
                  @click="editCourseViaGui(c)" 
                  type="button" 
                  class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-heading font-black flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <span>📝</span> Edit via Form GUI
                </button>
                <button 
                  @click="editExistingCourse(c)" 
                  type="button" 
                  class="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl text-xs font-heading font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>💻</span> Edit via JSON
                </button>
                <button 
                  @click="confirmDeleteCourse(c)" 
                  type="button" 
                  class="ml-auto px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 rounded-xl text-xs font-heading font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>🗑️</span> Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: TOKO KIKO -->
      <div v-if="activeTab === 'shop'" class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6 animate-pop">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-heading text-xl font-black text-slate-800">Katalog Toko Kiko (Kostum & Hadiah XP)</h3>
            <p class="text-xs text-slate-500 font-heading">Tambah item topi, aksesori, atau avatar baru untuk ditukarkan siswa dengan XP.</p>
          </div>
          <button @click="showAddShopModal = true" type="button" class="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-heading font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5">
            <span>🛍️</span> Tambah Item Toko
          </button>
        </div>

        <!-- Shop Items Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="item in adminStore.customShopItems" :key="item.id" class="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="text-3xl p-2 bg-white rounded-xl shadow-xs">{{ item.icon }}</span>
              <div>
                <h4 class="font-black text-slate-800 text-sm">{{ item.name }}</h4>
                <p class="text-xs text-amber-700 font-extrabold">⚡ {{ item.price }} XP</p>
              </div>
            </div>
            <button @click="adminStore.deleteShopItem(item.id)" class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold border border-rose-200">
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 5: STIKER -->
      <div v-if="activeTab === 'stickers'" class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6 animate-pop">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-heading text-xl font-black text-slate-800">Album Stiker Koleksi</h3>
            <p class="text-xs text-slate-500 font-heading">Kelola stiker stiker koleksi yang bisa didapatkan siswa setelah menyelesaikan kuis.</p>
          </div>
          <button @click="showAddStickerModal = true" type="button" class="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-heading font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5">
            <span>⭐</span> Tambah Stiker Baru
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div v-for="s in adminStore.customStickers" :key="s.id" class="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 text-center space-y-2 relative">
            <button @click="adminStore.deleteSticker(s.id)" class="absolute top-2 right-2 px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[10px] font-bold">✕</button>
            <div class="text-4xl py-2">{{ s.icon }}</div>
            <h4 class="font-black text-slate-800 text-xs">{{ s.name }}</h4>
            <span class="inline-block px-2 py-0.5 text-[10px] font-black rounded-md text-white" :class="s.rarity === 'Legendary' ? 'bg-amber-500' : s.rarity === 'Rare' ? 'bg-purple-500' : 'bg-blue-500'">
              {{ s.rarity }}
            </span>
          </div>
        </div>
      </div>

      <!-- TAB 6: PROGRES SISWA -->
      <div v-if="activeTab === 'progress'" class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6 animate-pop">
        <div>
          <h3 class="font-heading text-xl font-black text-slate-800">Laporan Progres Belajar Siswa</h3>
          <p class="text-xs text-slate-500 font-heading">Statistik pengerjaan kuis harian, pencapaian streak, dan akumulasi XP setiap siswa.</p>
        </div>

        <div class="space-y-3">
          <div v-for="u in adminStore.users.filter(x => x.role === 'student')" :key="u.id" class="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="text-3xl p-2 bg-white rounded-xl shadow-xs">{{ u.avatar }}</span>
              <div>
                <h4 class="font-black text-slate-800 text-sm">{{ u.name }}</h4>
                <p class="text-xs text-slate-500">{{ u.grade }} • Streak: 🔥 {{ u.streak }} Hari</p>
              </div>
            </div>

            <div class="flex items-center gap-4 text-right">
              <div>
                <p class="text-xs font-bold text-slate-400">Total XP</p>
                <p class="font-black text-amber-600 text-sm">⚡ {{ u.xp }} XP</p>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-400">Modul Selesai</p>
                <p class="font-black text-emerald-600 text-sm">📚 {{ u.completedLessonsCount }} Modul</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal: Tambah Shop Item -->
    <Teleport to="body">
      <div v-if="showAddShopModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-slate-200 shadow-2xl space-y-4">
          <h3 class="font-heading text-xl font-black text-slate-800">Tambah Item Toko Kiko</h3>
          
          <div class="space-y-3 font-heading text-xs">
            <div>
              <label class="font-bold text-slate-600">Nama Item</label>
              <input v-model="newShopItem.name" type="text" placeholder="Contoh: Topi Koki Super" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
            </div>

            <div>
              <label class="font-bold text-slate-600">Kategori</label>
              <select v-model="newShopItem.category" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold">
                <option value="hat">Topi (Hat)</option>
                <option value="accessory">Aksesori (Accessory)</option>
                <option value="avatar">Skin Avatar Kiko</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-slate-600">Ikon Emoji</label>
              <input v-model="newShopItem.icon" type="text" placeholder="👨‍🍳" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
            </div>

            <div>
              <label class="font-bold text-slate-600">Harga XP</label>
              <input v-model.number="newShopItem.price" type="number" placeholder="150" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button @click="showAddShopModal = false" class="px-4 py-2 bg-slate-200 font-heading font-bold text-xs rounded-xl">Batal</button>
            <button @click="saveNewShopItem" class="px-4 py-2 bg-amber-500 text-white font-heading font-black text-xs rounded-xl">Simpan Item</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal: Tambah User -->
    <Teleport to="body">
      <div v-if="showAddUserModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-slate-200 shadow-2xl space-y-4">
          <h3 class="font-heading text-xl font-black text-slate-800">Tambah User Baru</h3>
          
          <div class="space-y-3 font-heading text-xs">
            <div>
              <label class="font-bold text-slate-600">Nama Lengkap</label>
              <input v-model="newUser.name" type="text" placeholder="Nama Siswa / Pengguna" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
            </div>

            <div>
              <label class="font-bold text-slate-600">Email</label>
              <input v-model="newUser.email" type="email" placeholder="siswa@countingduo.id" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
            </div>

            <div>
              <label class="font-bold text-slate-600">Role</label>
              <select v-model="newUser.role" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold">
                <option value="student">🎓 Siswa</option>
                <option value="admin">🛡️ Admin</option>
                <option value="parent">👨‍👩‍👧 Orang Tua</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button @click="showAddUserModal = false" class="px-4 py-2 bg-slate-200 font-heading font-bold text-xs rounded-xl">Batal</button>
            <button @click="saveNewUser" class="px-4 py-2 bg-emerald-500 text-white font-heading font-black text-xs rounded-xl">Tambah User</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal: Konfirmasi Hapus Kursus -->
    <Teleport to="body">
      <div v-if="showDeleteCourseModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-rose-200 shadow-2xl space-y-5 animate-pop">
          <!-- Icon + Header -->
          <div class="text-center space-y-2">
            <div class="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-4xl">🗑️</div>
            <h3 class="font-heading text-xl font-black text-slate-800">Hapus Kursus Ini?</h3>
            <p class="text-sm text-slate-500 font-body">
              Tindakan ini akan <strong class="text-rose-600">menghapus permanen</strong> kursus dari database PostgreSQL dan tidak dapat dibatalkan.
            </p>
          </div>

          <!-- Course Info Preview -->
          <div v-if="courseToDelete" class="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl space-y-1">
            <p class="font-heading font-black text-sm text-slate-800">
              {{ courseToDelete.icon || '📚' }} {{ courseToDelete.title }}
            </p>
            <p class="text-xs text-slate-500 font-body">ID: <code class="bg-white px-1.5 py-0.5 rounded-md border border-slate-200">{{ courseToDelete.id }}</code></p>
            <p class="text-xs text-slate-400 font-body line-clamp-2">{{ courseToDelete.description }}</p>
          </div>

          <!-- Warning for local-only courses -->
          <div v-if="!courseToDelete?.isFromDatabase" class="p-3 bg-amber-50 border border-amber-300 rounded-xl">
            <p class="text-xs text-amber-800 font-heading font-bold">
              ⚠️ Kursus ini hanya ada di file JSON lokal, bukan di database. Hapus hanya akan menghilangkan dari tampilan sesi ini.
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button 
              @click="showDeleteCourseModal = false; courseToDelete = null" 
              class="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-extrabold text-sm rounded-2xl cursor-pointer transition-colors"
            >
              Batal
            </button>
            <button 
              @click="executeCourseDelete" 
              :disabled="deleteStatus === 'loading'"
              class="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-heading font-black text-sm rounded-2xl cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <span v-if="deleteStatus === 'loading'" class="animate-spin">⏳</span>
              <span v-else>🗑️</span>
              {{ deleteStatus === 'loading' ? 'Menghapus...' : 'Ya, Hapus Sekarang' }}
            </button>
          </div>

          <!-- Status feedback -->
          <p v-if="deleteStatus === 'error'" class="text-center text-xs text-rose-600 font-heading font-bold">
            ❌ Gagal menghapus. Kursus mungkin tidak ada di database atau koneksi bermasalah.
          </p>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'
import { useAdminStore } from '~/stores/admin'

definePageMeta({
  middleware: ['admin']
})

const userStore = useUserStore()
const courseStore = useCourseStore()
const adminStore = useAdminStore()

// If user role changes away from admin while on this page, redirect to home immediately
watch(() => userStore.currentUser?.role, (newRole) => {
  if (newRole !== 'admin') {
    navigateTo('/')
  }
})

const activeTab = ref('overview')
const courseEditorMode = ref('gui')

const jsonInput = ref('')
const jsonStatus = ref(null)
const guiStatus = ref(null)

const showDeleteCourseModal = ref(false)
const courseToDelete = ref(null)
const deleteStatus = ref(null) // null | 'loading' | 'error'

const showAddShopModal = ref(false)
const showAddUserModal = ref(false)
const showAddStickerModal = ref(false)

const tabs = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'users', label: 'Manajemen User', icon: '👥' },
  { id: 'courses', label: 'Soal & Kursus', icon: '📚' },
  { id: 'shop', label: 'Toko Kiko', icon: '🛍️' },
  { id: 'stickers', label: 'Stiker', icon: '⭐' },
  { id: 'progress', label: 'Progres Siswa', icon: '📈' }
]

// Visual GUI Form Builder Reactive State
const guiCourseForm = ref({
  id: 'course_baru_01',
  title: 'Petualangan Angka Ceria Baru',
  description: 'Modul kuis interaktif seru untuk belajar angka!',
  target_audience: 'Anak TK (4-6 tahun)',
  category: 'math',
  icon: '⭐',
  themeColor: 'purple',
  units: [
    {
      id: 'unit_1',
      title: 'Unit 1: Berkenalan dengan Angka',
      order: 1,
      icon: 'star',
      color: 'blue',
      lessons: [
        {
          id: 'u1_lesson1',
          title: 'Pelajaran 1: Mengenal Angka 1 dan 2',
          order: 1,
          summary: 'Belajar mengenali bentuk dan jumlah objek.',
          exercises: [
            {
              id: 'u1l1_ex1',
              type: 'multiple_choice',
              difficulty: 'easy',
              question: 'Ada berapa buah apel di gambar?',
              options: ['1', '2', '3', '4'],
              correct_answer: '1',
              explanation: 'Pintar! Hanya ada 1 buah apel di gambar.',
              visual_emoji: '🍎',
              visual_count: 1
            }
          ]
        }
      ],
      checkpoint: {
        id: 'unit1_checkpoint',
        title: 'Ujian Checkpoint Unit 1',
        exercises: []
      }
    }
  ]
})

const newShopItem = ref({
  name: '',
  category: 'hat',
  icon: '🎩',
  price: 150,
  description: 'Item kostum Kiko edisi spesial',
  color: 'from-blue-400 to-purple-600'
})

const newUser = ref({
  name: '',
  email: '',
  avatar: '🐱',
  role: 'student',
  xp: 100,
  hearts: 5,
  streak: 1,
  grade: 'TK B',
  completedLessonsCount: 0
})

onMounted(() => {
  adminStore.loadFromStorage()
  courseStore.loadCourses()
})

const addUnitToGuiForm = () => {
  const uCount = guiCourseForm.value.units.length + 1
  guiCourseForm.value.units.push({
    id: `unit_${uCount}`,
    title: `Unit ${uCount}: Judul Unit Baru`,
    order: uCount,
    icon: 'star',
    color: 'purple',
    lessons: [
      {
        id: `u${uCount}_lesson1`,
        title: 'Pelajaran 1: Hitung Objek',
        order: 1,
        summary: 'Pelajaran baru',
        exercises: [
          {
            id: `u${uCount}l1_ex1`,
            type: 'multiple_choice',
            difficulty: 'easy',
            question: 'Berapa jumlah objek di gambar?',
            options: ['1', '2', '3', '4'],
            correct_answer: '1',
            explanation: 'Hebat! Jawabanmu benar.',
            visual_emoji: '⭐',
            visual_count: 1
          }
        ]
      }
    ],
    checkpoint: {
      id: `unit${uCount}_checkpoint`,
      title: `Ujian Checkpoint Unit ${uCount}`,
      exercises: []
    }
  })
}

const addLessonToGuiForm = (uIdx) => {
  const unit = guiCourseForm.value.units[uIdx]
  if (!unit) return
  const lCount = unit.lessons.length + 1
  unit.lessons.push({
    id: `u${uIdx + 1}_lesson${lCount}`,
    title: `Pelajaran ${lCount}: Topik Baru`,
    order: lCount,
    summary: 'Deskripsi pelajaran',
    exercises: [
      {
        id: `u${uIdx + 1}l${lCount}_ex1`,
        type: 'multiple_choice',
        difficulty: 'easy',
        question: 'Pilih jawaban yang benar:',
        options: ['1', '2', '3', '4'],
        correct_answer: '1',
        explanation: 'Pintar sekali!',
        visual_emoji: '🍎',
        visual_count: 1
      }
    ]
  })
}

const addExerciseToGuiForm = (uIdx, lIdx) => {
  const lesson = guiCourseForm.value.units[uIdx]?.lessons[lIdx]
  if (!lesson) return
  const exCount = lesson.exercises.length + 1
  lesson.exercises.push({
    id: `u${uIdx + 1}l${lIdx + 1}_ex${exCount}`,
    type: 'multiple_choice',
    difficulty: exCount > 5 ? 'hard' : exCount > 3 ? 'medium' : 'easy',
    question: 'Pertanyaan kuis baru...',
    options: ['1', '2', '3', '4'],
    correct_answer: '1',
    explanation: 'Jawaban yang tepat!',
    visual_emoji: '🍎',
    visual_count: 1
  })
}

const saveGuiCourse = () => {
  if (!guiCourseForm.value.id || !guiCourseForm.value.title) {
    guiStatus.value = { error: true, message: 'ID Kursus dan Judul Kursus wajib diisi!' }
    return
  }

  // Format visual object structure
  const formattedUnits = guiCourseForm.value.units.map(u => ({
    ...u,
    lessons: u.lessons.map(l => ({
      ...l,
      exercises: l.exercises.map(ex => {
        const copy = { ...ex }
        if (copy.visual_emoji) {
          copy.visual = { type: 'objects', label: copy.visual_emoji, count: copy.visual_count || 1 }
        }
        delete copy.visual_emoji
        delete copy.visual_count
        return copy
      })
    }))
  }))

  const coursePayload = {
    id: guiCourseForm.value.id,
    title: guiCourseForm.value.title,
    description: guiCourseForm.value.description,
    target_audience: guiCourseForm.value.target_audience,
    category: guiCourseForm.value.category || 'math',
    icon: guiCourseForm.value.icon || '⭐',
    themeColor: guiCourseForm.value.themeColor || 'purple',
    units: formattedUnits
  }

  adminStore.addCustomCourse(coursePayload)
  courseStore.addCustomCourse(coursePayload)

  guiStatus.value = { error: false, message: `Berhasil menyimpan kursus '${coursePayload.title}' ke Database PostgreSQL!` }
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }
}

const editCourseViaGui = (c) => {
  const data = c.courseData || courseStore.courses[c.id]
  if (data) {
    guiCourseForm.value = {
      id: data.id,
      title: data.title,
      description: data.description,
      target_audience: data.target_audience,
      category: c.category || 'math',
      icon: c.icon || '⭐',
      themeColor: c.themeColor || 'purple',
      units: (data.units || []).map(u => ({
        ...u,
        lessons: (u.lessons || []).map(l => ({
          ...l,
          exercises: (l.exercises || []).map(ex => ({
            ...ex,
            options: ex.options || [],
            visual_emoji: ex.visual?.label || '🍎',
            visual_count: ex.visual?.count || 1
          }))
        }))
      }))
    }
    courseEditorMode.value = 'gui'
    guiStatus.value = { error: false, message: `Memuat data kursus '${c.title}' ke Form GUI.` }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }
}

const editUserXP = (u) => {
  const input = prompt(`Masukkan jumlah XP baru untuk ${u.name}:`, u.xp)
  if (input !== null) {
    const val = parseInt(input, 10)
    if (!isNaN(val)) {
      adminStore.updateUserXP(u.id, val)
    }
  }
}

const editExistingCourse = (c) => {
  const data = c.courseData || courseStore.courses[c.id]
  if (data) {
    jsonInput.value = JSON.stringify({ course: data }, null, 2)
    courseEditorMode.value = 'json'
    jsonStatus.value = { error: false, message: `Memuat JSON kursus '${c.title}' (${c.id}) untuk diedit.` }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }
}

const importCourseJSON = () => {
  if (!jsonInput.value.trim()) {
    jsonStatus.value = { error: true, message: 'Harap masukkan data JSON kursus!' }
    return
  }
  try {
    const parsed = JSON.parse(jsonInput.value)
    if (!parsed.course || !parsed.course.id) {
      throw new Error('Format JSON harus memiliki kunci utama "course" dan "id"!')
    }
    adminStore.addCustomCourse(parsed.course)
    courseStore.addCustomCourse(parsed.course)
    jsonStatus.value = { error: false, message: `Berhasil menyimpan perubahan kursus: ${parsed.course.title}!` }
    jsonInput.value = ''
  } catch (err) {
    jsonStatus.value = { error: true, message: `Error JSON: ${err.message}` }
  }
}

const saveNewShopItem = () => {
  if (!newShopItem.value.name) return
  adminStore.addShopItem({ ...newShopItem.value })
  showAddShopModal.value = false
  newShopItem.value = { name: '', category: 'hat', icon: '🎩', price: 150, description: '', color: 'from-blue-400 to-purple-600' }
}

const saveNewUser = () => {
  if (!newUser.value.name || !newUser.value.email) return
  adminStore.addUser({ ...newUser.value })
  showAddUserModal.value = false
  newUser.value = { name: '', email: '', avatar: '🐱', role: 'student', xp: 100, hearts: 5, streak: 1, grade: 'TK B', completedLessonsCount: 0 }
}

// --- HAPUS KURSUS ---
const confirmDeleteCourse = (c) => {
  courseToDelete.value = c
  deleteStatus.value = null
  showDeleteCourseModal.value = true
}

const executeCourseDelete = async () => {
  if (!courseToDelete.value) return
  deleteStatus.value = 'loading'

  try {
    // Attempt to delete from PostgreSQL database
    await $fetch('/api/admin/course-delete', {
      method: 'DELETE',
      body: { courseId: courseToDelete.value.id }
    })

    // Also remove from local store so UI updates immediately
    courseStore.removeCourseFromRegistry(courseToDelete.value.id)

    showDeleteCourseModal.value = false
    courseToDelete.value = null
    deleteStatus.value = null

    // Reload courses to refresh the list
    await courseStore.loadCourses()
  } catch (err) {
    console.error('[ADMIN] Delete course error:', err)
    // If DB delete fails (e.g. local-only course), still remove from UI
    courseStore.removeCourseFromRegistry(courseToDelete.value.id)
    showDeleteCourseModal.value = false
    courseToDelete.value = null
    deleteStatus.value = null
  }
}
</script>
