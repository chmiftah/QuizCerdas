import { ref } from 'vue'

export type PaywallReason = 
  | 'out_of_hearts' 
  | 'unit_locked' 
  | 'creative_locked' 
  | 'parent_analytics' 
  | 'whatsapp_report' 
  | 'general'

export interface PaywallOptions {
  reason?: PaywallReason
  title?: string
  description?: string
  featureHighlight?: string
}

const isOpen = ref(false)
const activeReason = ref<PaywallReason>('general')
const customTitle = ref('')
const customDescription = ref('')
const customFeature = ref('')

export function usePaywall() {
  const openPaywall = (options: PaywallOptions = {}) => {
    activeReason.value = options.reason || 'general'
    customTitle.value = options.title || ''
    customDescription.value = options.description || ''
    customFeature.value = options.featureHighlight || ''
    isOpen.value = true
  }

  const closePaywall = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    activeReason,
    customTitle,
    customDescription,
    customFeature,
    openPaywall,
    closePaywall
  }
}
