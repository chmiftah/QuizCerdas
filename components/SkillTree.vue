<template>
  <div class="space-y-6 py-2 select-none">
    
    <!-- Top View Switcher & Quick Navigation Toolbar -->
    <div class="bg-white/90 backdrop-blur-md px-4 py-3 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center font-heading text-lg font-black shadow-md border-b-2 border-amber-600 animate-bounce-slow">
          🗺️
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h3 class="font-heading text-base font-black text-slate-800">Peta Petualangan Belajar</h3>
            <span class="px-2.5 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full font-heading font-black text-[11px]">
              {{ courseStore.units.length }} Bioma
            </span>
          </div>
          <p class="text-[11px] font-heading font-bold text-slate-500 hidden sm:block">
            Jelajahi setiap pos, buka peti harta karun, dan taklukkan checkpoint!
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Center/Focus on Active Node Button -->
        <button 
          @click="scrollToActiveNode"
          class="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl font-heading font-black text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          title="Fokus ke Posisi Terakhir"
        >
          <span>🎯</span>
          <span class="hidden sm:inline">Posisi Saya</span>
        </button>

        <!-- View Mode Switcher Pills -->
        <div class="p-1 bg-slate-100 rounded-2xl flex items-center gap-1 border border-slate-200">
          <button 
            @click="setPathViewMode('classic')"
            class="px-3 py-1.5 rounded-xl font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
            :class="pathViewMode === 'classic' ? 'bg-[#58cc02] text-white shadow-md scale-105 border-b-2 border-[#459e03]' : 'text-slate-600 hover:text-slate-900'"
          >
            <span>✨ Jalur Petualang</span>
          </button>
          <button 
            @click="setPathViewMode('2d')"
            class="px-3 py-1.5 rounded-xl font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
            :class="pathViewMode === '2d' ? 'bg-duo-blue text-white shadow-md scale-105 border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'"
          >
            <span>🏝️ Peta Pulau</span>
          </button>
          <button 
            @click="setPathViewMode('3d')"
            class="px-3 py-1.5 rounded-xl font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
            :class="pathViewMode === '3d' ? 'bg-purple-500 text-white shadow-md scale-105 border-b-2 border-purple-700' : 'text-slate-600 hover:text-slate-900'"
          >
            <span>🌴 3D WebGL</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Duolingo/Mario Sticky Top Active Unit Header Bar -->
    <Transition name="slide-down">
      <div 
        v-if="showStickyHeader && courseStore.units.length > 0"
        class="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[calc(56rem-2rem)] rounded-3xl p-3 sm:p-4 text-white shadow-2xl border-4 border-black/15 backdrop-blur-md flex items-center justify-between gap-3 transition-all duration-300 select-none"
        :class="getUnitHeaderTheme(currentVisibleUnit?.color || 'emerald')"
      >
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button 
            @click="scrollToActiveNode" 
            class="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center font-heading font-black text-base shrink-0 border border-white/30 shadow-md cursor-pointer transition-all"
            title="Lompat ke Posisi Aktif"
          >
            🎯
          </button>
          <div class="min-w-0 space-y-0.5">
            <div class="text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider text-white/95 truncate flex items-center gap-1">
              <span>{{ getUnitBiomeIcon(currentVisibleUnit?.color) }}</span>
              <span>BIOMA {{ currentVisibleUnit?.order || 1 }} • {{ getUnitBiomeName(currentVisibleUnit?.color) }}</span>
            </div>
            <h4 class="font-heading font-black text-sm sm:text-base text-white truncate drop-shadow-xs">
              {{ currentVisibleUnit?.title || 'Petualangan Belajar' }}
            </h4>
          </div>
        </div>

        <div class="flex items-center gap-3 sm:gap-4 shrink-0">
          <!-- Mini Progress Bar -->
          <div v-if="currentVisibleUnit" class="hidden sm:flex flex-col items-end gap-1">
            <div class="text-[9px] font-heading font-black text-white uppercase tracking-widest drop-shadow-xs">
              {{ getUnitProgressPercent(currentVisibleUnit) }}% Dikuasai
            </div>
            <div class="w-28 h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/20 p-0.5">
              <div 
                class="h-full bg-amber-400 rounded-full transition-all shadow-sm"
                :style="{ width: `${getUnitProgressPercent(currentVisibleUnit)}%` }"
              ></div>
            </div>
          </div>

          <button 
            @click="showGuidebook(currentVisibleUnit)" 
            class="px-3.5 py-2 bg-white/25 hover:bg-white/40 active:scale-95 text-white rounded-2xl font-heading font-black text-xs flex items-center gap-1.5 border border-white/30 shadow-md cursor-pointer transition-all uppercase tracking-wider"
          >
            <span>📖 PANDUAN</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Loading State -->
    <div v-if="courseStore.units.length === 0" class="bg-white rounded-3xl p-10 text-center border-4 border-dashed border-slate-300 space-y-4 shadow-sm animate-pop">
      <div class="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center text-4xl mx-auto border-2 border-amber-300 animate-spin">
        🧭
      </div>
      <div class="space-y-1 max-w-sm mx-auto">
        <h3 class="font-heading text-xl font-black text-slate-800">Sedang Membuka Peta Petualangan...</h3>
        <p class="text-xs text-slate-500 font-body leading-relaxed">
          Menyiapkan jalur belajar dan peti harta karun untukmu!
        </p>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 1. OVERWORLD ADVENTURE PATH VIEW (Classic Snake Trail with Glowing Trails) -->
    <!-- ========================================================================= -->
    <div 
      v-else-if="pathViewMode === 'classic'"
      class="relative bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 rounded-[40px] p-4 sm:p-8 text-slate-800 space-y-16 shadow-2xl border-4 border-emerald-200/80 overflow-hidden min-h-[700px]"
    >
      <!-- Parallax Drifting Clouds in Background -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div class="clouds-layer clouds-layer-1"></div>
        <div class="clouds-layer clouds-layer-2"></div>
      </div>

      <!-- Unit Biomes Loop -->
      <div 
        v-for="(unit, unitIdx) in courseStore.units" 
        :key="unit.id" 
        :id="'unit-container-' + unit.id" 
        class="relative space-y-8 max-w-lg mx-auto z-10"
      >
        <!-- Unit Header Island Banner -->
        <div class="relative py-4 select-none">
          <div 
            class="p-4 sm:p-5 rounded-3xl text-white shadow-xl border-b-4 relative overflow-hidden flex items-center justify-between gap-4"
            :class="getUnitHeaderTheme(unit.color)"
          >
            <!-- Background Soft Ornaments -->
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
            
            <div class="space-y-1 min-w-0 z-10">
              <div class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/25 rounded-full text-[11px] font-heading font-black uppercase tracking-wider border border-white/20">
                <span>{{ getUnitBiomeIcon(unit.color) }}</span>
                <span>BIOMA {{ unit.order }} • {{ getUnitBiomeName(unit.color) }}</span>
              </div>
              <h3 class="font-heading text-xl sm:text-2xl font-black truncate drop-shadow-sm">
                {{ unit.title }}
              </h3>
              <p class="text-xs text-white/90 font-body line-clamp-1 max-w-sm">
                {{ getUnitSummary(unit) }}
              </p>
            </div>

            <!-- Unit Progress Pill -->
            <div class="bg-black/20 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/25 text-center shrink-0 space-y-1">
              <div class="text-[10px] font-heading font-black text-amber-300 uppercase">
                {{ getUnitProgressPercent(unit) }}% SELESAI
              </div>
              <div class="w-16 sm:w-20 bg-black/30 h-2 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div 
                  class="h-full bg-amber-400 rounded-full transition-all"
                  :style="{ width: `${getUnitProgressPercent(unit)}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Overworld Path Container with SVG Lines (Glowing Golden & Cobblestone Path) -->
        <div 
          class="relative w-full overflow-visible transition-all"
          :style="{ height: `${getClassicUnitContainerHeight(unit)}px` }"
        >
          <!-- SVG Paths Definition (Base Shadow + Road + Golden Glow + Flowing Dash Particles) -->
          <svg 
            class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            :viewBox="`0 0 400 ${getClassicUnitContainerHeight(unit)}`"
            preserveAspectRatio="none"
          >
            <defs>
              <!-- Golden Glow Filter for Completed Tracks -->
              <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- 1. Road Ground Shadow -->
            <path 
              :d="getClassicUnitSvgPath(unit)" 
              fill="none" 
              stroke="#0f172a" 
              stroke-width="28" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              opacity="0.12"
            />

            <!-- 2. Base Cobblestone Dirt Road Trail -->
            <path 
              :d="getClassicUnitSvgPath(unit)" 
              fill="none" 
              stroke="#cbd5e1" 
              stroke-width="20" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
            />

            <!-- 3. Completed Glowing Golden Path Segments -->
            <path 
              v-if="hasCompletedNodesInUnit(unit)"
              :d="getClassicUnitCompletedSvgPath(unit)" 
              fill="none" 
              stroke="#f59e0b" 
              stroke-width="18" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              filter="url(#glow-gold)"
            />
            <path 
              v-if="hasCompletedNodesInUnit(unit)"
              :d="getClassicUnitCompletedSvgPath(unit)" 
              fill="none" 
              stroke="#fde047" 
              stroke-width="10" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
            />

            <!-- 4. Animated Flowing Energy Particle Dash on Active Path -->
            <path 
              :d="getClassicUnitSvgPath(unit)" 
              fill="none" 
              stroke="#ffffff" 
              stroke-width="5" 
              stroke-dasharray="10 14"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="svg-energy-trail"
              opacity="0.85"
            />
          </svg>

          <!-- Floating Thematic Scenery Around Path -->
          <div class="absolute top-8 left-4 text-3xl animate-float pointer-events-none z-0">
            {{ getSceneryItem(unit.color, 0) }}
          </div>
          <div class="absolute top-[35%] right-4 text-4xl animate-bounce-slow pointer-events-none z-0">
            {{ getSceneryItem(unit.color, 1) }}
          </div>
          <div class="absolute top-[65%] left-3 text-3xl animate-float pointer-events-none z-0">
            {{ getSceneryItem(unit.color, 2) }}
          </div>
          <div class="absolute bottom-12 right-6 text-3xl pointer-events-none z-0">
            {{ getSceneryItem(unit.color, 3) }}
          </div>

          <!-- Nodes Loop (Lessons, Chests, Checkpoints) -->
          <template v-for="(item, itemIdx) in getClassicUnitNodeItems(unit)" :key="item.id">
            
            <div 
              :id="isNextActiveLesson(unit.id, item.id) ? 'active-lesson-node' : undefined"
              class="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
              :style="{ left: `${(item.x / 400) * 100}%`, top: `${item.y}px` }"
            >
              
              <!-- 1. "MULAI" Live Badge on Active Node -->
              <div 
                v-if="item.type === 'lesson' && isNextActiveLesson(unit.id, item.id)"
                class="absolute -top-12 z-30 flex flex-col items-center pointer-events-none animate-bounce"
              >
                <div class="relative bg-gradient-to-r from-emerald-500 to-[#58cc02] text-white px-3.5 py-1 rounded-2xl shadow-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border-2 border-white">
                  <span>MULAI DISINI</span>
                  <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#58cc02] border-r-2 border-b-2 border-white rotate-45"></div>
                </div>
              </div>

              <!-- 2. "LOMPAT KE SINI?" Badge on Unlocked Checkpoint -->
              <div 
                v-else-if="item.type === 'checkpoint' && isCheckpointUnlocked(unit.id) && !isCheckpointCompleted(item.id)"
                class="absolute -top-12 z-30 flex flex-col items-center pointer-events-none animate-bounce"
              >
                <div class="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3.5 py-1 rounded-2xl shadow-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border-2 border-white">
                  <span>👑 UJIAN CHECKPOINT</span>
                  <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 border-r-2 border-b-2 border-white rotate-45"></div>
                </div>
              </div>

              <!-- 3. LIVE MASCOT KIKO COMPANION (Next to Active Node) -->
              <div 
                v-if="isNextActiveLesson(unit.id, item.id)"
                class="absolute left-24 sm:left-28 -top-8 z-30 flex items-center gap-2 pointer-events-auto cursor-pointer animate-float"
                @click="onTapMascot"
                title="Klik Kiko untuk menyemangati!"
              >
                <!-- Mascot Speech Bubble -->
                <div class="bg-white px-3 py-1.5 rounded-2xl shadow-lg border-2 border-amber-300 text-[11px] font-heading font-black text-amber-950 whitespace-nowrap relative animate-pop">
                  <span>{{ currentMascotSpeech }}</span>
                  <div class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-l-2 border-b-2 border-amber-300 rotate-45"></div>
                </div>
                <!-- Kiko Avatar -->
                <div class="w-14 h-14 rounded-2xl bg-amber-400 text-3xl flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-transform">
                  🦉
                </div>
              </div>

              <!-- 4. Interactive Floating Popover Preview Card -->
              <Transition name="bounce-popover">
                <div 
                  v-if="selectedNodeId === item.id"
                  @click.outside="selectedNodeId = null"
                  class="absolute -top-44 left-1/2 -translate-x-1/2 z-40 bg-white text-slate-800 rounded-3xl p-5 w-72 shadow-2xl border-4 space-y-3 text-center animate-pop"
                  :class="item.type === 'checkpoint' ? 'border-purple-400' : 'border-[#58cc02]'"
                >
                  <!-- Arrow tip -->
                  <div 
                    class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
                    :class="item.type === 'checkpoint' ? 'border-t-purple-400' : 'border-t-[#58cc02]'"
                  ></div>

                  <div class="space-y-1">
                    <div class="flex items-center justify-center gap-1.5">
                      <span 
                        class="px-3 py-0.5 rounded-full text-[10px] font-heading font-black uppercase tracking-wide inline-block shadow-2xs"
                        :class="item.type === 'checkpoint' ? 'bg-purple-500 text-white' : 'bg-[#58cc02] text-white'"
                      >
                        {{ item.type === 'checkpoint' ? '👑 CHECKPOINT UNIT' : `🎯 TAHAP ${itemIdx + 1}` }}
                      </span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-heading font-black bg-amber-100 text-amber-900 border border-amber-300">
                        {{ item.type === 'checkpoint' ? '+50 XP' : '+20 XP' }}
                      </span>
                    </div>

                    <h4 class="font-heading text-base font-black text-slate-800 leading-snug">
                      {{ item.title }}
                    </h4>
                  </div>

                  <button 
                    @click="confirmStartNode(unit.id, item.id, item.type)"
                    class="w-full duo-btn-green py-3 text-xs font-heading font-black shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    :class="item.type === 'checkpoint' ? 'bg-purple-500 border-purple-600 hover:bg-purple-400' : ''"
                  >
                    <span>🚀 MULAI BELAJAR</span>
                  </button>
                </div>
              </Transition>

              <!-- ========================================== -->
              <!-- A. TREASURE CHEST NODE (Interactive Bonus) -->
              <!-- ========================================== -->
              <template v-if="item.type === 'chest'">
                <div class="relative flex flex-col items-center">
                  <!-- Ready / Unclaimed Chest Pulsing Callout -->
                  <div 
                    v-if="!isChestClaimed(item.id) && isChestReadyToClaim(unit.id)"
                    class="absolute -top-9 z-20 px-2.5 py-0.5 bg-amber-400 text-amber-950 font-heading font-black text-[10px] rounded-full border-2 border-white shadow-md animate-bounce whitespace-nowrap"
                  >
                    🎁 BUKA PETI!
                  </div>

                  <!-- 3D Chest Button -->
                  <button 
                    @click="onChestTap(unit.id, item.id)"
                    class="w-20 h-20 sm:w-22 sm:h-22 rounded-3xl flex items-center justify-center text-4xl shadow-xl cursor-pointer transition-all active:scale-90 border-b-8 relative z-10"
                    :class="isChestClaimed(item.id) 
                      ? 'bg-amber-100 border-amber-300 border-b-6 opacity-85' 
                      : isChestReadyToClaim(unit.id)
                        ? 'bg-gradient-to-b from-amber-300 to-amber-500 border-amber-600 animate-pulse-glow hover:scale-110'
                        : 'bg-slate-200 border-slate-300 opacity-60 cursor-not-allowed'"
                  >
                    <span v-if="isChestClaimed(item.id)" class="filter saturate-50">📭</span>
                    <span v-else class="animate-bounce-slow">🎁</span>
                  </button>

                  <!-- Badge Below Chest -->
                  <div 
                    @click="onChestTap(unit.id, item.id)"
                    class="mt-2 text-center bg-white px-3 py-0.5 rounded-xl border-2 border-slate-200 shadow-xs max-w-[150px] cursor-pointer"
                  >
                    <span class="font-heading font-black text-[11px] block truncate" :class="isChestClaimed(item.id) ? 'text-slate-400' : 'text-amber-700'">
                      {{ isChestClaimed(item.id) ? 'Sudah Diklaim' : 'Peti Bonus +30 XP' }}
                    </span>
                  </div>
                </div>
              </template>

              <!-- ========================================== -->
              <!-- B. CHECKPOINT NODE (Unit Boss / Finale)    -->
              <!-- ========================================== -->
              <template v-else-if="item.type === 'checkpoint'">
                <div class="relative flex flex-col items-center">
                  <button 
                    @click="onNodeTap(unit.id, item.id, item.type)"
                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-heading transition-all duration-200 select-none shadow-xl relative cursor-pointer hover:scale-105 active:scale-95 border-b-8 z-10"
                    :class="isCheckpointCompleted(item.id)
                      ? 'bg-amber-400 border-amber-600 text-amber-950'
                      : isCheckpointUnlocked(unit.id)
                        ? 'bg-purple-500 border-purple-700 text-white animate-pulse-glow hover:scale-110'
                        : 'bg-slate-200 border-slate-300 text-slate-400 opacity-75'"
                  >
                    <Trophy v-if="isCheckpointCompleted(item.id)" class="w-10 h-10 text-white fill-white drop-shadow-md" />
                    <Crown v-else-if="isCheckpointUnlocked(unit.id)" class="w-11 h-11 text-amber-300 fill-amber-300 animate-pulse drop-shadow-md" />
                    <Lock v-else class="w-8 h-8 text-slate-400" />
                  </button>

                  <!-- Checkpoint Title Badge Below -->
                  <div 
                    @click="onNodeTap(unit.id, item.id, item.type)"
                    class="mt-2 text-center bg-white px-3.5 py-1 rounded-xl border-2 border-purple-200 shadow-xs max-w-[160px] cursor-pointer hover:border-purple-400 transition-colors relative z-10"
                  >
                    <span class="font-heading font-black text-xs text-purple-700 block truncate">
                      {{ item.title }}
                    </span>
                  </div>
                </div>
              </template>

              <!-- ========================================== -->
              <!-- C. REGULAR LESSON NODE (Stage Node)        -->
              <!-- ========================================== -->
              <template v-else>
                <div class="relative flex flex-col items-center">
                  <!-- 3 Gold Stars Above Node for Completed Lessons -->
                  <div 
                    v-if="isNodeCompleted(unit.id, item.id, item.type)" 
                    class="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-0.5 px-2 py-0.5 bg-amber-400 border-2 border-amber-500 rounded-full shadow-md text-[10px]"
                  >
                    <span>⭐</span>
                    <span>⭐</span>
                    <span>⭐</span>
                  </div>

                  <!-- Lesson Number Badge for In-Progress Lessons -->
                  <div 
                    v-else-if="isLessonUnlocked(unit.id, item.id)"
                    class="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-2.5 py-0.5 bg-white border-2 border-slate-300 rounded-full shadow-md text-slate-800 font-heading font-black text-[10px] flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Pos {{ itemIdx + 1 }}</span>
                  </div>

                  <!-- Main Chunky Tactile Node Button -->
                  <button 
                    @click="onNodeTap(unit.id, item.id, item.type)"
                    class="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center font-heading transition-all duration-200 select-none shadow-xl relative cursor-pointer hover:scale-105 active:scale-95 border-b-8 z-10"
                    :class="isNodeCompleted(unit.id, item.id, item.type)
                      ? 'bg-amber-400 border-amber-600 text-amber-950'
                      : isLessonUnlocked(unit.id, item.id)
                        ? 'bg-[#58cc02] border-[#3b8a02] text-white shadow-emerald-500/30'
                        : 'bg-slate-200 border-slate-300 text-slate-400 opacity-75'"
                  >
                    <Check v-if="isNodeCompleted(unit.id, item.id, item.type)" class="w-10 h-10 text-white stroke-[4] drop-shadow-md" />
                    <Star v-else-if="isLessonUnlocked(unit.id, item.id)" class="w-10 h-10 text-white fill-white drop-shadow-sm" />
                    <Lock v-else class="w-8 h-8 text-slate-400" />

                    <!-- Active Glowing Ripple Ring -->
                    <div 
                      v-if="isNextActiveLesson(unit.id, item.id)"
                      class="absolute -inset-3 rounded-full border-4 border-[#58cc02] animate-ping pointer-events-none opacity-60"
                    ></div>
                  </button>

                  <!-- Stage Name Badge Below -->
                  <div 
                    @click="onNodeTap(unit.id, item.id, item.type)"
                    class="mt-2 text-center bg-white px-3.5 py-1 rounded-2xl border-2 border-slate-200 shadow-xs max-w-[160px] cursor-pointer hover:border-[#58cc02] transition-colors relative z-10"
                  >
                    <span class="font-heading font-extrabold text-xs text-slate-700 block truncate">
                      {{ item.title }}
                    </span>
                  </div>
                </div>
              </template>

            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 2. OTHER VIEW MODES (2D Illustrated Island & 3D WebGL)                    -->
    <!-- ========================================================================= -->
    <template v-else>
      <div 
        v-for="(unit, unitIdx) in courseStore.units" 
        :key="unit.id"
        :id="'unit-container-' + unit.id"
        class="relative space-y-6 transition-all duration-300 overflow-visible mb-12"
      >
        <!-- Unit Banner Header -->
        <div 
          @click="toggleUnitCollapse(unit.id)"
          class="rounded-3xl p-5 sm:p-6 text-white relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl border-b-4 border-black/15 z-10 overflow-hidden cursor-pointer hover:brightness-105 transition-all select-none"
          :class="getUnitHeaderTheme(unit.color)"
        >
          <div class="space-y-1 z-10">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-heading font-black uppercase tracking-wider backdrop-blur-md border border-white/25">
              <span>{{ getUnitBiomeIcon(unit.color) }}</span>
              <span>BIOMA {{ unit.order }} • {{ getUnitBiomeName(unit.color) }}</span>
            </div>
            <h2 class="font-heading text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
              {{ unit.title }}
            </h2>
            <p class="text-white/95 text-xs sm:text-sm font-body max-w-xl">
              {{ getUnitSummary(unit) }}
            </p>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto z-10 justify-between sm:justify-end">
            <div class="bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 font-heading text-xs font-bold text-center shrink-0 space-y-1">
              <div class="flex items-center justify-center gap-1.5 text-amber-300 font-extrabold text-sm">
                <Trophy class="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
                <span>{{ getUnitProgressPercent(unit) }}% Dikuasai</span>
              </div>
              <div class="w-28 bg-black/30 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div 
                  class="h-full bg-amber-400 rounded-full transition-all duration-500 shadow-sm"
                  :style="{ width: `${getUnitProgressPercent(unit)}%` }"
                ></div>
              </div>
            </div>

            <div 
              class="w-10 h-10 rounded-2xl bg-white/20 border border-white/35 flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-300"
              :class="isUnitCollapsed(unit.id) ? 'rotate-180' : 'rotate-0'"
            >
              <ChevronUp class="w-6 h-6 stroke-[3]" />
            </div>
          </div>
        </div>

        <template v-if="!isUnitCollapsed(unit.id)">
          <!-- 3D WEBGL ADVENTURE TRACK VIEW -->
          <div v-if="pathViewMode === '3d'" class="relative w-full py-2 animate-pop">
            <ClientOnly>
              <SkillPath3DCanvas 
                :unit="unit"
                :completedLessons="currentCompletedLessons"
                :completedCheckpoints="currentCompletedCheckpoints"
                @node-click="handle3DNodeClick"
              />
            </ClientOnly>
          </div>

          <!-- Winding 2D Map Path Container -->
          <div 
            v-else
            class="relative w-full overflow-visible transition-all animate-pop bg-emerald-100 rounded-[36px] p-6 border-4 border-emerald-300"
            :style="{ height: `${getUnitContainerHeight(unit)}px` }"
          >
            <!-- 2D SVG Path -->
            <svg 
              class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              :viewBox="`0 0 600 ${getUnitContainerHeight(unit)}`"
              preserveAspectRatio="none"
            >
              <path 
                :d="getUnitSvgPath(unit)" 
                fill="none" 
                stroke="#b45309" 
                stroke-width="36" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
              />
              <path 
                :d="getUnitSvgPath(unit)" 
                fill="none" 
                stroke="#f59e0b" 
                stroke-width="24" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
              />
              <path 
                :d="getUnitSvgPath(unit)" 
                fill="none" 
                stroke="#fef3c7" 
                stroke-width="6" 
                stroke-dasharray="10 10"
                stroke-linecap="round" 
                stroke-linejoin="round" 
              />
            </svg>

            <!-- 2D Node Items -->
            <div 
              v-for="(item, itemIdx) in getUnitNodeItems(unit)" 
              :key="item.id"
              :id="isNextActiveLesson(unit.id, item.id) ? 'active-lesson-node' : undefined"
              class="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              :style="{ left: `${(item.x / 600) * 100}%`, top: `${item.y}px` }"
            >
              <button 
                @click="onNodeTap(unit.id, item.id, item.type)"
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-heading transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95 border-b-8 z-10"
                :class="getNodeClass(unit.id, item.id, item.type, unit.color)"
              >
                <Check v-if="isNodeCompleted(unit.id, item.id, item.type)" class="w-10 h-10 text-white stroke-[4]" />
                <Crown v-else-if="item.type === 'checkpoint' && isCheckpointUnlocked(unit.id)" class="w-12 h-12 text-amber-900 fill-amber-300 animate-pulse" />
                <Star v-else-if="isLessonUnlocked(unit.id, item.id)" class="w-10 h-10 text-white fill-white" />
                <Lock v-else class="w-8 h-8 text-slate-400" />
              </button>

              <div 
                @click="onNodeTap(unit.id, item.id, item.type)"
                class="mt-2 text-center bg-white px-3.5 py-1 rounded-xl border-2 border-slate-200 shadow-xs max-w-[160px] cursor-pointer"
              >
                <span class="font-heading font-black text-xs text-slate-800 block truncate">
                  {{ item.title }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- ========================================================================= -->
    <!-- 3. UNBOXING TREASURE CHEST REWARD MODAL (Celebration Popup)               -->
    <!-- ========================================================================= -->
    <Teleport to="body">
      <div 
        v-if="activeChestModal" 
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      >
        <div class="bg-gradient-to-b from-amber-50 to-white rounded-[36px] p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl border-4 border-amber-400 relative overflow-hidden animate-pop">
          
          <!-- Confetti Star Burst Background Rings -->
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-300/30 rounded-full blur-2xl pointer-events-none"></div>

          <!-- 3D Chest Display -->
          <div class="relative pt-2">
            <div 
              class="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-7xl shadow-2xl border-4 border-amber-200 border-b-8"
              :class="chestOpeningAnimation ? 'animate-chest-open' : 'animate-bounce'"
            >
              <span>{{ activeChestClaimed ? '🌟' : '🎁' }}</span>
            </div>

            <!-- Floating Sparkles -->
            <div class="absolute top-0 right-14 text-2xl animate-ping">✨</div>
            <div class="absolute bottom-2 left-14 text-2xl animate-bounce">⭐</div>
          </div>

          <div class="space-y-2">
            <div class="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-heading font-black text-amber-900 uppercase">
              <span>🏆 HADIAH PETUALANGAN</span>
            </div>
            <h3 class="font-heading text-2xl sm:text-3xl font-black text-slate-800">
              {{ activeChestClaimed ? 'Peti Sudah Dibuka!' : 'Peti Harta Karun Terbuka!' }}
            </h3>
            <p class="text-slate-600 text-xs sm:text-sm font-body leading-relaxed max-w-xs mx-auto">
              {{ activeChestClaimed ? 'Kamu telah mengklaim bonus XP dari pos petualangan ini!' : 'Hebat! Kamu telah menyelesaikan modul pelajaran dan berhak mendapatkan hadiah bonus XP!' }}
            </p>
          </div>

          <!-- Reward Box Display -->
          <div class="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-around">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center text-xl font-black shadow-xs">
                ⚡
              </div>
              <div class="text-left">
                <div class="text-[10px] font-heading font-black text-amber-800 uppercase">BONUS XP</div>
                <div class="font-heading text-lg font-black text-amber-950">+30 XP</div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xl font-black shadow-xs">
                ❤️
              </div>
              <div class="text-left">
                <div class="text-[10px] font-heading font-black text-rose-800 uppercase">NYAWA</div>
                <div class="font-heading text-lg font-black text-rose-950">Penuh</div>
              </div>
            </div>
          </div>

          <!-- Modal Action Buttons -->
          <div class="space-y-2 pt-2">
            <button 
              v-if="!activeChestClaimed"
              @click="claimCurrentChest"
              class="w-full duo-btn-green py-4 text-base font-heading font-black shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <span>🎉 KLAIM SEKARANG (+30 XP)</span>
            </button>

            <button 
              @click="activeChestModal = null"
              class="w-full py-2.5 text-xs font-heading font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {{ activeChestClaimed ? 'Kembali ke Peta' : 'Nanti Saja' }}
            </button>
          </div>

        </div>
      </div>
    </Teleport>

    <!-- Auth Prompt Modal Popup -->
    <Teleport to="body">
      <div v-if="showAuthModal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl border-4 border-duo-blue animate-pop relative">
          <div class="w-20 h-20 rounded-full bg-amber-100 mx-auto flex items-center justify-center text-4xl shadow-md border-2 border-amber-300">
            🔐
          </div>
          
          <div class="space-y-2">
            <h3 class="font-heading text-2xl font-black text-slate-800">
              Wajib Login Terlebih Dahulu!
            </h3>
            <p class="text-slate-600 text-xs sm:text-sm font-body leading-relaxed">
              Kamu bisa menjelajahi peta ini, namun untuk <span class="font-bold text-duo-blue">mulai mengerjakan soal kuis</span> dan mengumpulkan XP, kamu harus masuk ke akunmu terlebih dahulu.
            </p>
          </div>

          <div class="space-y-2.5 pt-2">
            <NuxtLink 
              :to="`/login?redirect=${encodeURIComponent(pendingTargetUrl)}&reason=auth_required`"
              class="w-full duo-btn-blue py-3.5 text-base flex items-center justify-center gap-2 font-heading font-black"
            >
              <span>🔑 Masuk ke Akun Saya</span>
            </NuxtLink>

            <NuxtLink 
              to="/register"
              class="w-full duo-btn-green py-3 text-sm flex items-center justify-center gap-2 font-heading font-black"
            >
              <span>🚀 Daftar Akun Baru (Gratis)</span>
            </NuxtLink>

            <button 
              @click="showAuthModal = false"
              class="w-full py-2.5 text-xs font-heading font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Tutup & Lanjut Jelajah Peta
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useCourseStore } from '~/stores/course'
import { useUserStore } from '~/stores/user'
import { Check, Star, Lock, Trophy, Crown, ChevronUp } from 'lucide-vue-next'

