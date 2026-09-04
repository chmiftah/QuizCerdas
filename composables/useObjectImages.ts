export const EMOJI_TO_IMAGE_MAP: Record<string, string> = {
  // Animals
  '🐘': '/images/pexels/gajah.jpg',
  'gajah': '/images/pexels/gajah.jpg',
  '🦁': '/images/pexels/singa.jpg',
  'singa': '/images/pexels/singa.jpg',
  '🐜': '/images/pexels/semut.jpg',
  'semut': '/images/pexels/semut.jpg',
  '🐞': '/images/pexels/kepik.jpg',
  'kepik': '/images/pexels/kepik.jpg',
  '🦆': '/images/pexels/bebek.jpg',
  'bebek': '/images/pexels/bebek.jpg',
  '🐔': '/images/pexels/ayam.jpg',
  'ayam': '/images/pexels/ayam.jpg',
  '🐱': '/images/pexels/kucing.jpg',
  'kucing': '/images/pexels/kucing.jpg',
  '🐰': '/images/pexels/kelinci.jpg',
  'kelinci': '/images/pexels/kelinci.jpg',
  '🦋': '/images/pexels/kupu_kupu.jpg',
  'kupu-kupu': '/images/pexels/kupu_kupu.jpg',
  'kupu_kupu': '/images/pexels/kupu_kupu.jpg',
  '🐝': '/images/pexels/lebah.jpg',
  'lebah': '/images/pexels/lebah.jpg',
  '🐄': '/images/pexels/sapi.jpg',
  'sapi': '/images/pexels/sapi.jpg',
  '标志': '/images/pexels/zebra.jpg',
  'zebra': '/images/pexels/zebra.jpg',
  '🦒': '/images/pexels/jerapah.jpg',
  'jerapah': '/images/pexels/jerapah.jpg',

  // Fruits & Objects
  '🍎': '/images/pexels/apel.jpg',
  'apel': '/images/pexels/apel.jpg',
  '🍌': '/images/pexels/pisang.jpg',
  'pisang': '/images/pexels/pisang.jpg',
  '🍊': '/images/pexels/jeruk.jpg',
  'jeruk': '/images/pexels/jeruk.jpg',
  '🍉': '/images/pexels/semangka.jpg',
  'semangka': '/images/pexels/semangka.jpg',
  '🍓': '/images/pexels/stroberi.jpg',
  'stroberi': '/images/pexels/stroberi.jpg'
}

export function getObjectImageUrl(item: any): string | null {
  if (!item || typeof item !== 'string') return null
  const clean = item.trim().toLowerCase()
  if (EMOJI_TO_IMAGE_MAP[clean]) return EMOJI_TO_IMAGE_MAP[clean]
  if (EMOJI_TO_IMAGE_MAP[item]) return EMOJI_TO_IMAGE_MAP[item]
  return null
}
