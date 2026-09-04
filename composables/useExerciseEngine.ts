import { ref, computed, reactive } from 'vue'
import { useUserStore } from '~/stores/user'
import type { Exercise } from '~/stores/course'
import confetti from 'canvas-confetti'

export function useExerciseEngine(exercises: Exercise[], onLessonComplete?: (xp: number) => void) {
  const userStore = useUserStore()

  const currentIndex = ref(0)
  const selectedOption = ref<string>('')
  const fillBlankInput = ref<string>('')
  const dragDropCount = ref<number>(0)
  const categoryMap = ref<string>('')
  const memoryMatchCount = ref<number>(0)
  const matchingSelections = ref<Record<string, string>>({}) // leftItem -> rightItem
  const activeMatchingLeft = ref<string | null>(null)

  const isChecked = ref(false)
  const isCorrect = ref(false)
  const feedbackExplanation = ref('')
  const isLessonFinished = ref(false)
  const showHint = ref(false)
  
  const correctCount = ref(0)
  const comboCount = ref(0)
  const maxCombo = ref(0)
  const totalExercises = computed(() => exercises?.length || 0)
  const currentExercise = computed(() => exercises?.[currentIndex.value] || null)

  const earnedStars = computed(() => {
    if (totalExercises.value === 0) return 0
    const ratio = correctCount.value / totalExercises.value
    if (ratio >= 0.9) return 3
    if (ratio >= 0.6) return 2
    return 1
  })

  const progressPercentage = computed(() => {
    if (totalExercises.value === 0) return 0
    return Math.round(((currentIndex.value) / totalExercises.value) * 100)
  })

  // Play audio effects using Web Audio API for zero-dependency sound!
  const playSound = (type: 'correct' | 'incorrect' | 'complete') => {
    if (!import.meta.client) return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      if (type === 'correct') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15) // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3) // G5
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.4)
      } else if (type === 'incorrect') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(220, ctx.currentTime) // A3
        osc.frequency.setValueAtTime(174.61, ctx.currentTime + 0.15) // F3
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.4)
      } else if (type === 'complete') {
        // Fanfare chord
        const freqs = [523.25, 659.25, 783.99, 1046.50]
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.value = f
          gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(ctx.currentTime + i * 0.08)
          osc.stop(ctx.currentTime + i * 0.08 + 0.6)
        })
      }
    } catch (e) {
      console.warn('AudioContext playback error:', e)
    }
  }

  const selectOption = (opt: string) => {
    if (isChecked.value) return
    selectedOption.value = opt
  }

  const handleMatchingClick = (left: string, right: string) => {
    if (isChecked.value) return
    matchingSelections.value[left] = right
  }

  const resetMatching = () => {
    if (isChecked.value) return
    matchingSelections.value = {}
    activeMatchingLeft.value = null
  }

  const unpairMatching = (left: string) => {
    if (isChecked.value) return
    delete matchingSelections.value[left]
  }

  const checkAnswer = () => {
    if (!currentExercise.value || isChecked.value) return
    const ex = currentExercise.value
    let correct = false

    if (ex.type === 'multiple_choice' || ex.type === 'true_false' || ex.type === 'sequence_ordering' || ex.type === 'comparison' || ex.type === 'pattern_matching' || ex.type === 'odd_one_out' || ex.type === 'shadow_matching') {
      correct = selectedOption.value.trim().toLowerCase() === ex.correct_answer.trim().toLowerCase()
    } else if (ex.type === 'fill_in_blank') {
      correct = fillBlankInput.value.trim().toLowerCase() === ex.correct_answer.trim().toLowerCase()
    } else if (ex.type === 'drag_and_drop' || ex.type === 'seek_find') {
      correct = String(dragDropCount.value).trim() === ex.correct_answer.trim()
    } else if (ex.type === 'memory_flip') {
      const expectedPairCount = ex.pairs?.length || 2
      correct = memoryMatchCount.value >= expectedPairCount
    } else if (ex.type === 'category_sorting') {
      const expectedMap = ex.correct_answer.split('|').reduce((acc, str) => {
        const [item, cat] = str.split('::')
        if (item && cat) acc[item.trim()] = cat.trim()
        return acc
      }, {} as Record<string, string>)

      const userMap = categoryMap.value.split('|').reduce((acc, str) => {
        const [item, cat] = str.split('::')
        if (item && cat) acc[item.trim()] = cat.trim()
        return acc
      }, {} as Record<string, string>)

      correct = Object.keys(expectedMap).length > 0 && Object.keys(expectedMap).every(k => userMap[k] === expectedMap[k])
    } else if (ex.type === 'matching') {
      // Format ex.correct_answer is "Left1::Right1|Left2::Right2"
      const expectedPairs = ex.correct_answer.split('|').reduce((acc, pairStr) => {
        const [l, r] = pairStr.split('::')
        if (l && r) acc[l.trim()] = r.trim()
        return acc
      }, {} as Record<string, string>)

      correct = Object.keys(expectedPairs).every(leftKey => {
        return matchingSelections.value[leftKey] === expectedPairs[leftKey]
      })
    }

    isCorrect.value = correct
    isChecked.value = true
    feedbackExplanation.value = ex.explanation

    if (correct) {
      correctCount.value++
      comboCount.value++
      if (comboCount.value > maxCombo.value) {
        maxCombo.value = comboCount.value
      }
      playSound('correct')
    } else {
      comboCount.value = 0
      userStore.loseHeart()
      playSound('incorrect')
      if (ex.spaced_repetition) {
        userStore.addToSpacedRepetition(ex.id)
      }
    }
  }

  const isNavigatingNext = ref(false)

  const nextExercise = () => {
    if (isLessonFinished.value || isNavigatingNext.value) return
    isNavigatingNext.value = true

    isChecked.value = false
    showHint.value = false
    selectedOption.value = ''
    fillBlankInput.value = ''
    categoryMap.value = ''
    memoryMatchCount.value = 0
    matchingSelections.value = {}
    activeMatchingLeft.value = null
    feedbackExplanation.value = ''

    if (currentIndex.value < totalExercises.value - 1) {
      currentIndex.value++
      setTimeout(() => {
        isNavigatingNext.value = false
      }, 250)
    } else {
      isLessonFinished.value = true
      playSound('complete')
      triggerConfetti()
      const comboBonus = maxCombo.value * 5
      const totalXP = correctCount.value * 10 + 10 + comboBonus
      if (onLessonComplete) {
        onLessonComplete(totalXP)
      }
    }
  }

  const triggerConfetti = () => {
    if (import.meta.client && typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  return reactive({
    currentIndex,
    totalExercises,
    currentExercise,
    progressPercentage,
    selectedOption,
    fillBlankInput,
    dragDropCount,
    categoryMap,
    memoryMatchCount,
    matchingSelections,
    activeMatchingLeft,
    isChecked,
    isCorrect,
    showHint,
    comboCount,
    maxCombo,
    earnedStars,
    feedbackExplanation,
    isLessonFinished,
    correctCount,
    selectOption,
    handleMatchingClick,
    resetMatching,
    unpairMatching,
    checkAnswer,
    nextExercise,
    playSound
  })
}

