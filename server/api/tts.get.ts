import { defineEventHandler, getQuery, sendRedirect } from 'h3'
import * as googleTTS from 'google-tts-api'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const text = (query.text as string) || 'Ada berapa apel di gambar?'
  const lang = (query.lang as string) || 'id'

  try {
    const audioUrl = googleTTS.getAudioUrl(text, {
      lang: lang,
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000
    })

    // Redirect to the audio URL for immediate browser playback
    return sendRedirect(event, audioUrl, 302)
  } catch (err) {
    console.error('TTS Generation Error:', err)
    return { error: 'Failed to generate audio' }
  }
})
