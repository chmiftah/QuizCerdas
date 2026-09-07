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
        <ClientOnly>
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
          <template #fallback>
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 z-10 shrink-0">
              <div class="text-center sm:text-right">
                <p class="text-xs font-heading text-purple-200">Login Sebagai:</p>
                <p class="font-heading font-black text-sm text-white flex items-center gap-1">
                  <span>🦉</span>
                  <span>Penjelajah Muda</span>
                </p>
                <span class="inline-block px-2 py-0.5 mt-1 bg-amber-400 text-amber-950 font-heading font-black text-[10px] rounded-md uppercase">
                  Admin
                </span>
              </div>
              <div class="w-28 h-8 bg-white/20 rounded-xl animate-pulse"></div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Admin Tab Navigation with Search -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          
          <!-- Quick Stats -->
          <div class="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-xl text-xs font-heading font-bold text-purple-800">
            <span>📊 {{ adminStore.totalUsers }} User</span>
            <span>•</span>
            <span>🎓 {{ adminStore.totalStudents }} Siswa</span>
            <span>•</span>
            <span>📚 {{ courseStore.catalogRegistry.length }} Kursus</span>
          </div>
        </div>
        
        <!-- Search Filter -->
        <div class="relative group">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="🔍 Cari kursus, user, atau stiker..." 
            class="w-full px-4 py-3 pl-10 rounded-2xl border-2 border-purple-200 bg-white text-slate-800 font-heading font-bold placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all shadow-sm"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600">
            🔍
          </span>
        </div>
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
        
        <!-- Top Control Bar: Mode Toggle, Course Switcher, Actions -->
        <div class="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">📚</span>
                <h3 class="font-heading text-xl font-black text-slate-800">Manajemen Kursus & Bank Soal Interaktif</h3>
              </div>
              <p class="text-xs text-slate-500 font-heading mt-0.5">
                Kelola kurikulum kuis bertingkat, struktur unit & pelajaran, edit soal dengan 29 tipe interaktif, dan uji preview langsung.
              </p>
            </div>

            <!-- Top Action Buttons -->
            <div class="flex flex-wrap items-center gap-2 font-heading font-extrabold text-xs">
              <!-- Toggle GUI / JSON Mode -->
              <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                <button 
                  @click="courseEditorMode = 'gui'"
                  type="button"
                  class="px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  :class="courseEditorMode === 'gui' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'"
                >
                  <span>🗂️</span> Explorer & Soal
                </button>
                <button 
                  @click="courseEditorMode = 'json'"
                  type="button"
                  class="px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  :class="courseEditorMode === 'json' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'"
                >
                  <span>💻</span> Mode JSON
                </button>
              </div>

              <!-- Create New Course Button -->
              <button 
                @click="openNewCourseModal"
                type="button"
                class="px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>➕</span>
                <span>Buat Kursus Baru</span>
              </button>

              <!-- Save Changes to PostgreSQL Button -->
              <button 
                @click="saveGuiCourse(true)"
                type="button"
                class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>💾</span>
                <span>Simpan ke Database</span>
              </button>
            </div>
          </div>

          <!-- Course Switcher Strip -->
          <div class="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3 w-full sm:w-auto">
              <label class="font-heading font-bold text-xs text-slate-500 shrink-0">Pilih Kursus:</label>
              <div class="relative flex-1 sm:w-80">
                <select 
                  :value="selectedCourseId" 
                  @change="(e) => selectCourseToManage(e.target.value)"
                  class="w-full p-2.5 pl-3 pr-8 rounded-xl border-2 border-purple-200 bg-purple-50/50 font-heading font-black text-xs text-purple-950 focus:border-purple-500 focus:outline-none cursor-pointer appearance-none"
                >
                  <option 
                    v-for="c in courseStore.catalogRegistry" 
                    :key="c.id" 
                    :value="c.id"
                  >
                    {{ c.icon || '⭐' }} {{ c.title }} ({{ c.id }})
                  </option>
                </select>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none text-xs">▼</span>
              </div>
            </div>

            <!-- Status Banner Notification -->
            <div v-if="guiStatus" class="px-3 py-1.5 rounded-xl text-xs font-heading font-extrabold flex items-center gap-1.5" :class="guiStatus.error ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'">
              <span>{{ guiStatus.error ? '⚠️' : '✅' }}</span>
              <span>{{ guiStatus.message }}</span>
            </div>
          </div>
        </div>

        <!-- MODE 1: HIERARCHICAL EXPLORER & QUESTION MANAGER -->
        <div v-if="courseEditorMode === 'gui'" class="space-y-6 animate-pop">
          
          <!-- Course Metadata Summary Card -->
          <div class="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 text-white p-6 rounded-3xl shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2 z-10">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-heading font-black text-purple-100 uppercase">
                  {{ guiCourseForm.category || 'math' }}
                </span>
                <span class="px-2.5 py-1 bg-amber-400 text-amber-950 rounded-lg text-xs font-heading font-black uppercase">
                  🎯 {{ guiCourseForm.target_audience || 'Semua Siswa' }}
                </span>
                <code class="px-2 py-0.5 bg-black/30 text-purple-200 rounded text-[11px] font-mono">
                  ID: {{ guiCourseForm.id }}
                </code>
              </div>
              <h2 class="font-heading text-2xl sm:text-3xl font-black flex items-center gap-2">
                <span>{{ guiCourseForm.icon || '⭐' }}</span>
                <span>{{ guiCourseForm.title }}</span>
              </h2>
              <p class="text-purple-100 text-xs sm:text-sm font-heading max-w-2xl line-clamp-2">
                {{ guiCourseForm.description || 'Tidak ada deskripsi kursus.' }}
              </p>
            </div>

            <!-- Course Meta Actions & Stats -->
            <div class="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 z-10 shrink-0">
              <!-- Quick Stats Pill -->
              <div class="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-xs font-heading font-bold text-white border border-white/15">
                <span>🗺️ {{ guiCourseForm.units?.length || 0 }} Unit</span>
                <span>•</span>
                <span>📖 {{ (guiCourseForm.units || []).reduce((acc, u) => acc + (u.lessons?.length || 0), 0) }} Pelajaran</span>
                <span>•</span>
                <span>❓ {{ totalExercisesCount }} Soal</span>
              </div>

              <!-- Buttons -->
              <div class="flex items-center gap-2 flex-wrap">
                <button 
                  @click="openCourseMetadataModal"
                  type="button"
                  class="px-3 py-1.5 bg-white text-purple-900 hover:bg-purple-50 rounded-xl text-xs font-heading font-black transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                >
                  <span>✏️</span>
                  <span>Edit Info Kursus</span>
                </button>
                <button 
                  @click="exportCourseJson"
                  type="button"
                  class="px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1"
                  title="Salin JSON Kursus"
                >
                  <span>📋</span>
                  <span>Salin JSON</span>
                </button>
                <button 
                  @click="confirmDeleteCourse({ id: guiCourseForm.id, title: guiCourseForm.title })"
                  type="button"
                  class="px-3 py-1.5 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>🗑️</span>
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>

          <!-- STEP-DOWN NAVIGATOR: LEVEL 1 (UNITS) -->
          <div class="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xl">🗺️</span>
                <div>
                  <h4 class="font-heading font-black text-sm text-slate-800 uppercase">
                    Struktur Unit Kursus ({{ guiCourseForm.units?.length || 0 }} Unit)
                  </h4>
                  <p class="text-[11px] text-slate-400 font-heading">Pilih unit untuk melihat dan mengelola pelajaran di dalamnya.</p>
                </div>
              </div>

              <button 
                @click="addUnit"
                type="button"
                class="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-heading font-black cursor-pointer transition-colors flex items-center gap-1"
              >
                <span>➕</span>
                <span>Tambah Unit Baru</span>
              </button>
            </div>

            <!-- Unit Pills Bar -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 font-heading text-xs">
              <button 
                v-for="(unit, uIdx) in (guiCourseForm.units || [])" 
                :key="unit.id || uIdx"
                @click="selectedUnitIndex = uIdx; selectedLessonIndex = 0"
                type="button"
                class="px-4 py-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 font-extrabold"
                :class="selectedUnitIndex === uIdx ? 'bg-purple-600 text-white border-purple-600 shadow-sm scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'"
              >
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black" :class="selectedUnitIndex === uIdx ? 'bg-white text-purple-700' : 'bg-purple-200 text-purple-900'">
                  {{ uIdx + 1 }}
                </span>
                <span class="truncate max-w-[160px]">{{ unit.title }}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded-md" :class="selectedUnitIndex === uIdx ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'">
                  {{ unit.lessons?.length || 0 }} Pelajaran
                </span>
              </button>
            </div>

            <!-- Selected Unit Active Controls -->
            <div v-if="activeUnit" class="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-heading">
              <div class="flex items-center gap-2 flex-1 w-full sm:w-auto">
                <span class="font-black text-purple-900 uppercase shrink-0">Judul Unit {{ selectedUnitIndex + 1 }}:</span>
                <input 
                  v-model="activeUnit.title" 
                  type="text" 
                  class="flex-1 p-2 rounded-xl border border-purple-300 font-black text-xs bg-white text-slate-800"
                  placeholder="Judul Unit..."
                />
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <button 
                  v-if="(guiCourseForm.units || []).length > 1"
                  @click="deleteUnit(selectedUnitIndex)"
                  type="button"
                  class="px-3 py-1.5 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs cursor-pointer transition-colors"
                >
                  🗑️ Hapus Unit Ini
                </button>
              </div>
            </div>
          </div>

          <!-- STEP-DOWN NAVIGATOR: LEVEL 2 (LESSONS) -->
          <div v-if="activeUnit" class="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xl">📖</span>
                <div>
                  <h4 class="font-heading font-black text-sm text-slate-800 uppercase">
                    Pelajaran dalam {{ activeUnit.title }} ({{ activeUnit.lessons?.length || 0 }} Pelajaran)
                  </h4>
                  <p class="text-[11px] text-slate-400 font-heading">Pilih pelajaran untuk mengelola bank soal kuis bertahap di dalamnya.</p>
                </div>
              </div>

              <button 
                @click="addLesson"
                type="button"
                class="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-heading font-black cursor-pointer transition-colors flex items-center gap-1"
              >
                <span>➕</span>
                <span>Tambah Pelajaran Baru</span>
              </button>
            </div>

            <!-- Lesson Pills Bar -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 font-heading text-xs">
              <button 
                v-for="(lesson, lIdx) in (activeUnit.lessons || [])" 
                :key="lesson.id || lIdx"
                @click="selectedLessonIndex = lIdx"
                type="button"
                class="px-4 py-2 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 shrink-0 font-extrabold"
                :class="selectedLessonIndex === lIdx ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'"
              >
                <span>Pelajaran {{ lIdx + 1 }}:</span>
                <span class="truncate max-w-[140px]">{{ lesson.title }}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded-md font-black" :class="selectedLessonIndex === lIdx ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'">
                  {{ lesson.exercises?.length || 0 }} Soal
                </span>
              </button>
            </div>

            <!-- Selected Lesson Active Controls -->
            <div v-if="activeLesson" class="bg-blue-50/50 p-4 rounded-2xl border border-blue-200 space-y-3 text-xs font-heading">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div class="flex items-center gap-2 flex-1 w-full sm:w-auto">
                  <span class="font-black text-blue-900 uppercase shrink-0">Judul Pelajaran {{ selectedLessonIndex + 1 }}:</span>
                  <input 
                    v-model="activeLesson.title" 
                    type="text" 
                    class="flex-1 p-2 rounded-xl border border-blue-300 font-black text-xs bg-white text-slate-800"
                    placeholder="Judul Pelajaran..."
                  />
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <button 
                    v-if="(activeUnit.lessons || []).length > 1"
                    @click="deleteLesson(selectedLessonIndex)"
                    type="button"
                    class="px-3 py-1.5 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs cursor-pointer transition-colors"
                  >
                    🗑️ Hapus Pelajaran Ini
                  </button>
                </div>
              </div>

              <!-- Lesson Summary / Description -->
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-500 shrink-0">Ringkasan Materi:</span>
                <input 
                  v-model="activeLesson.summary" 
                  type="text" 
                  class="flex-1 p-2 rounded-xl border border-slate-300 font-semibold text-xs bg-white text-slate-700"
                  placeholder="Ringkasan singkat apa yang dipelajari siswa di bab ini..."
                />
              </div>
            </div>
          </div>

          <!-- STEP-DOWN NAVIGATOR: LEVEL 3 (EXERCISES HUB & LIVE PREVIEWS) -->
          <div v-if="activeLesson" class="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-5">
            
            <!-- Hub Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-2xl">❓</span>
                  <h4 class="font-heading font-black text-base sm:text-lg text-slate-800">
                    Bank Soal Pelajaran Ini ({{ currentExercises.length }} Soal Bertahap)
                  </h4>
                </div>
                <p class="text-xs text-slate-500 font-heading mt-0.5">
                  Setiap soal dikerjakan berurutan oleh siswa. Gunakan tombol <strong>Preview Soal</strong> untuk menguji tampilan & interaksi secara langsung!
                </p>
              </div>

              <button 
                @click="openNewExerciseModal"
                type="button"
                class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
              >
                <span>➕</span>
                <span>Tambah Soal Baru</span>
              </button>
            </div>

            <!-- Empty State -->
            <div v-if="currentExercises.length === 0" class="text-center py-12 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 space-y-3 font-heading">
              <span class="text-4xl block">📝</span>
              <h5 class="font-black text-slate-700 text-base">Belum Ada Soal di Pelajaran Ini</h5>
              <p class="text-xs text-slate-500 max-w-md mx-auto">
                Pelajaran ini masih kosong. Buat soal pertama dengan berbagai tipe interaktif (Pilihan Ganda, Mencocokkan Pasangan, Tebalkan Angka, dll.)!
              </p>
              <button 
                @click="openNewExerciseModal"
                type="button"
                class="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-1.5"
              >
                <span>➕</span>
                <span>Buat Soal Pertama Sekarang</span>
              </button>
            </div>

            <!-- Exercises Cards List -->
            <div v-else class="space-y-3">
              <div 
                v-for="(ex, exIdx) in currentExercises" 
                :key="ex.id || exIdx"
                class="bg-slate-50 hover:bg-purple-50/30 p-4 sm:p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-300 transition-all shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-heading"
              >
                <!-- Left: Order Badge & Question Overview -->
                <div class="flex items-start gap-3.5 flex-1 min-w-0">
                  <!-- Step Number & Type Icon Badge -->
                  <div class="w-12 h-12 rounded-2xl bg-white border-2 border-purple-200 shadow-2xs flex flex-col items-center justify-center shrink-0">
                    <span class="text-base leading-none">{{ ex.visual_emoji || ex.visual?.label || getExerciseTypeIcon(ex.type) }}</span>
                    <span class="text-[10px] font-black text-purple-700 mt-0.5">#{{ exIdx + 1 }}</span>
                  </div>

                  <!-- Text Details -->
                  <div class="space-y-1.5 flex-1 min-w-0">
                    <!-- Badges Row -->
                    <div class="flex items-center gap-2 flex-wrap text-[10px] font-black uppercase">
                      <!-- Type Badge -->
                      <span class="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-lg flex items-center gap-1">
                        <span>{{ getExerciseTypeIcon(ex.type) }}</span>
                        <span>{{ getExerciseTypeLabel(ex.type) }}</span>
                      </span>

                      <!-- Difficulty Badge -->
                      <span 
                        class="px-2 py-0.5 rounded-lg"
                        :class="ex.difficulty === 'hard' ? 'bg-rose-100 text-rose-800' : ex.difficulty === 'medium' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'"
                      >
                        {{ ex.difficulty === 'hard' ? '🔴 Menantang' : ex.difficulty === 'medium' ? '🟡 Sedang' : '🟢 Mudah' }}
                      </span>

                      <!-- Correct Answer Badge -->
                      <span class="px-2 py-0.5 bg-slate-200/80 text-slate-800 rounded-lg font-mono">
                        Kunci: <strong class="text-emerald-700">{{ ex.correct_answer || ex.answer || '-' }}</strong>
                      </span>
                    </div>

                    <!-- Question Prompt -->
                    <h5 class="font-black text-sm text-slate-800 leading-snug">
                      {{ ex.question || '(Belum ada teks pertanyaan)' }}
                    </h5>

                    <!-- Options Preview Tags -->
                    <div v-if="ex.options && (Array.isArray(ex.options) ? ex.options.length > 0 : ex.options)" class="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500 font-bold">
                      <span class="text-slate-400">Pilihan:</span>
                      <span 
                        v-for="(opt, optIdx) in (Array.isArray(ex.options) ? ex.options : ex.options.split(','))" 
                        :key="optIdx"
                        class="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-[10px] text-slate-700 font-black"
                        :class="String(opt).trim() === String(ex.correct_answer).trim() ? 'border-emerald-400 text-emerald-800 bg-emerald-50/50' : ''"
                      >
                        {{ opt }}
                      </span>
                    </div>

                    <!-- Explanation Snippet -->
                    <p v-if="ex.explanation" class="text-[11px] text-slate-400 font-semibold line-clamp-1">
                      💡 <em>{{ ex.explanation }}</em>
                    </p>
                  </div>
                </div>

                <!-- Right: Action Buttons -->
                <div class="flex items-center gap-2 shrink-0 self-end lg:self-center border-t lg:border-t-0 pt-2 lg:pt-0 border-slate-200/60 w-full lg:w-auto justify-end">
                  <!-- LIVE PREVIEW BUTTON -->
                  <button 
                    @click="openPreview(ex)"
                    type="button"
                    class="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                    title="Uji Preview Soal Ini Secara Interaktif"
                  >
                    <span>👁️</span>
                    <span>Preview</span>
                  </button>

                  <!-- EDIT BUTTON -->
                  <button 
                    @click="openEditorForExercise(ex, exIdx)"
                    type="button"
                    class="px-3 py-2 bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Edit Data Soal"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>

                  <!-- DUPLICATE BUTTON -->
                  <button 
                    @click="duplicateExercise(exIdx)"
                    type="button"
                    class="px-2.5 py-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    title="Duplikasi Soal"
                  >
                    📋
                  </button>

                  <!-- DELETE BUTTON -->
                  <button 
                    @click="deleteExercise(exIdx)"
                    type="button"
                    class="px-2.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    title="Hapus Soal"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom Add Exercise Button -->
            <div v-if="currentExercises.length > 0" class="pt-2 flex justify-center">
              <button 
                @click="openNewExerciseModal"
                type="button"
                class="px-6 py-2.5 bg-slate-100 hover:bg-purple-100 text-purple-900 font-heading font-black text-xs rounded-xl border border-dashed border-purple-300 transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>➕</span>
                <span>Tambah Soal Lain ke Pelajaran Ini</span>
              </button>
            </div>

          </div>

        </div>

        <!-- MODE 2: TEKS JSON IMPORTER & EDITOR -->
        <div v-if="courseEditorMode === 'json'" class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 animate-pop font-heading">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="font-heading text-xl font-black text-slate-800">💻 Impor / Edit Kursus via Kode JSON</h3>
              <p class="text-xs text-slate-500">Tempelkan format JSON kuis bertahap untuk disimpan langsung ke database PostgreSQL.</p>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="loadActiveCourseToJson"
                type="button"
                class="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
              >
                <span>📥 Muat JSON Kursus Aktif</span>
              </button>
              <a href="/master soal.md" target="_blank" class="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-extrabold border border-blue-200">
                📄 Panduan Format JSON
              </a>
            </div>
          </div>

          <textarea 
            v-model="jsonInput"
            rows="12"
            placeholder='{ "course": { "id": "course_baru", "title": "Judul Kuis", "units": [...] } }'
            class="w-full p-4 rounded-2xl border-2 border-slate-200 font-mono text-xs text-slate-800 focus:border-purple-500 focus:outline-none"
          ></textarea>

          <div class="flex items-center justify-between">
            <span v-if="jsonStatus" class="text-xs font-bold" :class="jsonStatus.error ? 'text-rose-600' : 'text-emerald-600'">
              {{ jsonStatus.message }}
            </span>
            <span v-else></span>

            <button 
              @click="importCourseJSON" 
              type="button" 
              class="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            >
              🚀 Impor & Simpan Kursus JSON
            </button>
          </div>
        </div>

        <!-- Active Courses Catalog Quick Grid -->
        <div class="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 font-heading">
          <div class="flex items-center justify-between">
            <h4 class="font-black text-slate-800 text-base">Semua Kursus Aktif di Aplikasi ({{ courseStore.catalogRegistry.length }} Kursus)</h4>
            <span class="text-xs text-slate-400 font-bold">Pilih kursus untuk langsung mengelola bank soal</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="c in courseStore.catalogRegistry" 
              :key="c.id" 
              class="p-4 rounded-2xl border-2 transition-all flex flex-col justify-between"
              :class="selectedCourseId === c.id ? 'border-purple-500 bg-purple-50/40 shadow-sm ring-2 ring-purple-200' : 'border-slate-200 bg-slate-50 hover:bg-white'"
            >
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-lg text-xs font-black">{{ c.icon || '⭐' }} {{ c.id }}</span>
                  <span class="text-xs text-slate-400 font-extrabold">{{ c.courseData?.units?.length || 0 }} Unit</span>
                </div>
                <h5 class="font-black text-slate-800 text-sm line-clamp-1">{{ c.title }}</h5>
                <p class="text-xs text-slate-600 line-clamp-2">{{ c.description }}</p>
              </div>

              <div class="pt-3 mt-3 flex items-center gap-2 border-t border-slate-200/60">
                <button 
                  @click="selectCourseToManage(c.id); courseEditorMode = 'gui'"
                  type="button" 
                  class="px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  :class="selectedCourseId === c.id ? 'bg-purple-600 text-white' : 'bg-slate-200 hover:bg-purple-600 hover:text-white text-slate-700'"
                >
                  <span>🗂️</span>
                  <span>{{ selectedCourseId === c.id ? 'Sedang Dikelola' : 'Buka Kursus' }}</span>
                </button>
                
                <button 
                  @click="editExistingCourse(c)" 
                  type="button" 
                  class="px-2.5 py-1.5 bg-white hover:bg-purple-50 text-purple-800 border border-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  title="Edit Kode JSON"
                >
                  💻 JSON
                </button>

                <button 
                  @click="confirmDeleteCourse(c)" 
                  type="button" 
                  class="ml-auto px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  title="Hapus Kursus"
                >
                  🗑️
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

    <!-- MODAL 1: LIVE INTERACTIVE QUESTION PREVIEW (29 TYPES) -->
    <ExercisePreviewModal 
      :isOpen="previewModalOpen" 
      :exercise="previewExercise" 
      @close="previewModalOpen = false" 
      @edit="openEditorFromPreview" 
    />

    <!-- MODAL 2: QUESTION EDITOR MODAL (29 TYPES BUILDER) -->
    <ExerciseEditorModal 
      :isOpen="editorModalOpen" 
      :exercise="editingExercise" 
      @close="editorModalOpen = false" 
      @preview="openPreviewFromEditor" 
      @save="saveExerciseFromEditor" 
    />

    <!-- MODAL 3: EDIT COURSE METADATA -->
    <Teleport to="body">
      <div v-if="showCourseMetadataModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
        <div class="fixed inset-0" @click="showCourseMetadataModal = false"></div>
        <div class="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative z-10 border-2 border-purple-200 font-heading">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-black text-slate-800 text-lg flex items-center gap-2">
              <span>✏️</span> Edit Informasi Kursus
            </h3>
            <button @click="showCourseMetadataModal = false" class="text-slate-400 hover:text-slate-600 font-black">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-600 mb-1">ID Kursus (Unik)</label>
              <input v-model="guiCourseForm.id" type="text" class="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold bg-slate-100 text-slate-600" disabled />
            </div>

            <div>
              <label class="block font-bold text-slate-600 mb-1">Judul Kursus *</label>
              <input v-model="guiCourseForm.title" type="text" class="w-full p-2.5 rounded-xl border-2 border-slate-200 font-black text-sm text-slate-800 focus:border-purple-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
              <textarea v-model="guiCourseForm.description" rows="2" class="w-full p-2.5 rounded-xl border-2 border-slate-200 font-semibold text-slate-800 focus:border-purple-500 focus:outline-none"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-600 mb-1">Target Pembaca</label>
                <input v-model="guiCourseForm.target_audience" type="text" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
              </div>

              <div>
                <label class="block font-bold text-slate-600 mb-1">Ikon Emoji</label>
                <input v-model="guiCourseForm.icon" type="text" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-center text-lg" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-600 mb-1">Kategori</label>
                <select v-model="guiCourseForm.category" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white">
                  <option value="math">Matematika (math)</option>
                  <option value="indonesian">Bahasa Indonesia (indonesian)</option>
                  <option value="science">Sains & Alam (science)</option>
                  <option value="art">Seni & Kreativitas (art)</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-600 mb-1">Warna Tema</label>
                <select v-model="guiCourseForm.themeColor" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white">
                  <option value="purple">Ungu (Purple)</option>
                  <option value="green">Hijau (Green)</option>
                  <option value="blue">Biru (Blue)</option>
                  <option value="yellow">Kuning (Yellow)</option>
                  <option value="red">Merah (Red)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button @click="showCourseMetadataModal = false" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer">
              Batal
            </button>
            <button @click="saveCourseMetadata" class="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- MODAL 4: CREATE NEW COURSE MODAL -->
    <Teleport to="body">
      <div v-if="showNewCourseModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
        <div class="fixed inset-0" @click="showNewCourseModal = false"></div>
        <div class="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative z-10 border-2 border-purple-200 font-heading">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-black text-slate-800 text-lg flex items-center gap-2">
              <span>➕</span> Buat Kursus Kuis Baru
            </h3>
            <button @click="showNewCourseModal = false" class="text-slate-400 hover:text-slate-600 font-black">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-600 mb-1">ID Kursus (Unik, huruf kecil & garis bawah) *</label>
              <input v-model="newCourseForm.id" type="text" placeholder="contoh: course_hewan_01" class="w-full p-2.5 rounded-xl border-2 border-slate-200 font-mono font-bold text-slate-800 focus:border-purple-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-600 mb-1">Judul Kursus *</label>
              <input v-model="newCourseForm.title" type="text" placeholder="contoh: Mengenal Hewan & Suaranya" class="w-full p-2.5 rounded-xl border-2 border-slate-200 font-black text-sm text-slate-800 focus:border-purple-500 focus:outline-none" />
            </div>

            <div>
              <label class="block font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
              <textarea v-model="newCourseForm.description" rows="2" placeholder="Deskripsi kurikulum..." class="w-full p-2.5 rounded-xl border-2 border-slate-200 font-semibold text-slate-800 focus:border-purple-500 focus:outline-none"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-600 mb-1">Target Pembaca</label>
                <input v-model="newCourseForm.target_audience" type="text" placeholder="Anak TK (4-6 Tahun)" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800" />
              </div>

              <div>
                <label class="block font-bold text-slate-600 mb-1">Ikon Emoji</label>
                <input v-model="newCourseForm.icon" type="text" placeholder="🦁" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-center text-lg" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-600 mb-1">Kategori</label>
                <select v-model="newCourseForm.category" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white">
                  <option value="math">Matematika (math)</option>
                  <option value="indonesian">Bahasa Indonesia (indonesian)</option>
                  <option value="science">Sains & Alam (science)</option>
                  <option value="art">Seni & Kreativitas (art)</option>
                </select>
              </div>

              <div>
                <label class="block font-bold text-slate-600 mb-1">Warna Tema</label>
                <select v-model="newCourseForm.themeColor" class="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white">
                  <option value="purple">Ungu (Purple)</option>
                  <option value="green">Hijau (Green)</option>
                  <option value="blue">Biru (Blue)</option>
                  <option value="yellow">Kuning (Yellow)</option>
                  <option value="red">Merah (Red)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button @click="showNewCourseModal = false" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer">
              Batal
            </button>
            <button @click="createNewCourse" class="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-md cursor-pointer">
              Buat Kursus Sekarang
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { useCourseStore } from '~/stores/course'
import { useAdminStore } from '~/stores/admin'
import ExercisePreviewModal from '~/components/admin/ExercisePreviewModal.vue'
import ExerciseEditorModal from '~/components/admin/ExerciseEditorModal.vue'

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

