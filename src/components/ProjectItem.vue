<script setup lang="ts">
import { ArrowUpRight, Box } from '@lucide/vue'
import type { Project } from '../types/resume'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="project-item">
    <Box class="project-icon" :size="17" :stroke-width="1.7" aria-hidden="true" />
    <div class="project-content">
      <div class="project-title-row">
        <h3>
          <a v-if="project.url" :href="project.url" target="_blank" rel="noreferrer">
            {{ project.name }}
            <ArrowUpRight :size="14" aria-hidden="true" />
          </a>
          <span v-else>{{ project.name }}</span>
        </h3>
      </div>
      <p>{{ project.description }}</p>
      <ul class="project-highlights">
        <li v-for="highlight in project.highlights" :key="highlight">{{ highlight }}</li>
      </ul>
      <ul class="tag-list compact" :aria-label="`Technologies : ${project.name}`">
        <li v-for="keyword in project.keywords" :key="keyword">{{ keyword }}</li>
      </ul>
    </div>
  </article>
</template>
