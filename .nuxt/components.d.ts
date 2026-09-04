
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AudioPlayerButton: typeof import("../components/AudioPlayerButton.vue")['default']
export const CertificateModal: typeof import("../components/CertificateModal.vue")['default']
export const DailyQuestsCard: typeof import("../components/DailyQuestsCard.vue")['default']
export const ExerciseCard: typeof import("../components/ExerciseCard.vue")['default']
export const ExerciseCategorySort: typeof import("../components/ExerciseCategorySort.vue")['default']
export const ExerciseComparison: typeof import("../components/ExerciseComparison.vue")['default']
export const ExerciseDragDrop: typeof import("../components/ExerciseDragDrop.vue")['default']
export const ExerciseFillBlank: typeof import("../components/ExerciseFillBlank.vue")['default']
export const ExerciseMatching: typeof import("../components/ExerciseMatching.vue")['default']
export const ExerciseMemoryFlip: typeof import("../components/ExerciseMemoryFlip.vue")['default']
export const ExerciseMultipleChoice: typeof import("../components/ExerciseMultipleChoice.vue")['default']
export const ExerciseOddOneOut: typeof import("../components/ExerciseOddOneOut.vue")['default']
export const ExercisePattern: typeof import("../components/ExercisePattern.vue")['default']
export const ExerciseSeekFind: typeof import("../components/ExerciseSeekFind.vue")['default']
export const ExerciseSequence: typeof import("../components/ExerciseSequence.vue")['default']
export const ExerciseShadowMatch: typeof import("../components/ExerciseShadowMatch.vue")['default']
export const ExerciseTrueFalse: typeof import("../components/ExerciseTrueFalse.vue")['default']
export const FeedbackDrawer: typeof import("../components/FeedbackDrawer.vue")['default']
export const HeaderNav: typeof import("../components/HeaderNav.vue")['default']
export const Hero3DCanvas: typeof import("../components/Hero3DCanvas.vue")['default']
export const KikoAvatar: typeof import("../components/KikoAvatar.vue")['default']
export const LandingQuizDemo: typeof import("../components/LandingQuizDemo.vue")['default']
export const LessonSummaryModal: typeof import("../components/LessonSummaryModal.vue")['default']
export const MascotCompanion: typeof import("../components/MascotCompanion.vue")['default']
export const MiniPathDrawer: typeof import("../components/MiniPathDrawer.vue")['default']
export const MobileBottomNav: typeof import("../components/MobileBottomNav.vue")['default']
export const NumberTracingCanvas: typeof import("../components/NumberTracingCanvas.vue")['default']
export const QuestionVisual: typeof import("../components/QuestionVisual.vue")['default']
export const SkillTree: typeof import("../components/SkillTree.vue")['default']
export const VoiceAnswerButton: typeof import("../components/VoiceAnswerButton.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyAudioPlayerButton: LazyComponent<typeof import("../components/AudioPlayerButton.vue")['default']>
export const LazyCertificateModal: LazyComponent<typeof import("../components/CertificateModal.vue")['default']>
export const LazyDailyQuestsCard: LazyComponent<typeof import("../components/DailyQuestsCard.vue")['default']>
export const LazyExerciseCard: LazyComponent<typeof import("../components/ExerciseCard.vue")['default']>
export const LazyExerciseCategorySort: LazyComponent<typeof import("../components/ExerciseCategorySort.vue")['default']>
export const LazyExerciseComparison: LazyComponent<typeof import("../components/ExerciseComparison.vue")['default']>
export const LazyExerciseDragDrop: LazyComponent<typeof import("../components/ExerciseDragDrop.vue")['default']>
export const LazyExerciseFillBlank: LazyComponent<typeof import("../components/ExerciseFillBlank.vue")['default']>
export const LazyExerciseMatching: LazyComponent<typeof import("../components/ExerciseMatching.vue")['default']>
export const LazyExerciseMemoryFlip: LazyComponent<typeof import("../components/ExerciseMemoryFlip.vue")['default']>
export const LazyExerciseMultipleChoice: LazyComponent<typeof import("../components/ExerciseMultipleChoice.vue")['default']>
export const LazyExerciseOddOneOut: LazyComponent<typeof import("../components/ExerciseOddOneOut.vue")['default']>
export const LazyExercisePattern: LazyComponent<typeof import("../components/ExercisePattern.vue")['default']>
export const LazyExerciseSeekFind: LazyComponent<typeof import("../components/ExerciseSeekFind.vue")['default']>
export const LazyExerciseSequence: LazyComponent<typeof import("../components/ExerciseSequence.vue")['default']>
export const LazyExerciseShadowMatch: LazyComponent<typeof import("../components/ExerciseShadowMatch.vue")['default']>
export const LazyExerciseTrueFalse: LazyComponent<typeof import("../components/ExerciseTrueFalse.vue")['default']>
export const LazyFeedbackDrawer: LazyComponent<typeof import("../components/FeedbackDrawer.vue")['default']>
export const LazyHeaderNav: LazyComponent<typeof import("../components/HeaderNav.vue")['default']>
export const LazyHero3DCanvas: LazyComponent<typeof import("../components/Hero3DCanvas.vue")['default']>
export const LazyKikoAvatar: LazyComponent<typeof import("../components/KikoAvatar.vue")['default']>
export const LazyLandingQuizDemo: LazyComponent<typeof import("../components/LandingQuizDemo.vue")['default']>
export const LazyLessonSummaryModal: LazyComponent<typeof import("../components/LessonSummaryModal.vue")['default']>
export const LazyMascotCompanion: LazyComponent<typeof import("../components/MascotCompanion.vue")['default']>
export const LazyMiniPathDrawer: LazyComponent<typeof import("../components/MiniPathDrawer.vue")['default']>
export const LazyMobileBottomNav: LazyComponent<typeof import("../components/MobileBottomNav.vue")['default']>
export const LazyNumberTracingCanvas: LazyComponent<typeof import("../components/NumberTracingCanvas.vue")['default']>
export const LazyQuestionVisual: LazyComponent<typeof import("../components/QuestionVisual.vue")['default']>
export const LazySkillTree: LazyComponent<typeof import("../components/SkillTree.vue")['default']>
export const LazyVoiceAnswerButton: LazyComponent<typeof import("../components/VoiceAnswerButton.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
