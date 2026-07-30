<script setup lang="ts">
defineProps<{
  id: string
  title: string
  index: string
}>()
</script>

<template>
  <div
    class="section-heading relative isolate mb-[27px] flex min-h-[58px] items-end gap-3 min-[721px]:min-h-18"
  >
    <span
      class="section-index relative z-2 mb-2 font-mono text-[10px] text-text-faint"
      aria-hidden="true"
      >{{ index }}</span
    >
    <h2
      :id="id"
      class="relative z-2 mb-[5px] text-[25px] leading-[1.1] font-[620] tracking-[-0.035em] text-text"
    >
      {{ title }}
    </h2>
    <span
      class="section-outline pointer-events-none absolute bottom-0 left-0 z-1 max-w-full overflow-hidden text-[clamp(2.25rem,12vw,3.2rem)] leading-[0.95] font-[750] tracking-[-0.065em] whitespace-nowrap text-transparent opacity-23 select-none [-webkit-text-stroke:1.35px_var(--text-muted)] min-[721px]:text-[clamp(2.8rem,9vw,4.1rem)]"
      aria-hidden="true"
      >{{ title }}</span
    >
  </div>
</template>
