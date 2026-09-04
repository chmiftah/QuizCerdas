import { ref, onUnmounted } from 'vue'

export function useVoiceRecognition() {
  const isListening = ref(false)
  const spokenTranscript = ref('')
  const isSupported = ref(false)
  let recognition: any = null

  if (typeof window !== 'undefined') {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognitionClass) {
      isSupported.value = true
      recognition = new SpeechRecognitionClass()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'id-ID'
    }
  }

  const numberMap: Record<string, string> = {
    'nol': '0', 'kosong': '0',
    'satu': '1', 'se': '1',
    'dua': '2',
    'tiga': '3',
    'empat': '4',
    'lima': '5',
    'enam': '6',
    'tujuh': '7',
    'delapan': '8',
    'sembilan': '9',
    'sepuluh': '10',
    'sebelas': '11',
    'dua belas': '12',
    'tiga belas': '13',
    'empat belas': '14',
    'lima belas': '15',
    'enam belas': '16',
    'tujuh belas': '17',
    'delapan belas': '18',
    'sembilan belas': '19',
    'dua puluh': '20',
    'benar': 'Benar', 'betul': 'Benar', 'ya': 'Benar',
    'salah': 'Salah', 'tidak': 'Salah', 'bukan': 'Salah'
  }

  const emojiWordMap: Record<string, string[]> = {
    '🐱': ['kucing', 'meong', 'cat'],
    '🐶': ['anjing', 'guk', 'guk guk', 'dog'],
    '🐰': ['kelinci', 'bunny', 'rabbit'],
    '🐟': ['ikan', 'fish'],
    '🐄': ['sapi', 'susu', 'cow'],
    '🐔': ['ayam', 'chicken'],
    '🦆': ['bebek', 'kwek', 'duck'],
    '🐎': ['kuda', 'horse'],
    '🥚': ['telur', 'egg'],
    '🐘': ['gajah', 'elephant'],
    '🐒': ['monyet', 'kera', 'monkey'],
    '🦁': ['singa', 'lion'],
    '🦒': ['jerapah', 'giraffe'],
    '🦀': ['kepiting', 'crab'],
    '🐢': ['penyu', 'kura', 'turtle'],
    '🐳': ['paus', 'whale'],
    '🐠': ['ikan badut', 'nemo'],
    '🦋': ['kupu', 'kupu-kupu', 'butterfly'],
    '🐝': ['lebah', 'madu', 'bee'],
    '🐜': ['semut', 'ant'],
    '🐞': ['kepik', 'ladybug']
  }

  const parseIndonesianSpeech = (text: string): string => {
    const raw = text.toLowerCase().trim()

    // 1. Direct number match in string
    const digitMatch = raw.match(/\d+/)
    if (digitMatch) return digitMatch[0]

    // 2. Word map lookup
    for (const key of Object.keys(numberMap)) {
      if (raw.includes(key)) {
        return numberMap[key]
      }
    }

    return raw
  }

  const matchSpeechToOption = (text: string, options: string[] = []): string => {
    const raw = text.toLowerCase().trim()
    const parsedNumber = parseIndonesianSpeech(raw)

    if (!options || options.length === 0) {
      return parsedNumber || raw
    }

    // A. Check exact or partial match with options
    for (const opt of options) {
      const optClean = opt.trim()
      const optLower = optClean.toLowerCase()

      // Exact or partial text match
      if (raw.includes(optLower) || optLower.includes(raw)) {
        return optClean
      }

      // Number match
      if (parsedNumber && optClean === parsedNumber) {
        return optClean
      }

      // Emoji match
      if (emojiWordMap[optClean]) {
        for (const word of emojiWordMap[optClean]) {
          if (raw.includes(word)) {
            return optClean
          }
        }
      }
    }

    return parsedNumber || raw
  }

  const startListening = (
    onMatch?: (recognizedVal: string, rawText: string) => void,
    options: string[] = []
  ) => {
    if (!recognition) return

    spokenTranscript.value = ''
    isListening.value = true

    try {
      recognition.start()
    } catch (e) {
      // SpeechRecognition already running
    }

    recognition.onresult = (event: any) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        interim += event.results[i][0].transcript
      }

      spokenTranscript.value = interim
      const matchedVal = matchSpeechToOption(interim, options)

      if (event.results[0].isFinal) {
        isListening.value = false
        if (onMatch) {
          onMatch(matchedVal, interim)
        }
      }
    }

    recognition.onerror = () => {
      isListening.value = false
    }

    recognition.onend = () => {
      isListening.value = false
    }
  }

  const stopListening = () => {
    if (recognition && isListening.value) {
      recognition.stop()
      isListening.value = false
    }
  }

  onUnmounted(() => {
    stopListening()
  })

  return {
    isSupported,
    isListening,
    spokenTranscript,
    startListening,
    stopListening,
    parseIndonesianSpeech,
    matchSpeechToOption
  }
}
