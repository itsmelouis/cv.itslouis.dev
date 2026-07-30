<script setup lang="ts">
import { ArrowUp, Moon, Printer, Sun } from '@lucide/vue'
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
  <header
    class="app-header absolute top-0 left-0 z-40 flex w-full items-center justify-between gap-6 bg-transparent px-4 py-3.5 min-[721px]:fixed min-[721px]:bg-[linear-gradient(to_bottom,var(--header-bg)_62%,transparent)] min-[721px]:px-5 min-[721px]:py-4 min-[721px]:backdrop-blur-[8px]"
  >
    <div class="header-identity flex min-w-0 items-center gap-3">
      <a
        class="logo-link block size-12 shrink-0 rounded-[9px] outline-offset-4 transition-transform duration-250 hover:-rotate-12"
        href="#top"
        aria-label="Retour en haut du CV"
      >
        <img
          class="block size-full rounded-[inherit] border border-border-strong object-contain"
          src="/logo.svg"
          width="48"
          height="48"
          alt="Logo Louis"
        />
      </a>
      <span
        class="breadcrumb hidden overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[13px] text-text-faint select-none min-[441px]:inline"
        aria-label="Page actuelle"
        >~/cv</span
      >
    </div>

    <nav
      class="header-actions flex items-center gap-[3px] min-[721px]:gap-2.5"
      aria-label="Navigation utilitaire"
    >
      <a
        class="header-text-link hidden px-1 py-1.5 text-sm text-text-soft no-underline transition-colors duration-200 hover:text-text min-[721px]:block"
        href="https://itslouis.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        itslouis.dev
      </a>
      <a
        class="icon-button social-button hidden size-[38px] cursor-pointer items-center justify-center rounded-[7px] border-0 bg-transparent text-text opacity-62 transition-[opacity,background-color,transform] duration-200 hover:bg-surface-raised hover:opacity-100 min-[721px]:inline-flex"
        href="https://github.com/itsmelouis"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub de Louis Floquet"
      >
        <BrandIcon brand="github" :size="17" />
      </a>
      <a
        class="icon-button social-button hidden size-[38px] cursor-pointer items-center justify-center rounded-[7px] border-0 bg-transparent text-text opacity-62 transition-[opacity,background-color,transform] duration-200 hover:bg-surface-raised hover:opacity-100 min-[721px]:inline-flex"
        href="https://linkedin.com/in/louis-floquet"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn de Louis Floquet"
      >
        <BrandIcon brand="linkedin" :size="17" />
      </a>
      <button
        class="print-button inline-flex size-[38px] cursor-pointer items-center justify-center gap-[7px] rounded-[7px] border-0 bg-transparent p-0 font-mono text-xs text-text opacity-62 transition-[opacity,background-color,transform] duration-200 hover:bg-surface-raised hover:opacity-100 min-[721px]:h-[38px] min-[721px]:w-auto min-[721px]:px-[11px]"
        type="button"
        aria-label="Imprimer ou enregistrer le CV en PDF"
        @click="emit('print')"
      >
        <Printer :size="17" :stroke-width="1.8" aria-hidden="true" />
        <span class="hidden min-[721px]:inline">PDF</span>
      </button>
      <button
        class="icon-button inline-flex size-[38px] cursor-pointer items-center justify-center rounded-[7px] border-0 bg-transparent text-text opacity-62 transition-[opacity,background-color,transform] duration-200 hover:bg-surface-raised hover:opacity-100"
        type="button"
        :aria-label="isDark ? 'Activer le thème clair' : 'Activer le thème sombre'"
        @click="emit('toggleTheme', $event)"
      >
        <Sun v-if="isDark" :size="18" :stroke-width="1.8" aria-hidden="true" />
        <Moon v-else :size="18" :stroke-width="1.8" aria-hidden="true" />
      </button>
    </nav>
  </header>

  <button
    class="to-top-button fixed right-3.5 bottom-3.5 z-50 inline-flex size-10 cursor-pointer items-center justify-center rounded-[7px] border border-border bg-[var(--header-bg)] text-text backdrop-blur-[10px] transition-[opacity,background-color,transform] duration-200 hover:bg-surface-raised hover:opacity-100"
    :class="
      showToTop
        ? 'pointer-events-auto translate-y-0 opacity-65'
        : 'pointer-events-none translate-y-2 opacity-0'
    "
    type="button"
    aria-label="Revenir en haut"
    :tabindex="showToTop ? 0 : -1"
    @click="emit('toTop')"
  >
    <ArrowUp :size="18" :stroke-width="1.8" aria-hidden="true" />
  </button>
</template>