const courseStore = useCourseStore()
const userStore = useUserStore()

const showAuthModal = ref(false)
const pendingTargetUrl = ref('')
const selectedNodeId = ref(null)
const pathViewMode = ref('classic')
const collapsedUnits = ref({})
const currentVisibleUnit = ref(null)
const showStickyHeader = ref(false)

// Chest & Unboxing State
const activeChestModal = ref(null)
const activeChestClaimed = ref(false)
const chestOpeningAnimation = ref(false)

// Mascot Interactive Speech
const mascotQuotes = [
  'Ayo semangat, kamu hebat! 🌟',
  'Satu langkah lagi menuju peti hadiah! 🎁',
  'Fokus dan jawab dengan teliti ya! 🦉',
  'Buktikan kemampuanmu di pos ini! 🚀',
  'Kumpulkan semua bintangnya! ⭐⭐⭐'
]
const currentQuoteIndex = ref(0)
const currentMascotSpeech = computed(() => mascotQuotes[currentQuoteIndex.value])

const onTapMascot = () => {
  playPopSound(580)
  currentQuoteIndex.value = (currentQuoteIndex.value + 1) % mascotQuotes.length
}

// Web Audio API Synthesized Sounds
const playPopSound = (freq = 440) => {
  if (typeof window === 'undefined') return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.09)
  } catch (e) {}
}