const searchQuery = ref('')
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

// Modals State for Questions & Courses
const previewModalOpen = ref(false)
const previewExercise = ref(null)

const editorModalOpen = ref(false)
const editingExercise = ref(null)
const editingContext = ref({ unitIndex: 0, lessonIndex: 0, exerciseIndex: -1 })

const showCourseMetadataModal = ref(false)
const showNewCourseModal = ref(false)
const newCourseForm = ref({
  id: '',
  title: '',
  description: '',
  target_audience: 'Anak TK (4-6 Tahun)',
  category: 'math',
  icon: '⭐',
  themeColor: 'purple'
})

// Hierarchical Navigation State
const selectedCourseId = ref('')
const selectedUnitIndex = ref(0)
const selectedLessonIndex = ref(0)

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
  id: 'counting_101',
  title: 'Petualangan Angka Ceria',
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

// Computed Getters for Active Hierarchy
const activeUnit = computed(() => {
  if (!guiCourseForm.value?.units) return null
  return guiCourseForm.value.units[selectedUnitIndex.value] || guiCourseForm.value.units[0] || null
})

const activeLesson = computed(() => {
  if (!activeUnit.value?.lessons) return null
  return activeUnit.value.lessons[selectedLessonIndex.value] || activeUnit.value.lessons[0] || null
})

