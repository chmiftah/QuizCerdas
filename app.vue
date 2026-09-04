<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body antialiased">
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.loadFromStorage()
})
</script>