const playVictoryChime = () => {
  if (typeof window === 'undefined') return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 Fanfare
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + (idx * 0.1))
      gain.gain.setValueAtTime(0.25, ctx.currentTime + (idx * 0.1))
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (idx * 0.1) + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime + (idx * 0.1))
      osc.stop(ctx.currentTime + (idx * 0.1) + 0.32)
    })
  } catch (e) {}
}

const setPathViewMode = (mode) => {
  playPopSound(520)
  pathViewMode.value = mode
}

const isChestClaimed = (chestId) => {
  return userStore.isChestClaimed(chestId)
}

const isChestReadyToClaim = (unitId) => {
  const unit = courseStore.units.find(u => u.id === unitId)
  if (!unit || unit.lessons.length === 0) return false
  // Ready if the first lesson is completed
  return isLessonCompleted(unit.lessons[0].id)
}

const onChestTap = (unitId, chestId) => {
  playPopSound(480)
  const isClaimed = isChestClaimed(chestId)
  activeChestClaimed.value = isClaimed
  activeChestModal.value = { unitId, chestId }
  if (!isClaimed && isChestReadyToClaim(unitId)) {
    playVictoryChime()
  }
}

const claimCurrentChest = () => {
  if (!activeChestModal.value) return
  const { chestId } = activeChestModal.value
  chestOpeningAnimation.value = true
  playVictoryChime()
  setTimeout(() => {
    userStore.claimChest(chestId, 30)
    activeChestClaimed.value = true
    chestOpeningAnimation.value = false
  }, 400)
}