const currentExercises = computed(() => {
  return activeLesson.value?.exercises || []
})

const totalExercisesCount = computed(() => {
  if (!guiCourseForm.value?.units) return 0
  return guiCourseForm.value.units.reduce((acc, u) => {
    return acc + (u.lessons || []).reduce((lAcc, l) => lAcc + (l.exercises?.length || 0), 0)
  }, 0)
})

// Type metadata lookup for title and icon
const typeInfoMap = {
  multiple_choice: { label: 'Pilihan Ganda', icon: '🔘' },
  true_false: { label: 'Benar / Salah', icon: '⚖️' },
  true_false_image: { label: 'Benar / Salah Gambar', icon: '🖼️' },
  fill_in_blank: { label: 'Isian Singkat', icon: '✍️' },
  matching: { label: 'Mencocokkan Garis', icon: '🔗' },
  drag_and_drop: { label: 'Seret & Lepas', icon: '🖐️' },
  drag_to_sort: { label: 'Seret ke Kategori', icon: '🗂️' },
  shadow_matching: { label: 'Cocok Bayangan', icon: '👥' },
  sequence_ordering: { label: 'Urutan Logis', icon: '🔢' },
  pattern_matching: { label: 'Pola Berulang', icon: '🧩' },
  odd_one_out: { label: 'Temukan yang Beda', icon: '🔍' },
  memory_flip: { label: 'Kartu Memori', icon: '🃏' },
  seek_find: { label: 'Cari & Temukan', icon: '🔎' },
  comparison: { label: 'Perbandingan', icon: '⚖️' },
  category_sorting: { label: 'Kelompokkan Kategori', icon: '📦' },
  hotspot: { label: 'Klik Area', icon: '🎯' },
  word_building: { label: 'Susun Kata', icon: '🔤' },
  sound_matching: { label: 'Cocokkan Suara', icon: '🔊' },
  puzzle_assembly: { label: 'Susun Puzzle', icon: '🧩' },
  fill_missing_number: { label: 'Angka Hilang', icon: '❓' },
  time_reading: { label: 'Baca Jam', icon: '⏰' },
  shape_transform: { label: 'Bentuk Geometri', icon: '🔷' },
  count_select: { label: 'Hitung & Pilih', icon: '🔢' },
  number_tracing: { label: 'Tebalkan Angka', icon: '✏️' },
  reading: { label: 'Membaca Nyaring', icon: '📖' },
  number_maze: { label: 'Labirin Logika Angka', icon: '🌀' },
  balance_scale: { label: 'Timbangan Seimbang', icon: '⚖️' },
  color_by_number: { label: 'Mewarnai Angka', icon: '🎨' },
  syllable_clapping: { label: 'Ketukan Suku Kata', icon: '👏' }
}

