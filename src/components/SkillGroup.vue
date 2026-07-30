<script setup lang="ts">
import type { Skill } from '../types/resume'

defineProps<{
  skill: Skill
}>()
</script>

<template>
  <article class="skill-group min-w-0 rounded-[9px] border border-border bg-page p-[17px] transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface">
    <div class="skill-heading mb-3.5 flex items-start justify-between gap-3">
      <h3 class="m-0 text-sm leading-[1.4] font-[620] tracking-[-0.02em] text-text">{{ skill.name }}</h3>
      <span class="pt-0.5 font-mono text-[9px] whitespace-nowrap text-text-faint uppercase">{{ skill.level }}</span>
    </div>
    <ul class="tag-list m-0 flex list-none flex-wrap gap-1.5 p-0" :aria-label="`Technologies : ${skill.name}`">
      <li v-for="keyword in skill.keywords" :key="keyword" class="rounded-sm bg-surface-raised px-1.5 py-[3px] font-mono text-[10px] leading-[1.45] text-text-soft">{{ keyword }}</li>
    </ul>
  </article>
</template>