const getClassicUnitNodeItems = (unit) => {
  const items = []
  const baseWidth = 400
  const startY = 85
  const ySpacing = 180
  const waveOffsets = [0, 52, -52, 0]
  
  let currentY = startY

  unit.lessons.forEach((lesson, index) => {
    // Insert a chest after lesson 1 if unit has more than 1 lesson
    if (index === 1) {
      items.push({
        id: `chest_${unit.id}`,
        title: 'Peti Hadiah XP Bonus 🎁',
        type: 'chest',
        x: (baseWidth / 2) - 60,
        y: currentY
      })
      currentY += ySpacing
    }
    
    items.push({
      id: lesson.id,
      title: lesson.title,
      type: 'lesson',
      x: (baseWidth / 2) + waveOffsets[index % waveOffsets.length],
      y: currentY
    })
    currentY += ySpacing
  })

  // Add Checkpoint at the end of path
  items.push({
    id: unit.checkpoint?.id || `checkpoint_${unit.id}`,
    title: unit.checkpoint?.title || `Checkpoint Unit ${unit.order}`,
    type: 'checkpoint',
    x: baseWidth / 2,
    y: currentY
  })

  return items
}

const getClassicUnitContainerHeight = (unit) => {
  const items = getClassicUnitNodeItems(unit)
  if (items.length === 0) return 300
  return items[items.length - 1].y + 140
}