const getExerciseTypeLabel = (type) => typeInfoMap[type]?.label || type
const getExerciseTypeIcon = (type) => typeInfoMap[type]?.icon || '⭐'

// Course Selection & Loading
const selectCourseToManage = (courseId) => {
  selectedCourseId.value = courseId
  const regItem = courseStore.catalogRegistry.find(c => c.id === courseId)
  const data = courseStore.courses[courseId] || regItem?.courseData
  if (data) {
    guiCourseForm.value = {
      id: data.id || courseId,
      title: data.title || regItem?.title || '',
      description: data.description || regItem?.description || '',
      target_audience: data.target_audience || regItem?.target_audience || 'Semua Siswa',
      category: data.category || regItem?.category || 'math',
      icon: data.icon || regItem?.icon || '⭐',
      themeColor: data.themeColor || regItem?.themeColor || 'purple',
      units: JSON.parse(JSON.stringify(data.units || []))
    }
    if (!guiCourseForm.value.units || guiCourseForm.value.units.length === 0) {
      guiCourseForm.value.units = [
        {
          id: `${courseId}_unit_1`,
          title: 'Unit 1: Pengenalan',
          order: 1,
          icon: 'star',
          color: 'purple',
          lessons: [
            {
              id: `${courseId}_u1_l1`,
              title: 'Pelajaran 1: Memulai',
              order: 1,
              summary: 'Pelajaran pertama',
              exercises: []
            }
          ]
        }
      ]
    }
    selectedUnitIndex.value = 0
    selectedLessonIndex.value = 0
  }
}

