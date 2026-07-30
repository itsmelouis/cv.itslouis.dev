<script setup lang="ts">
import {
  ArrowUp,
  Moon,
  Printer,
  Sun,
} from '@lucide/vue'
import BrandIcon from './BrandIcon.vue'

defineProps<{
  isDark: boolean
  showToTop: boolean
}>()

const emit = defineEmits<{
  print: []
  toTop: []
  toggleTheme: [event: MouseEvent]
}>()
</script>

<template>
  <header class="app-header">
    <div class="header-identity">
      <a class="logo-link" href="#top" aria-label="Retour en haut du CV">
        <img src="/logo.svg" width="48" height="48" alt="Logo Louis" />
      </a>
      <span class="breadcrumb" aria-label="Page actuelle">~/cv</span>
    </div>

    <nav class="header-actions" aria-label="Navigation utilitaire">
      <a class="header-text-link" href="https://itslouis.dev" target="_blank" rel="noopener noreferrer">
        itslouis.dev
      </a>
      <a class="icon-button social-button" href="https://github.com/itsmelouis" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Louis Floquet">
        <BrandIcon brand="github" :size="17" />
      </a>
      <a class="icon-button social-button" href="https://linkedin.com/in/louis-floquet" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Louis Floquet">
        <BrandIcon brand="linkedin" :size="17" />
      </a>
      <button class="print-button" type="button" aria-label="Imprimer ou enregistrer le CV en PDF" @click="emit('print')">
        <Printer :size="17" :stroke-width="1.8" aria-hidden="true" />
        <span>PDF</span>
      </button>
      <button class="icon-button" type="button" :aria-label="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'" @click="emit('toggleTheme', $event)">
        <Sun v-if="isDark" :size="18" :stroke-width="1.8" aria-hidden="true" />
        <Moon v-else :size="18" :stroke-width="1.8" aria-hidden="true" />
      </button>
    </nav>
  </header>

  <button
    class="to-top-button"
    :class="{ visible: showToTop }"
    type="button"
    aria-label="Revenir en haut"
    :tabindex="showToTop ? 0 : -1"
    @click="emit('toTop')"
  >
    <ArrowUp :size="18" :stroke-width="1.8" aria-hidden="true" />
  </button>
</template>
