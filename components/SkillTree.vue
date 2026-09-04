<template>
  <div class="space-y-8 py-4">
    <!-- Compact 1-Line View Switcher Toolbar -->
    <div class="bg-white px-4 py-2.5 rounded-2xl border-2 border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-duo-green text-white flex items-center justify-center font-heading text-base font-bold shadow-2xs">
          🎯
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="font-heading text-base font-black text-slate-800">Skill Path</h3>
          <span class="px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded-full font-heading font-bold text-[11px] text-slate-500">
            {{ courseStore.units.length }} Unit
          </span>
        </div>
      </div>

      <div class="p-1 bg-slate-100 rounded-xl flex items-center gap-1 border border-slate-200">
        <button 
          @click="pathViewMode = 'classic'"
          class="px-3 py-1 rounded-lg font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
          :class="pathViewMode === 'classic' ? 'bg-[#58cc02] text-white shadow-2xs scale-105' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>🎯 Jalur Klasik</span>
        </button>
        <button 
          @click="pathViewMode = '3d'"
          class="px-3 py-1 rounded-lg font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
          :class="pathViewMode === '3d' ? 'bg-duo-green text-white shadow-2xs scale-105' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>🌴 Jalur 3D</span>
        </button>
        <button 
          @click="pathViewMode = '2d'"
          class="px-3 py-1 rounded-lg font-heading font-black text-xs transition-all cursor-pointer flex items-center gap-1"
          :class="pathViewMode === '2d' ? 'bg-duo-blue text-white shadow-2xs scale-105' : 'text-slate-600 hover:text-slate-900'"
        >
          <span>🗺️ Peta 2D</span>
        </button>
      </div>
    </div>

    <!-- Duolingo-Style Sticky Top Active Unit Header Bar (Pins active unit on scroll without overlapping navbar) -->
    <Transition name="slide-down">
      <div 
        v-if="courseStore.units.length > 0"
        class="sticky top-16 sm:top-20 z-30 w-full rounded-2xl p-3 sm:p-4 text-white shadow-2xl border-4 border-black/15 backdrop-blur-md flex items-center justify-between gap-3 transition-all duration-300 select-none mb-4"
        :class="getUnitHeaderTheme(currentVisibleUnit?.color || 'emerald')"
      >
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <!-- Target Pin Button: Jump to active node -->
          <button 
            @click="scrollToActiveNode" 
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center font-heading font-black text-sm sm:text-base shrink-0 border border-white/30 shadow-md cursor-pointer transition-all"
            title="Lompat ke Posisi Aktif Belajar"
          >
            🎯
          </button>
          <div class="min-w-0 space-y-0.5">
            <div class="text-[10px] sm:text-xs font-heading font-black uppercase tracking-wider text-white/95 truncate flex items-center gap-1">
              <span>←</span>
              <span>BAGIAN 1, UNIT {{ currentVisibleUnit?.order || 1 }}</span>
            </div>
            <h4 class="font-heading font-black text-sm sm:text-base text-white truncate drop-shadow-xs">
              {{ currentVisibleUnit?.title || 'Petualangan Belajar' }}
            </h4>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button 
            @click="scrollToActiveNode" 
            class="px-3 sm:px-4 py-2 bg-white/25 hover:bg-white/40 active:scale-95 text-white rounded-xl font-heading font-black text-[11px] sm:text-xs flex items-center gap-1.5 border border-white/30 shadow-md cursor-pointer transition-all uppercase tracking-wider"
          >
            <span>📖 BUKU PANDUAN</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Empty / Loading State -->
    <div v-if="courseStore.units.length === 0" class="bg-white rounded-3xl p-8 text-center border-4 border-dashed border-slate-300 space-y-4 shadow-sm animate-pop">
      <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto border-2 border-slate-200">
        🗺️
      </div>
      <div class="space-y-1 max-w-sm mx-auto">
        <h3 class="font-heading text-xl font-black text-slate-800">Sedang Memuat Peta Belajar...</h3>
        <p class="text-xs text-slate-500 font-body leading-relaxed">
          Mohon tunggu sebentar, data modul pembelajaran sedang disinkronkan.
        </p>
      </div>
    </div>

    <!-- DUOLINGO CLASSIC DARK SNAKE PATH VIEW (Matches User Reference Image 100%) -->
    <div 
      v-else-if="pathViewMode === 'classic'"
      class="bg-[#131f24] rounded-[36px] p-4 sm:p-8 text-white space-y-12 shadow-2xl border-4 border-slate-800 relative overflow-hidden min-h-[600px]"
    >
      <!-- Background Ambient Glow -->
      <div class="absolute inset-0 pointer-events-none bg-radial from-emerald-950/20 via-transparent to-transparent"></div>

      <!-- Unit Chapters Continuous Flow -->
      <div 
        v-for="(unit, unitIdx) in courseStore.units" 
        :key="unit.id" 
        :id="'unit-container-' + unit.id" 
        class="relative space-y-8"
      >
        <!-- Unit Title Section Header Line (for units after unit 1) -->
        <div v-if="unitIdx > 0" class="relative py-6 flex items-center justify-center my-6 select-none">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t-2 border-slate-700/80"></div>
          </div>
          <div class="relative bg-[#18272f] px-6 py-2 rounded-2xl border-2 border-slate-700 text-xs sm:text-sm font-heading font-black text-slate-300 shadow-lg flex items-center gap-2">
            <span>{{ getUnitBiomeIcon(unit.color) }}</span>
            <span>BAGIAN 1, UNIT {{ unit.order }} • {{ unit.title }}</span>
          </div>
        </div>

        <!-- Vertical Snake Path Items Loop for Unit -->
        <div class="relative flex flex-col items-center gap-8 sm:gap-10 py-4 max-w-md mx-auto">
          
          <template v-for="(item, itemIdx) in getClassicUnitNodeItems(unit)" :key="item.id">
            
            <div 
              :id="isNextActiveLesson(unit.id, item.id) ? 'active-lesson-node' : undefined"
              class="relative flex flex-col items-center group transition-transform"
              :class="item.classOffset"
            >
              <!-- 1. "MULAI" Callout Badge (Dark Box with Arrow Tail) -->
              <div 
                v-if="item.type === 'lesson' && isNextActiveLesson(unit.id, item.id)"
                class="absolute -top-12 z-30 flex flex-col items-center pointer-events-none animate-bounce"
              >
                <div class="relative bg-[#18272f] border-2 border-[#58cc02] text-[#58cc02] px-4 py-1.5 rounded-2xl shadow-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>MULAI</span>
                  <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#18272f] border-r-2 border-b-2 border-[#58cc02] rotate-45"></div>
                </div>
              </div>

              <!-- 2. "LOMPAT KE SINI?" Callout Badge for Unit Jump / Checkpoint -->
              <div 
                v-else-if="item.type === 'checkpoint' && isCheckpointUnlocked(unit.id) && !isCheckpointCompleted(item.id)"
                class="absolute -top-12 z-30 flex flex-col items-center pointer-events-none animate-bounce"
              >
                <div class="relative bg-[#18272f] border-2 border-purple-400 text-purple-300 px-3.5 py-1.5 rounded-2xl shadow-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span>LOMPAT KE SINI?</span>
                  <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#18272f] border-r-2 border-b-2 border-purple-400 rotate-45"></div>
                </div>
              </div>

              <!-- Floating Interactive Popover Card -->
              <Transition name="bounce-popover">
                <div 
                  v-if="selectedNodeId === item.id"
                  @click.outside="selectedNodeId = null"
                  class="absolute -top-40 left-1/2 -translate-x-1/2 z-40 bg-[#18272f] text-white rounded-3xl p-5 w-72 shadow-2xl border-4 space-y-3.5 text-center animate-pop"
                  :class="item.type === 'checkpoint' ? 'border-purple-400' : 'border-[#58cc02]'"
                >
                  <div 
                    class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#18272f]"
                  ></div>

                  <div class="space-y-1.5">
                    <span 
                      class="px-3 py-0.5 rounded-full text-[10px] font-heading font-black uppercase tracking-wide inline-block shadow-2xs"
                      :class="item.type === 'checkpoint' ? 'bg-purple-500 text-white' : 'bg-[#58cc02] text-white'"
                    >
                      {{ item.type === 'checkpoint' ? '👑 UJIAN CHECKPOINT' : `🎯 PELAJARAN ${itemIdx + 1}` }}
                    </span>
                    <h4 class="font-heading text-base font-black text-white leading-snug">
                      {{ item.title }}
                    </h4>
                  </div>

                  <button 
                    @click="confirmStartNode(unit.id, item.id, item.type)"
                    class="w-full duo-btn-green py-3 text-xs font-heading font-black shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    :class="item.type === 'checkpoint' ? 'bg-purple-600 border-purple-800 hover:bg-purple-500' : ''"
                  >
                    <span>🚀 MULAI BELAJAR</span>
                  </button>
                </div>
              </Transition>

              <!-- Node Button Elements -->

              <!-- A. TREASURE CHEST NODE & MASCOT -->
              <template v-if="item.type === 'chest'">
                <div class="relative flex items-center justify-center">
                  <!-- Treasure Chest Button -->
                  <div 
                    @click="onNodeTap(unit.id, item.id, item.type)"
                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#203239] border-4 border-[#374e56] border-b-8 flex items-center justify-center text-4xl shadow-xl cursor-pointer hover:scale-105 transition-transform"
                  >
                    🎁
                  </div>
                  
                  <!-- Mascot Companion Standing / Dancing Beside Chest -->
                  <div class="absolute left-28 sm:left-32 z-20 flex flex-col items-center pointer-events-none animate-float">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 text-5xl sm:text-6xl flex items-center justify-center drop-shadow-2xl">
                      🦉
                    </div>
                  </div>
                </div>
              </template>

              <!-- B. CHECKPOINT / JUMP NODE (Purple ⏩) -->
              <template v-else-if="item.type === 'checkpoint'">
                <button 
                  @click="onNodeTap(unit.id, item.id, item.type)"
                  class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-heading transition-all duration-200 select-none shadow-2xl relative cursor-pointer hover:scale-105 active:scale-95 border-b-8"
                  :class="isCheckpointCompleted(item.id)
                    ? 'bg-gradient-to-b from-amber-400 to-yellow-500 border-amber-700 text-slate-900'
                    : isCheckpointUnlocked(unit.id)
                      ? 'bg-gradient-to-b from-purple-500 to-purple-700 border-purple-900 text-white animate-pulse-glow'
                      : 'bg-[#203239] border-[#374e56] text-slate-500 opacity-60'"
                >
                  <Trophy v-if="isCheckpointCompleted(item.id)" class="w-10 h-10 text-white fill-white" />
                  <FastForward v-else-if="isCheckpointUnlocked(unit.id)" class="w-10 h-10 text-white fill-white" />
                  <Lock v-else class="w-8 h-8 text-slate-500" />
                </button>
              </template>

              <!-- C. REGULAR LESSON NODE (Green Star ⭐ / Gold Star ⭐ / Gray Lock) -->
              <template v-else>
                <div class="relative flex items-center justify-center">
                  <!-- 3 Gold Stars above node if completed -->
                  <div 
                    v-if="isNodeCompleted(unit.id, item.id, item.type)" 
                    class="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-0.5 px-2 py-0.5 bg-amber-400/90 border border-amber-500 rounded-full shadow-md text-[10px]"
                  >
                    <span class="text-yellow-100">⭐</span>
                    <span class="text-yellow-100">⭐</span>
                    <span class="text-yellow-100">⭐</span>
                  </div>

                  <button 
                    @click="onNodeTap(unit.id, item.id, item.type)"
                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-heading transition-all duration-200 select-none shadow-2xl relative cursor-pointer hover:scale-105 active:scale-95 border-b-8"
                    :class="isNodeCompleted(unit.id, item.id, item.type)
                      ? 'bg-gradient-to-b from-amber-400 to-yellow-500 border-amber-700 text-slate-900'
                      : isLessonUnlocked(unit.id, item.id)
                        ? 'bg-gradient-to-b from-[#58cc02] to-[#46a302] border-[#3b8a02] text-white shadow-[#58cc02]/40'
                        : 'bg-[#203239] border-[#374e56] text-slate-500 opacity-60'"
                  >
                    <Check v-if="isNodeCompleted(unit.id, item.id, item.type)" class="w-10 h-10 text-white stroke-[4]" />
                    <Star v-else-if="isLessonUnlocked(unit.id, item.id)" class="w-10 h-10 text-white fill-white drop-shadow-md" />
                    <Lock v-else class="w-8 h-8 text-slate-500" />

                    <!-- Active Glowing Ring -->
                    <div 
                      v-if="isNextActiveLesson(unit.id, item.id)"
                      class="absolute -inset-3 rounded-full border-4 border-[#58cc02] animate-ping pointer-events-none opacity-75"
                    ></div>
                  </button>
                </div>
              </template>

              <!-- Node Title Badge Below -->
              <div 
                @click="onNodeTap(unit.id, item.id, item.type)"
                class="mt-2 text-center bg-[#18272f] px-3.5 py-1 rounded-xl border border-slate-700 shadow-md max-w-[160px] cursor-pointer hover:border-[#58cc02] transition-colors"
              >
                <span class="font-heading font-extrabold text-xs text-slate-200 block truncate">
                  {{ item.title }}
                </span>
              </div>

            </div>

          </template>

        </div>
      </div>
    </div>

    <!-- Unit Chapters Loop (For 3D and 2D Map modes) -->
    <div 
      v-else
      v-for="(unit, unitIdx) in courseStore.units" 
      :key="unit.id"
      :id="'unit-container-' + unit.id"
      class="rounded-[32px] border-4 p-5 sm:p-7 shadow-2xl relative space-y-8 transition-all duration-300 overflow-visible"
      :class="getUnitContainerTheme(unit.color)"
    >
      <!-- Vibrant Biome Header Banner (Clickable Collapse Header) -->
      <div 
        @click="toggleUnitCollapse(unit.id)"
        class="rounded-2xl p-5 sm:p-6 text-white relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border-b-4 border-black/15 z-10 overflow-hidden cursor-pointer group/header hover:brightness-105 transition-all select-none"
        :class="getUnitHeaderTheme(unit.color)"
      >
        <!-- Decorative Ambient Light Blobs -->
        <div class="absolute -right-8 -bottom-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -left-8 -top-10 w-36 h-36 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

        <div class="space-y-1.5 z-10">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-heading font-black uppercase tracking-wider backdrop-blur-md border border-white/25 shadow-2xs">
            <span>{{ getUnitBiomeIcon(unit.color) }}</span>
            <span>UNIT {{ unit.order }} • {{ getUnitBiomeName(unit.color) }}</span>
          </div>
          <h2 class="font-heading text-2xl sm:text-3xl font-black tracking-tight text-shadow-sm drop-shadow-md">
            {{ unit.title }}
          </h2>
          <p class="text-white/95 text-xs sm:text-sm font-body max-w-xl leading-relaxed drop-shadow-xs">
            {{ getUnitSummary(unit) }}
          </p>
        </div>

        <!-- Unit Completion Progress Badge & Sleek Rotating Chevron Toggle -->
        <div class="flex items-center gap-3 w-full sm:w-auto z-10 justify-between sm:justify-end">
          <div class="bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/30 font-heading text-xs font-bold text-center shrink-0 space-y-1 flex-1 sm:flex-none shadow-md">
            <div class="flex items-center justify-center gap-1.5 text-amber-300 font-extrabold text-sm drop-shadow-xs">
              <Trophy class="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
              <span>{{ getUnitProgressPercent(unit) }}% Selesai</span>
            </div>
            <div class="w-full bg-black/30 h-2.5 rounded-full overflow-hidden p-0.5 min-w-[120px] border border-white/20">
              <div 
                class="h-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-full transition-all duration-500 shadow-sm"
                :style="{ width: `${getUnitProgressPercent(unit)}%` }"
              ></div>
            </div>
          </div>

          <!-- Sleek Rotating Glass Chevron Icon -->
          <div 
            class="w-11 h-11 rounded-2xl bg-white/20 group-hover/header:bg-white/35 backdrop-blur-md border border-white/35 flex items-center justify-center text-white shadow-md shrink-0 transition-transform duration-300"
            :class="isUnitCollapsed(unit.id) ? 'rotate-180' : 'rotate-0'"
            :title="isUnitCollapsed(unit.id) ? 'Buka Jalur Belajar' : 'Tutup Jalur Belajar'"
          >
            <ChevronUp class="w-6 h-6 stroke-[3]" />
          </div>
        </div>
      </div>

      <!-- Collapsible Learning Path Body (Supports Both 3D & 2D Views) -->
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

        <!-- Winding 2D Map Path Container (100% Full Width Illustrated Game Map) -->
        <div 
          v-else
          class="relative w-full rounded-[36px] overflow-hidden border-4 shadow-xl transition-all animate-pop"
          :class="getUnitMapBgClass(unit.color)"
          :style="{ height: `${getUnitContainerHeight(unit)}px` }"
        >
        <!-- Illustrated Map Background Elements (River, Grass Textures, Hills) -->
        <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <!-- Winding Blue River Stream -->
          <svg class="absolute inset-0 w-full h-full opacity-75" :viewBox="`0 0 600 ${getUnitContainerHeight(unit)}`" preserveAspectRatio="none">
            <path 
              :d="getUnitRiverPath(unit)" 
              fill="none" 
              stroke="#38bdf8" 
              stroke-width="70" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
            <path 
              :d="getUnitRiverPath(unit)" 
              fill="none" 
              stroke="#7dd3fc" 
              stroke-width="38" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>

          <!-- Rolling Hill Shadows & Grass Accents -->
          <div class="absolute top-12 left-[-30px] w-64 h-40 bg-black/5 rounded-full blur-xl"></div>
          <div class="absolute top-[40%] right-[-30px] w-72 h-48 bg-black/5 rounded-full blur-xl"></div>
          <div class="absolute bottom-20 left-[10%] w-80 h-52 bg-black/5 rounded-full blur-xl"></div>
        </div>

        <!-- Dynamic SVG Winding Curved Trail (Thick Golden/Dirt Road) -->
        <svg 
          class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          :viewBox="`0 0 600 ${getUnitContainerHeight(unit)}`"
          preserveAspectRatio="none"
        >
          <!-- Outer Dark Border Track -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            stroke="#15803d" 
            stroke-width="48" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            opacity="0.3"
          />
          <!-- Track Outer Dirt Border -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            stroke="#b45309" 
            stroke-width="38" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
          />
          <!-- Track Vibrant Golden Dirt Road Core -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            stroke="#f59e0b" 
            stroke-width="26" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
          />
          <!-- Track Inner Dashed Guide Line -->
          <path 
            :d="getUnitSvgPath(unit)" 
            fill="none" 
            stroke="#fef3c7" 
            stroke-width="6" 
            stroke-dasharray="12 12"
            stroke-linecap="round" 
            stroke-linejoin="round" 
            opacity="0.95"
          />
        </svg>

        <!-- Rich Game Scenery Decorative Elements (Trees, Signposts, Bushes, Rocks) -->
        <template v-if="unit.color === 'emerald'">
          <div class="absolute top-6 left-6 text-4xl animate-float pointer-events-none z-0">🌲</div>
          <div class="absolute top-12 right-8 text-3xl pointer-events-none z-0">🪵</div>
          <div class="absolute top-[28%] left-6 text-3xl animate-bounce pointer-events-none z-0">🦊</div>
          <div class="absolute top-[45%] right-8 text-4xl pointer-events-none z-0">🌳</div>
          <div class="absolute top-[62%] left-8 text-3xl pointer-events-none z-0">🍄</div>
          <div class="absolute bottom-16 right-8 text-4xl animate-float pointer-events-none z-0">🌳</div>
          <div class="absolute bottom-6 left-10 text-3xl pointer-events-none z-0">🪨</div>
        </template>
        
        <template v-else-if="unit.color === 'sky' || unit.color === 'blue'">
          <div class="absolute top-6 right-8 text-4xl animate-float pointer-events-none z-0">☁️</div>
          <div class="absolute top-14 left-8 text-3xl pointer-events-none z-0">🏔️</div>
          <div class="absolute top-[32%] left-6 text-3xl animate-float pointer-events-none z-0">🕊️</div>
          <div class="absolute top-[50%] right-8 text-3xl pointer-events-none z-0">☃️</div>
          <div class="absolute bottom-20 left-8 text-4xl animate-bounce pointer-events-none z-0">🌈</div>
        </template>

        <template v-else-if="unit.color === 'amber'">
          <div class="absolute top-8 left-8 text-4xl animate-float pointer-events-none z-0">🌻</div>
          <div class="absolute top-16 right-8 text-4xl pointer-events-none z-0">🏰</div>
          <div class="absolute top-[35%] right-6 text-3xl pointer-events-none z-0">🌴</div>
          <div class="absolute top-[55%] left-6 text-3xl pointer-events-none z-0">🦁</div>
          <div class="absolute bottom-16 right-8 text-4xl animate-float pointer-events-none z-0">✨</div>
        </template>

        <template v-else-if="unit.color === 'rose'">
          <div class="absolute top-8 right-8 text-4xl animate-float pointer-events-none z-0">🧁</div>
          <div class="absolute top-16 left-8 text-3xl pointer-events-none z-0">🍭</div>
          <div class="absolute top-[35%] left-6 text-3xl animate-bounce pointer-events-none z-0">🌸</div>
          <div class="absolute top-[58%] right-6 text-3xl pointer-events-none z-0">🍬</div>
          <div class="absolute bottom-16 left-8 text-4xl animate-float pointer-events-none z-0">⭐</div>
        </template>

        <!-- Node Items Loop -->
        <div 
          v-for="(item, itemIdx) in getUnitNodeItems(unit)" 
          :key="item.id"
          :id="isNextActiveLesson(unit.id, item.id) ? 'active-lesson-node' : undefined"
          class="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
          :style="{ left: `${(item.x / 600) * 100}%`, top: `${item.y}px` }"
        >
          <!-- Duolingo-Style "MULAI" Callout Badge on Active Next Node -->
          <div 
            v-if="item.type === 'lesson' && isNextActiveLesson(unit.id, item.id)"
            class="absolute -top-14 z-30 flex flex-col items-center pointer-events-none animate-bounce"
          >
            <div class="relative bg-duo-green text-white px-3.5 py-1.5 rounded-xl shadow-xl font-heading font-black text-xs uppercase tracking-wider flex items-center gap-1.5 border border-emerald-400">
              <span>MULAI</span>
              <!-- Callout Triangle Arrow Tail -->
              <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-duo-green border-r border-b border-emerald-400 rotate-45"></div>
            </div>
          </div>

          <!-- Interactive Floating Popover Bubble Card -->
          <Transition name="bounce-popover">
            <div 
              v-if="selectedNodeId === item.id"
              @click.outside="selectedNodeId = null"
              class="absolute -top-40 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white rounded-3xl p-5 w-72 shadow-2xl border-4 space-y-3.5 text-center animate-pop"
              :class="item.type === 'checkpoint' ? 'border-amber-400 bg-amber-950/95' : 'border-emerald-400 bg-slate-900/95'"
            >
              <!-- Arrow pointer -->
              <div 
                class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
                :class="item.type === 'checkpoint' ? 'border-t-amber-950' : 'border-t-slate-900'"
              ></div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-center gap-1.5">
                  <span 
                    class="px-3 py-0.5 rounded-full text-[10px] font-heading font-black uppercase tracking-wide shadow-2xs"
                    :class="item.type === 'checkpoint' ? 'bg-amber-400 text-amber-950' : 'bg-emerald-400 text-slate-900'"
                  >
                    {{ item.type === 'checkpoint' ? '👑 UJIAN CHECKPOINT' : `🎯 PELAJARAN ${itemIdx + 1}` }}
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-heading font-extrabold bg-white/20 text-white border border-white/20">
                    {{ item.type === 'checkpoint' ? '+50 XP' : '+20 XP' }}
                  </span>
                </div>

                <h4 class="font-heading text-base font-black text-white leading-snug">
                  {{ item.title }}
                </h4>
                
                <p class="text-xs font-body leading-relaxed" :class="item.type === 'checkpoint' ? 'text-amber-200' : 'text-slate-300'">
                  {{ item.type === 'checkpoint' ? 'Buktikan penguasaan materimu di tantangan akhir unit ini!' : 'Kuis interaktif berhitung seru bergaya Duolingo.' }}
                </p>
              </div>

              <button 
                @click="confirmStartNode(unit.id, item.id, item.type)"
                class="w-full py-3 text-xs font-heading font-black shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-transform"
                :class="item.type === 'checkpoint' ? 'duo-btn-yellow' : 'duo-btn-green'"
              >
                <span>{{ item.type === 'checkpoint' ? '👑 BUKTIKAN KEMAMPUAN' : '🚀 MULAI BELAJAR' }}</span>
              </button>
            </div>
          </Transition>

          <!-- 3D Tactile Node Button Container -->
          <div class="relative flex items-center justify-center">
            <!-- 3-Star Rating Display Above Node (Matching Reference Image ⭐⭐⭐) -->
            <div 
              v-if="isNodeCompleted(unit.id, item.id, item.type)" 
              class="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-0.5 px-2 py-0.5 bg-amber-400/90 border border-amber-500 rounded-full shadow-md text-[10px]"
            >
              <span class="text-yellow-100">⭐</span>
              <span class="text-yellow-100">⭐</span>
              <span class="text-yellow-100">⭐</span>
            </div>

            <!-- Cobblestone Base Under Node -->
            <div class="absolute -bottom-2 w-20 h-6 bg-black/20 rounded-full blur-xs pointer-events-none"></div>

            <!-- Lesson Number Badge -->
            <div 
              v-if="item.type === 'lesson' && isLessonUnlocked(unit.id, item.id) && !isLessonCompleted(item.id)" 
              class="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-0.5 bg-white border-2 border-slate-300 rounded-full shadow-md text-slate-800 font-heading font-black text-[11px] flex items-center gap-1 whitespace-nowrap"
            >
              <span>Pel.</span>
              <span class="text-duo-green font-black">{{ itemIdx + 1 }}</span>
            </div>

            <!-- Checkpoint Finish Flag Banner Badge -->
            <div 
              v-else-if="item.type === 'checkpoint'"
              class="absolute -top-4.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 bg-amber-400 text-amber-950 border-2 border-amber-600 rounded-full shadow-lg font-heading font-black text-[11px] flex items-center gap-1 whitespace-nowrap uppercase animate-bounce"
            >
              <span>👑 FINISH UNIT {{ unit.order }}</span>
            </div>

            <!-- Main Bouncy 3D Button Node -->
            <button 
              @click="onNodeTap(unit.id, item.id, item.type)"
              class="flex items-center justify-center font-heading transition-all duration-200 select-none shadow-2xl relative cursor-pointer hover:scale-105 active:scale-95 border-b-8"
              :class="[
                item.type === 'checkpoint' ? 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-b-[10px]' : 'w-20 h-20 sm:w-24 sm:h-24 rounded-full',
                getNodeClass(unit.id, item.id, item.type, unit.color)
              ]"
            >
              <!-- Checkmark if completed -->
              <div v-if="isNodeCompleted(unit.id, item.id, item.type)" class="flex flex-col items-center">
                <Check class="w-10 h-10 sm:w-11 sm:h-11 text-white stroke-[4] drop-shadow-md" />
              </div>
              
              <!-- Crown if Checkpoint active -->
              <div v-else-if="item.type === 'checkpoint' && isCheckpointUnlocked(unit.id)" class="flex flex-col items-center">
                <Crown class="w-12 h-12 sm:w-14 sm:h-14 text-amber-900 fill-amber-300 animate-pulse drop-shadow-md" />
              </div>
              
              <!-- Star if Lesson unlocked -->
              <div v-else-if="isLessonUnlocked(unit.id, item.id)" class="flex flex-col items-center">
                <Star class="w-10 h-10 sm:w-11 sm:h-11 text-white fill-white drop-shadow-md" />
              </div>
              
              <!-- Lock icon if locked -->
              <div v-else class="flex flex-col items-center">
                <Lock class="w-8 h-8 sm:w-9 sm:h-9 text-slate-400" />
              </div>

              <!-- Outer Glowing Ripple Ring on Next Active Lesson -->
              <div 
                v-if="item.type === 'lesson' && isNextActiveLesson(unit.id, item.id)"
                class="absolute -inset-3 rounded-full border-4 border-emerald-400 animate-ping pointer-events-none opacity-75"
              ></div>
            </button>
          </div>

          <!-- Clean Centered Title Badge Below Node -->
          <div 
            @click="onNodeTap(unit.id, item.id, item.type)"
            class="mt-3 text-center bg-white/95 backdrop-blur-xs px-4 py-1.5 rounded-2xl border-2 border-slate-200/90 shadow-md max-w-[170px] cursor-pointer hover:border-duo-blue hover:scale-105 transition-all"
          >
            <span class="font-heading font-black text-xs text-slate-800 block truncate">
              {{ item.title }}
            </span>
          </div>

      </template>

      <!-- Duolingo-Style Unit Section Divider Line -->
      <div 
        v-if="unitIdx < courseStore.units.length - 1" 
        class="relative py-6 flex items-center justify-center my-4 select-none"
      >
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t-2 border-slate-300/80"></div>
        </div>
        <div class="relative bg-white px-5 py-1.5 rounded-full border border-slate-300 text-xs font-heading font-extrabold text-slate-600 shadow-2xs flex items-center gap-2">
          <span>{{ getUnitBiomeIcon(courseStore.units[unitIdx + 1].color) }}</span>
          <span>UNIT {{ courseStore.units[unitIdx + 1].order }} • {{ courseStore.units[unitIdx + 1].title }}</span>
        </div>
      </div>
    </div>

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
              Kamu bisa melihat alur pelajaran ini, namun untuk <span class="font-bold text-duo-blue">mulai mengerjakan soal kuis</span> dan mengumpulkan XP, kamu harus masuk ke akunmu terlebih dahulu.
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCourseStore } from '~/stores/course'
import { useUserStore } from '~/stores/user'
import { Check, Star, Lock, Trophy, Crown, ChevronDown, ChevronUp, FastForward } from 'lucide-vue-next'