const getClassicUnitSvgPath = (unit) => {
  const items = getClassicUnitNodeItems(unit)
  if (items.length === 0) return ''

  let d = `M ${items[0].x} ${items[0].y}`
  for (let i = 0; i < items.length - 1; i++) {
    const current = items[i]
    const next = items[i + 1]
    const midY = (current.y + next.y) / 2
    d += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`
  }

  return d
}

const hasCompletedNodesInUnit = (unit) => {
  return unit.lessons.some(l => isLessonCompleted(l.id)) || isCheckpointCompleted(unit.checkpoint?.id)
}

const getClassicUnitCompletedSvgPath = (unit) => {
  const items = getClassicUnitNodeItems(unit)
  if (items.length === 0) return ''

  // Find the index of the highest completed node
  let lastCompletedIdx = -1
  for (let i = 0; i < items.length; i++) {
    const it = items[i]
    if (it.type === 'lesson' && isLessonCompleted(it.id)) {
      lastCompletedIdx = i
    } else if (it.type === 'checkpoint' && isCheckpointCompleted(it.id)) {
      lastCompletedIdx = i
    } else if (it.type === 'chest' && isChestClaimed(it.id)) {
      lastCompletedIdx = i
    }
  }

  if (lastCompletedIdx <= 0) {
    if (lastCompletedIdx === 0) {
      return `M ${items[0].x} ${items[0].y} L ${items[0].x} ${items[0].y}`
    }
    return ''
  }

  let d = `M ${items[0].x} ${items[0].y}`
  for (let i = 0; i < lastCompletedIdx; i++) {
    const current = items[i]
    const next = items[i + 1]
    const midY = (current.y + next.y) / 2
    d += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`
  }

  return d
}