onMounted(async () => {
  adminStore.loadFromStorage()
  await courseStore.loadCourses()
  if (courseStore.catalogRegistry.length > 0) {
    selectCourseToManage(courseStore.catalogRegistry[0].id)
  }
})

// --- Question Preview & Editor Handlers ---
const openPreview = (exercise) => {
  previewExercise.value = exercise
  previewModalOpen.value = true
}

const openEditorFromPreview = (exercise) => {
  previewModalOpen.value = false
  openEditorForExercise(exercise)
}

const openPreviewFromEditor = (exerciseDraft) => {
  previewExercise.value = exerciseDraft
  previewModalOpen.value = true
}

const openNewExerciseModal = () => {
  editingContext.value = {
    unitIndex: selectedUnitIndex.value,
    lessonIndex: selectedLessonIndex.value,
    exerciseIndex: -1
  }
  const uIdx = selectedUnitIndex.value + 1
  const lIdx = selectedLessonIndex.value + 1
  const exCount = (activeLesson.value?.exercises?.length || 0) + 1

  editingExercise.value = {
    id: `${guiCourseForm.value.id}_u${uIdx}l${lIdx}_ex${exCount}`,
    type: 'multiple_choice',
    difficulty: exCount > 5 ? 'hard' : exCount > 3 ? 'medium' : 'easy',
    question: '',
    options: ['1', '2', '3', '4'],
    correct_answer: '1',
    explanation: '',
    visual_emoji: '🍎',
    visual_count: 1
  }
  editorModalOpen.value = true
}