const courseStore = useCourseStore()
const userStore = useUserStore()

const showAuthModal = ref(false)
const pendingTargetUrl = ref('')
const selectedNodeId = ref(null)
const pathViewMode = ref('classic')
const collapsedUnits = ref({})
const currentVisibleUnit = ref(null)
const showStickyHeader = ref(false)

const getClassicUnitNodeItems = (unit) => {
  const items = []
  const waveOffsets = ['translate-x-0', 'translate-x-6 sm:translate-x-12', '-translate-x-6 sm:-translate-x-12', 'translate-x-0']
  
  unit.lessons.forEach((lesson, index) => {
    if (index === 1) {
      items.push({
        id: `chest_${unit.id}`,
        title: 'Peti Hadiah XP Bonus 🎁',
        type: 'chest',
        classOffset: '-translate-x-8 sm:-translate-x-14'
      })
    }
    
    items.push({
      id: lesson.id,
      title: lesson.title,
      type: 'lesson',
      classOffset: waveOffsets[index % waveOffsets.length]
    })
  })

  // Add Checkpoint / Unit Jump at the end of path
  items.push({
    id: unit.checkpoint?.id || `checkpoint_${unit.id}`,
    title: unit.checkpoint?.title || `Checkpoint Unit ${unit.order}`,
    type: 'checkpoint',
    classOffset: 'translate-x-0'
  })

  return items
}