const toggleUnitCollapse = (unitId) => {
  collapsedUnits.value[unitId] = !collapsedUnits.value[unitId]
}

const isUnitCollapsed = (unitId) => {
  return !!collapsedUnits.value[unitId]
}

const updateActiveUnitOnScroll = () => {
  if (typeof window !== 'undefined') {
    showStickyHeader.value = window.scrollY > 140
  }

  if (!courseStore.units || courseStore.units.length === 0) return

  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const viewportCenter = viewportHeight * 0.45

  let activeUnit = courseStore.units[0]

  for (const unit of courseStore.units) {
    const el = document.getElementById(`unit-container-${unit.id}`)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= viewportCenter && rect.bottom >= 100) {
        activeUnit = unit
      }
    }
  }

  currentVisibleUnit.value = activeUnit
}

const scrollToActiveNode = () => {
  if (typeof window === 'undefined') return
  playPopSound(500)
  const el = document.getElementById('active-lesson-node')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else if (courseStore.units && courseStore.units.length > 0) {
    const firstUnitEl = document.getElementById(`unit-container-${courseStore.units[0].id}`)
    if (firstUnitEl) firstUnitEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const showGuidebook = (unit) => {
  if (!unit) return
  if (typeof window !== 'undefined') {
    alert(`📖 BUKU PANDUAN BIOMA ${unit.order}\n\n${unit.title}\n\nDeskripsi Materi:\n${getUnitSummary(unit)}`)
  }
}

onMounted(() => {
  updateActiveUnitOnScroll()
  window.addEventListener('scroll', updateActiveUnitOnScroll, { passive: true })
  
  nextTick(() => {
    scrollToActiveNode()
    setTimeout(scrollToActiveNode, 300)
  })
})

watch(() => courseStore.units, () => {
  nextTick(() => {
    updateActiveUnitOnScroll()
    setTimeout(scrollToActiveNode, 300)
  })
}, { immediate: true, deep: true })

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateActiveUnitOnScroll)
  }
})