const openEditorForExercise = (exercise, exIdx) => {
  const resolvedIdx = exIdx !== undefined ? exIdx : activeLesson.value?.exercises?.findIndex(e => e.id === exercise.id) ?? -1
  editingContext.value = {
    unitIndex: selectedUnitIndex.value,
    lessonIndex: selectedLessonIndex.value,
    exerciseIndex: resolvedIdx
  }
  editingExercise.value = JSON.parse(JSON.stringify(exercise))
  editorModalOpen.value = true
}

const saveExerciseFromEditor = (savedEx) => {
  const { unitIndex, lessonIndex, exerciseIndex } = editingContext.value
  const lesson = guiCourseForm.value.units?.[unitIndex]?.lessons?.[lessonIndex]
  if (!lesson) return

  if (exerciseIndex >= 0 && exerciseIndex < lesson.exercises.length) {
    lesson.exercises[exerciseIndex] = savedEx
  } else {
    lesson.exercises.push(savedEx)
  }

  editorModalOpen.value = false
  guiStatus.value = { error: false, message: `Soal #${exerciseIndex >= 0 ? exerciseIndex + 1 : lesson.exercises.length} berhasil diperbarui!` }
  saveGuiCourse(false)
}

const duplicateExercise = (exIdx) => {
  if (!activeLesson.value) return
  const original = activeLesson.value.exercises[exIdx]
  if (!original) return
  const cloned = JSON.parse(JSON.stringify(original))
  cloned.id = `${cloned.id}_copy_${Date.now()}`
  cloned.question = `${cloned.question} (Salinan)`
  activeLesson.value.exercises.splice(exIdx + 1, 0, cloned)
  guiStatus.value = { error: false, message: `Soal #${exIdx + 1} berhasil diduplikasi!` }
  saveGuiCourse(false)
}

