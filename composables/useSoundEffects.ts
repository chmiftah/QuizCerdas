// Zero-latency Web Audio API Sound Effects Synthesizer

export function useSoundEffects() {
  let audioCtx: AudioContext | null = null

  const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass()
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    return audioCtx
  }

  // 1. Pop Sound (for object tapping)
  const playPop = () => {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    const now = ctx.currentTime

    // Frequency pop drop: 600Hz -> 150Hz in 0.08s
    osc.frequency.setValueAtTime(600, now)
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.08)

    gain.gain.setValueAtTime(0.4, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  }

  // 2. Correct Answer Chime (Happy Duo-Tone Fanfare)
  const playCorrect = () => {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now + idx * 0.08)

      gain.gain.setValueAtTime(0, now + idx * 0.08)
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + idx * 0.08)
      osc.stop(now + idx * 0.08 + 0.3)
    })
  }

  // 3. Wrong Answer Wobble
  const playWrong = () => {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [220.00, 196.00] // A3, G3

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, now + idx * 0.12)

      gain.gain.setValueAtTime(0.2, now + idx * 0.12)
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + idx * 0.12)
      osc.stop(now + idx * 0.12 + 0.25)
    })
  }

  // 4. Celebration Fanfare (Lesson Finished)
  const playCheer = () => {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.1)

      gain.gain.setValueAtTime(0.35, now + idx * 0.1)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + idx * 0.1)
      osc.stop(now + idx * 0.1 + 0.5)
    })
  }

  // 5. Heart Lost Sound
  const playHeartLost = () => {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(300, now)
    osc.frequency.linearRampToValueAtTime(150, now + 0.3)

    gain.gain.setValueAtTime(0.3, now)
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.3)
  }

  return {
    playPop,
    playCorrect,
    playWrong,
    playCheer,
    playHeartLost
  }
}