const handle3DNodeClick = ({ unitId, itemId, type }) => {
  confirmStartNode(unitId, itemId, type)
}

const activeCourseId = computed(() => courseStore.activeCourseId)

const currentCompletedLessons = computed(() => {
  return userStore.getCompletedLessonsForCourse(activeCourseId.value)
})

const currentCompletedCheckpoints = computed(() => {
  return userStore.getCompletedCheckpointsForCourse(activeCourseId.value)
})

// Calculate list of items for 2D Map view
const getUnitNodeItems = (unit) => {
  const items = []
  const baseWidth = 600
  const startY = 85
  const ySpacing = 150
  const waveOffsets = [-140, 140, -140, 140]

  unit.lessons.forEach((lesson, index) => {
    const offset = waveOffsets[index % waveOffsets.length]
    items.push({
      id: lesson.id,
      title: lesson.title,
      type: 'lesson',
      x: (baseWidth / 2) + offset,
      y: startY + (index * ySpacing)
    })
  })

  // Add Checkpoint at the end of path
  const lastIdx = unit.lessons.length
  const lastOffset = waveOffsets[lastIdx % waveOffsets.length]
  items.push({
    id: unit.checkpoint?.id || `checkpoint_${unit.id}`,
    title: unit.checkpoint?.title || `Checkpoint Unit ${unit.order}`,
    type: 'checkpoint',
    x: (baseWidth / 2) + lastOffset,
    y: startY + (lastIdx * ySpacing)
  })

  return items
}

const getUnitContainerHeight = (unit) => {
  const totalCount = unit.lessons.length + 1
  return 85 + ((totalCount - 1) * 150) + 120
}