const deleteExercise = (exIdx) => {
  if (!activeLesson.value) return
  if (confirm(`Yakin ingin menghapus Soal #${exIdx + 1}?`)) {
    activeLesson.value.exercises.splice(exIdx, 1)
    guiStatus.value = { error: false, message: `Soal #${exIdx + 1} berhasil dihapus.` }
    saveGuiCourse(false)
  }
}

// --- Unit & Lesson Handlers ---
const addUnit = () => {
  const uCount = (guiCourseForm.value.units?.length || 0) + 1
  const newU = {
    id: `${guiCourseForm.value.id}_unit_${uCount}`,
    title: `Unit ${uCount}: Judul Unit Baru`,
    order: uCount,
    icon: 'star',
    color: 'purple',
    lessons: [
      {
        id: `${guiCourseForm.value.id}_u${uCount}_l1`,
        title: 'Pelajaran 1: Pengenalan',
        order: 1,
        summary: 'Pelajaran pertama',
        exercises: []
      }
    ],
    checkpoint: {
      id: `${guiCourseForm.value.id}_u${uCount}_checkpoint`,
      title: `Ujian Checkpoint Unit ${uCount}`,
      exercises: []
    }
  }
  guiCourseForm.value.units.push(newU)
  selectedUnitIndex.value = guiCourseForm.value.units.length - 1
  selectedLessonIndex.value = 0
  saveGuiCourse(false)
}

const deleteUnit = (uIdx) => {
  if ((guiCourseForm.value.units || []).length <= 1) {
    alert('Minimal harus ada 1 unit dalam kursus!')
    return
  }
  if (confirm(`Hapus Unit ${uIdx + 1}? Semua pelajaran dan soal di dalamnya akan terhapus!`)) {
    guiCourseForm.value.units.splice(uIdx, 1)
    selectedUnitIndex.value = Math.max(0, selectedUnitIndex.value - 1)
    selectedLessonIndex.value = 0
    saveGuiCourse(false)
  }
}

const addLesson = () => {
  if (!activeUnit.value) return
  const lCount = (activeUnit.value.lessons?.length || 0) + 1
  const uNum = selectedUnitIndex.value + 1
  const newL = {
    id: `${guiCourseForm.value.id}_u${uNum}_l${lCount}`,
    title: `Pelajaran ${lCount}: Topik Baru`,
    order: lCount,
    summary: 'Deskripsi materi baru',
    exercises: []
  }
  activeUnit.value.lessons.push(newL)
  selectedLessonIndex.value = activeUnit.value.lessons.length - 1
  saveGuiCourse(false)
}

const deleteLesson = (lIdx) => {
  if (!activeUnit.value || (activeUnit.value.lessons || []).length <= 1) {
    alert('Minimal harus ada 1 pelajaran dalam unit ini!')
    return
  }
  if (confirm(`Hapus Pelajaran ${lIdx + 1}? Semua soal di dalamnya akan terhapus!`)) {
    activeUnit.value.lessons.splice(lIdx, 1)
    selectedLessonIndex.value = Math.max(0, selectedLessonIndex.value - 1)
    saveGuiCourse(false)
  }
}

