import * as googleTTS from 'google-tts-api'

const text = 'Ada berapa apel di gambar?'
const url = googleTTS.getAudioUrl(text, {
  lang: 'id',
  slow: false,
  host: 'https://translate.google.com',
  timeout: 10000,
})

console.log('Generated Audio URL:', url)