const getUnitSvgPath = (unit) => {
  const items = getUnitNodeItems(unit)
  if (items.length === 0) return ''

  let d = `M ${items[0].x} ${items[0].y}`
  for (let i = 0; i < items.length - 1; i++) {
    const current = items[i]
    const next = items[i + 1]
    const midY = (current.y + next.y) / 2
    d += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`
  }

  return d
}

const onNodeTap = (unitId, itemId, type) => {
  playPopSound(460)
  const isUnlocked = type === 'checkpoint'
    ? isCheckpointUnlocked(unitId)
    : isLessonUnlocked(unitId, itemId)

  if (!isUnlocked) return

  if (selectedNodeId.value === itemId) {
    confirmStartNode(unitId, itemId, type)
  } else {
    selectedNodeId.value = itemId
  }
}

const confirmStartNode = (unitId, itemId, type) => {
  const targetPath = type === 'checkpoint' 
    ? `/course/${unitId}/checkpoint` 
    : `/course/${unitId}/${itemId}`

  if (!userStore.isAuthenticated) {
    pendingTargetUrl.value = targetPath
    showAuthModal.value = true
    return
  }

  selectedNodeId.value = null
  navigateTo(targetPath)
}

const isLessonUnlocked = (unitId, lessonId) => {
  return courseStore.isLessonUnlocked(unitId, lessonId, currentCompletedLessons.value, currentCompletedCheckpoints.value)
}

const isLessonCompleted = (lessonId) => {
  return userStore.isLessonCompleted(lessonId, activeCourseId.value)
}

const isCheckpointUnlocked = (unitId) => {
  return courseStore.isCheckpointUnlocked(unitId, currentCompletedLessons.value)
}

const isCheckpointCompleted = (checkpointId) => {
  return userStore.isCheckpointCompleted(checkpointId, activeCourseId.value)
}

const isNodeCompleted = (unitId, itemId, type) => {
  return type === 'checkpoint' 
    ? isCheckpointCompleted(itemId)
    : isLessonCompleted(itemId)
}

const isNextActiveLesson = (unitId, lessonId) => {
  return isLessonUnlocked(unitId, lessonId) && !isLessonCompleted(lessonId)
}

const getUnitHeaderTheme = (color) => {
  switch (color) {
    case 'emerald': return 'bg-gradient-to-r from-emerald-600 to-emerald-700 border-emerald-800'
    case 'sky': return 'bg-gradient-to-r from-sky-500 to-blue-600 border-blue-700'
    case 'amber': return 'bg-gradient-to-r from-amber-500 to-orange-500 border-orange-600'
    case 'rose': return 'bg-gradient-to-r from-rose-500 to-pink-600 border-pink-700'
    default: return 'bg-gradient-to-r from-emerald-600 to-emerald-700 border-emerald-800'
  }
}

const getUnitBiomeIcon = (color) => {
  switch (color) {
    case 'emerald': return '🌲'
    case 'sky': return '☁️'
    case 'amber': return '🏰'
    case 'rose': return '🧁'
    default: return '🌴'
  }
}

const getUnitBiomeName = (color) => {
  switch (color) {
    case 'emerald': return 'LEMBAH HIJAU'
    case 'sky': return 'KERAJAAN AWAN'
    case 'amber': return 'ISTANA MATAHARI'
    case 'rose': return 'NEGERI MANIS'
    default: return 'PETUALANGAN'
  }
}

const getSceneryItem = (color, index) => {
  const map = {
    emerald: ['🌲', '🦊', '🍄', '🌳'],
    sky: ['☁️', '🌈', '🏔️', '🕊️'],
    amber: ['🌻', '🏰', '🦁', '🌴'],
    rose: ['🧁', '🍭', '🌸', '🍬']
  }
  const items = map[color] || map.emerald
  return items[index % items.length]
}

const getUnitSummary = (unit) => {
  return unit.lessons.map(l => l.title).join(' • ')
}

const getUnitProgressPercent = (unit) => {
  const total = unit.lessons.length
  const completed = unit.lessons.filter(l => isLessonCompleted(l.id)).length
  return Math.round((completed / total) * 100)
}

const getNodeClass = (unitId, itemId, type, color) => {
  const unlocked = type === 'checkpoint' ? isCheckpointUnlocked(unitId) : isLessonUnlocked(unitId, itemId)
  const completed = isNodeCompleted(unitId, itemId, type)

  if (completed) {
    return 'bg-amber-400 border-amber-600 text-slate-900 shadow-amber-400/40'
  }
  if (unlocked) {
    if (type === 'checkpoint') {
      return 'bg-purple-500 border-purple-700 text-white shadow-purple-500/50 animate-pulse-glow'
    }
    switch (color) {
      case 'emerald': return 'bg-emerald-500 border-emerald-700 text-white shadow-emerald-500/40'
      case 'sky': return 'bg-sky-500 border-blue-700 text-white shadow-blue-500/40'
      case 'amber': return 'bg-amber-400 border-amber-600 text-slate-900 shadow-yellow-500/40'
      case 'rose': return 'bg-rose-500 border-red-700 text-white shadow-rose-500/40'
      default: return 'bg-emerald-500 border-emerald-700 text-white shadow-emerald-500/40'
    }
  }
  return 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed opacity-80 border-b-6 shadow-xs'
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.bounce-popover-enter-active {
  animation: duo-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.bounce-popover-leave-active {
  transition: all 0.15s ease-in;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.animate-bounce-slow {
  animation: bounceSlow 2s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.6); }
  50% { box-shadow: 0 0 30px rgba(234, 179, 8, 0.9); }
}

.animate-pulse-glow {
  animation: pulseGlow 1.8s ease-in-out infinite;
}

@keyframes chestOpen {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.15) rotate(-6deg); }
  50% { transform: scale(1.15) rotate(6deg); }
  75% { transform: scale(1.25) rotate(-3deg); }
  100% { transform: scale(1.1) rotate(0deg); }
}

.animate-chest-open {
  animation: chestOpen 0.5s ease-in-out;
}

/* Animated SVG Energy Trail */
@keyframes dashTravel {
  from {
    stroke-dashoffset: 48;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.svg-energy-trail {
  animation: dashTravel 1.5s linear infinite;
}

/* Parallax Drifting Clouds Background */
.clouds-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: repeat-y;
}

.clouds-layer-1 {
  background-image: radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 25%),
                    radial-gradient(circle at 85% 60%, rgba(255, 255, 255, 0.5) 0%, transparent 30%),
                    radial-gradient(circle at 25% 85%, rgba(255, 255, 255, 0.6) 0%, transparent 25%);
  animation: cloudsDrift 40s linear infinite;
}

.clouds-layer-2 {
  background-image: radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 20%),
                    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 25%);
  animation: cloudsDrift 60s linear infinite reverse;
}

@keyframes cloudsDrift {
  0% { transform: translateY(0); }
  100% { transform: translateY(-300px); }
}
</style>