// --- Save Course to Database ---
const saveGuiCourse = async (showNotification = true) => {
  if (!guiCourseForm.value.id || !guiCourseForm.value.title) {
    guiStatus.value = { error: true, message: 'ID Kursus dan Judul Kursus wajib diisi!' }
    return
  }

  // Format visual object structure
  const formattedUnits = (guiCourseForm.value.units || []).map(u => ({
    ...u,
    lessons: (u.lessons || []).map(l => ({
      ...l,
      exercises: (l.exercises || []).map(ex => {
        const copy = { ...ex }
        if (copy.visual_emoji && !copy.visual) {
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
    description: guiCourseForm.value.description || '',
    target_audience: guiCourseForm.value.target_audience || 'Semua Siswa',
    category: guiCourseForm.value.category || 'math',
    icon: guiCourseForm.value.icon || '⭐',
    themeColor: guiCourseForm.value.themeColor || 'purple',
    features: ['29 Jenis Soal Interaktif', 'Jawab Suara 🎤'],
    units: formattedUnits
  }

  await adminStore.addCustomCourse(coursePayload)
  courseStore.addCustomCourse(coursePayload)
  await courseStore.loadCourses()

  if (showNotification) {
    guiStatus.value = { error: false, message: `Berhasil menyimpan kursus '${coursePayload.title}' ke Database PostgreSQL!` }
    setTimeout(() => { guiStatus.value = null }, 4000)
  }
}

// --- Course Modals ---
const openCourseMetadataModal = () => {
  showCourseMetadataModal.value = true
}

const saveCourseMetadata = async () => {
  showCourseMetadataModal.value = false
  await saveGuiCourse(true)
}

const openNewCourseModal = () => {
  const newId = `course_${Date.now()}`
  newCourseForm.value = {
    id: newId,
    title: 'Kursus Kuis Baru',
    description: 'Modul kuis interaktif seru untuk anak!',
    target_audience: 'Anak TK (4-6 Tahun)',
    category: 'math',
    icon: '⭐',
    themeColor: 'purple'
  }
  showNewCourseModal.value = true
}

const createNewCourse = async () => {
  if (!newCourseForm.value.id || !newCourseForm.value.title) {
    alert('ID Kursus dan Judul wajib diisi!')
    return
  }
  const newCourseData = {
    ...newCourseForm.value,
    units: [
      {
        id: `${newCourseForm.value.id}_unit_1`,
        title: 'Unit 1: Berkenalan dengan Materi',
        order: 1,
        icon: 'star',
        color: 'purple',
        lessons: [
          {
            id: `${newCourseForm.value.id}_u1_l1`,
            title: 'Pelajaran 1: Pengenalan',
            order: 1,
            summary: 'Pelajaran pertama',
            exercises: [
              {
                id: `${newCourseForm.value.id}_u1l1_ex1`,
                type: 'multiple_choice',
                difficulty: 'easy',
                question: 'Pertanyaan pertama kuis baru...',
                options: ['1', '2', '3', '4'],
                correct_answer: '1',
                explanation: 'Pintar sekali!',
                visual_emoji: '🍎',
                visual_count: 1
              }
            ]
          }
        ],
        checkpoint: {
          id: `${newCourseForm.value.id}_u1_checkpoint`,
          title: 'Ujian Checkpoint Unit 1',
          exercises: []
        }
      }
    ]
  }

  await adminStore.addCustomCourse(newCourseData)
  courseStore.addCustomCourse(newCourseData)
  await courseStore.loadCourses()
  selectCourseToManage(newCourseData.id)
  showNewCourseModal.value = false
  guiStatus.value = { error: false, message: `Kursus baru '${newCourseData.title}' berhasil dibuat!` }
}

const exportCourseJson = () => {
  if (!guiCourseForm.value) return
  const jsonStr = JSON.stringify({ course: guiCourseForm.value }, null, 2)
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(jsonStr)
    alert('JSON kursus berhasil disalin ke clipboard!')
  }
}

const loadActiveCourseToJson = () => {
  if (guiCourseForm.value) {
    jsonInput.value = JSON.stringify({ course: guiCourseForm.value }, null, 2)
    jsonStatus.value = { error: false, message: `JSON kursus '${guiCourseForm.value.title}' berhasil dimuat!` }
  }
}

// --- Other Admin Actions ---
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

const importCourseJSON = async () => {
  if (!jsonInput.value.trim()) {
    jsonStatus.value = { error: true, message: 'Harap masukkan data JSON kursus!' }
    return
  }
  try {
    const parsed = JSON.parse(jsonInput.value)
    if (!parsed.course || !parsed.course.id) {
      throw new Error('Format JSON harus memiliki kunci utama "course" dan "id"!')
    }
    await adminStore.addCustomCourse(parsed.course)
    courseStore.addCustomCourse(parsed.course)
    await courseStore.loadCourses()
    selectCourseToManage(parsed.course.id)
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

// --- Hapus Kursus ---
const confirmDeleteCourse = (c) => {
  courseToDelete.value = c
  deleteStatus.value = null
  showDeleteCourseModal.value = true
}

const executeCourseDelete = async () => {
  if (!courseToDelete.value) return
  const idToDelete = courseToDelete.value.id
  deleteStatus.value = 'loading'

  try {
    // Attempt to delete from PostgreSQL database
    await $fetch('/api/admin/course-delete', {
      method: 'DELETE',
      body: { courseId: idToDelete }
    })

    // Also remove from local store so UI updates immediately
    courseStore.removeCourseFromRegistry(idToDelete)
    adminStore.customCourses = (adminStore.customCourses || []).filter(c => c.id !== idToDelete)
    adminStore.saveToStorage()

    showDeleteCourseModal.value = false
    courseToDelete.value = null
    deleteStatus.value = null

    // Reload courses to refresh the list
    await courseStore.loadCourses()
    if (courseStore.catalogRegistry.length > 0) {
      selectCourseToManage(courseStore.catalogRegistry[0].id)
    }
  } catch (err) {
    console.error('[ADMIN] Delete course error:', err)
    courseStore.removeCourseFromRegistry(idToDelete)
    adminStore.customCourses = (adminStore.customCourses || []).filter(c => c.id !== idToDelete)
    adminStore.saveToStorage()
    showDeleteCourseModal.value = false
    courseToDelete.value = null
    deleteStatus.value = null
  }
}
</script>
