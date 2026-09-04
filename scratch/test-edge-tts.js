import WebSocket from 'ws'
import crypto from 'crypto'

// Edge TTS WebSocket Endpoint implementation in pure Node.js
export async function generateEdgeTTS(text, voice = 'id-ID-GadisNeural') {
  return new Promise((resolve, reject) => {
    const requestId = crypto.randomBytes(16).toString('hex')
    const wsUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EA5E4081832223F107D71A79&ConnectionId=${requestId}`

    const ws = new WebSocket(wsUrl, {
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        'Origin': 'chrome-extension://jdiccldimpdaibocbdbgnbgflbdicajj'
      }
    })

    const audioChunks = []

    ws.on('open', () => {
      // 1. Send speech.config
      const configHeader = `Path: speech.config\r\nX-RequestId: ${requestId}\r\nX-Timestamp: ${new Date().toISOString()}\r\nContent-Type: application/json; charset=utf-8\r\n\r\n`
      const configContent = JSON.stringify({
        context: {
          synthesis: {
            audio: {
              metadataversion: '2.0',
              format: 'audio-24khz-48kbitrate-mono-mp3'
            }
          }
        }
      })
      ws.send(configHeader + configContent)

      // 2. Send SSML request
      const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='id-ID'><voice name='${voice}'><pitch adjustment='+0%'><rate speed='+0%'>${text}</rate></pitch></voice></speak>`
      const ssmlHeader = `Path: ssml\r\nX-RequestId: ${requestId}\r\nX-Timestamp: ${new Date().toISOString()}\r\nContent-Type: application/ssml+xml\r\n\r\n`
      ws.send(ssmlHeader + ssml)
    })

    ws.on('message', (data, isBinary) => {
      if (isBinary) {
        // Binary audio chunk (starts with 2 bytes header length)
        const headerLength = data.readUInt16BE(0)
        const audioData = data.subarray(2 + headerLength)
        audioChunks.push(audioData)
      } else {
        const textMessage = data.toString()
        if (textMessage.includes('Path: turn.end')) {
          ws.close()
          const finalBuffer = Buffer.concat(audioChunks)
          resolve(finalBuffer)
        }
      }
    })

    ws.on('error', (err) => {
      reject(err)
    })
  })
}

// Test running
generateEdgeTTS('Ada berapa apel di gambar?')
  .then(buffer => console.log('Successfully generated Edge TTS audio buffer length:', buffer.length))
  .catch(err => console.error('Edge TTS Error:', err))