const toggleUnitCollapse = (unitId) => {
  collapsedUnits.value[unitId] = !collapsedUnits.value[unitId]
}

const isUnitCollapsed = (unitId) => {
  return !!collapsedUnits.value[unitId]
}

const updateActiveUnitOnScroll = () => {
  if (!courseStore.units || courseStore.units.length === 0) return
  let current = courseStore.units[0]
  for (const unit of courseStore.units) {
    const el = document.getElementById(`unit-container-${unit.id}`)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 350) {
        current = unit
      }
    }
  }
  currentVisibleUnit.value = current
}

const scrollToActiveNode = () => {
  if (typeof window === 'undefined') return
  const el = document.getElementById('active-lesson-node')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else if (courseStore.units && courseStore.units.length > 0) {
    const firstUnitEl = document.getElementById(`unit-container-${courseStore.units[0].id}`)
    if (firstUnitEl) firstUnitEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

onMounted(() => {
  updateActiveUnitOnScroll()
  window.addEventListener('scroll', updateActiveUnitOnScroll, { passive: true })
  
  // Default scroll to user's current active node on load
  nextTick(() => {
    scrollToActiveNode()
    setTimeout(scrollToActiveNode, 300)
    setTimeout(scrollToActiveNode, 800)
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

// Calculate list of items (lessons + checkpoint) with responsive 600px viewBox canvas
const getUnitNodeItems = (unit) => {
  const items = []
  const baseWidth = 600
  const startY = 85
  const ySpacing = 150
  // Responsive wave amplitude [-140px, +140px] centered at 300px
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
  const totalCount = unit.lessons.length + 1 // lessons + checkpoint
  return 85 + ((totalCount - 1) * 150) + 120 // exact height ending at Checkpoint center
}

// Generate smooth cubic bezier SVG path string passing through all node points
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

const getUnitMapBgClass = (color) => {
  switch (color) {
    case 'emerald': return 'bg-gradient-to-b from-emerald-200 via-green-300 to-emerald-400 border-emerald-500'
    case 'sky': return 'bg-gradient-to-b from-sky-200 via-blue-200 to-indigo-300 border-sky-400'
    case 'amber': return 'bg-gradient-to-b from-amber-100 via-orange-200 to-amber-300 border-amber-400'
    case 'rose': return 'bg-gradient-to-b from-rose-200 via-pink-200 to-rose-300 border-rose-400'
    default: return 'bg-gradient-to-b from-emerald-200 via-green-300 to-emerald-400 border-emerald-500'
  }
}

const getUnitRiverPath = (unit) => {
  const height = getUnitContainerHeight(unit)
  return `M -50 ${height * 0.35} C 120 ${height * 0.3}, 280 ${height * 0.45}, 450 ${height * 0.4}`
}

const getUnitContainerTheme = (color) => {
  switch (color) {
    case 'emerald': return 'bg-gradient-to-b from-emerald-50/90 via-teal-50/60 to-emerald-100/40 border-emerald-300/80'
    case 'sky': return 'bg-gradient-to-b from-sky-50/90 via-blue-50/60 to-indigo-100/40 border-sky-300/80'
    case 'amber': return 'bg-gradient-to-b from-amber-50/90 via-orange-50/60 to-yellow-100/40 border-amber-300/80'
    case 'rose': return 'bg-gradient-to-b from-rose-50/90 via-pink-50/60 to-purple-100/40 border-rose-300/80'
    default: return 'bg-gradient-to-b from-emerald-50/90 via-teal-50/60 to-emerald-100/40 border-emerald-300/80'
  }
}

const getUnitHeaderTheme = (color) => {
  switch (color) {
    case 'emerald': return 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-emerald-700'
    case 'sky': return 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 border-sky-600'
    case 'amber': return 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 border-amber-600'
    case 'rose': return 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 border-rose-600'
    default: return 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-emerald-700'
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
    case 'sky': return 'KERAJAN AWAN'
    case 'amber': return 'ISTANA MATAHARI'
    case 'rose': return 'NEGERI MANIS'
    default: return 'PETUALANGAN'
  }
}

const getUnitTrailColor = (color) => {
  switch (color) {
    case 'emerald': return '#10b981'
    case 'sky': return '#0284c7'
    case 'amber': return '#f59e0b'
    case 'rose': return '#e11d48'
    default: return '#10b981'
  }
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
    return 'bg-gradient-to-b from-amber-300 to-yellow-500 border-amber-600 text-slate-900 shadow-amber-400/40'
  }
  if (unlocked) {
    if (type === 'checkpoint') {
      return 'bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500 border-amber-700 text-amber-950 shadow-amber-500/50 animate-pulse-glow'
    }
    switch (color) {
      case 'emerald': return 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-emerald-700 text-white shadow-emerald-500/40'
      case 'sky': return 'bg-gradient-to-b from-sky-400 to-blue-600 border-blue-700 text-white shadow-blue-500/40'
      case 'amber': return 'bg-gradient-to-b from-amber-300 to-yellow-500 border-amber-600 text-slate-900 shadow-yellow-500/40'
      case 'rose': return 'bg-gradient-to-b from-rose-400 to-red-600 border-red-700 text-white shadow-rose-500/40'
      default: return 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-emerald-700 text-white shadow-emerald-500/40'
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
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3.5s ease-in-out infinite;
}
</style>
