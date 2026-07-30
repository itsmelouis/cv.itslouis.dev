<script setup lang="ts">
import { ArrowUpRight, Box } from '@lucide/vue'
import type { Project } from '../types/resume'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article
    class="project-item group flex items-start gap-3.5 border-b border-border px-[3px] pt-[29px] pb-[31px] transition-[padding-left] duration-200 hover:pl-[7px]"
  >
    <Box
      class="project-icon mt-[3px] shrink-0 text-text-faint transition-colors duration-200 group-hover:text-text"
      :size="17"
      :stroke-width="1.7"
      aria-hidden="true"
    />
    <div class="project-content min-w-0">
      <div class="project-title-row">
        <h3 class="m-0 font-mono text-sm leading-[1.4] font-[620] tracking-[-0.02em] text-text">
          <a
            v-if="project.url"
            class="inline-flex items-center gap-[5px] no-underline hover:underline hover:underline-offset-4"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ project.name }}
            <ArrowUpRight :size="14" aria-hidden="true" />
          </a>
          <span v-else>{{ project.name }}</span>
        </h3>
      </div>
      <p class="mt-2 mb-0 text-sm leading-[1.68] text-text-soft">{{ project.description }}</p>
      <ul
        class="project-highlights mt-[11px] mb-0 grid list-none gap-1 p-0 text-xs leading-[1.62] text-text-soft"
      >
        <li
          v-for="highlight in project.highlights"
          :key="highlight"
          class="relative pl-4 before:absolute before:top-0 before:left-px before:text-text-faint before:content-['-']"
        >
          {{ highlight }}
        </li>
      </ul>
      <ul
        class="tag-list compact mt-[15px] mb-0 flex list-none flex-wrap gap-1.5 p-0"
        :aria-label="`Technologies : ${project.name}`"
      >
        <li
          v-for="keyword in project.keywords"
          :key="keyword"
          class="rounded-sm bg-surface-raised px-1.5 py-[3px] font-mono text-[10px] leading-[1.45] text-text-soft"
        >
          {{ keyword }}
        </li>
      </ul>
    </div>
  </article>
</template>
