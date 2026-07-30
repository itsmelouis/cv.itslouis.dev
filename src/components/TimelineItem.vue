<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

const { details = [], badge } = defineProps<{
  date: string
  title: string
  organization: string
  summary?: string
  details?: string[]
  url?: string
  badge?: string
}>()
</script>

<template>
  <article class="timeline-item">
    <div class="timeline-date">{{ date }}</div>
    <div class="timeline-content">
      <div class="timeline-title-row">
        <div>
          <h3>{{ title }}</h3>
          <a v-if="url" class="organization-link" :href="url" target="_blank" rel="noreferrer">
            {{ organization }}
            <ArrowUpRight :size="13" aria-hidden="true" />
          </a>
          <p v-else class="organization">{{ organization }}</p>
        </div>
        <span v-if="badge" class="timeline-badge">{{ badge }}</span>
      </div>

      <p v-if="summary" class="timeline-summary">{{ summary }}</p>
      <ul v-if="details.length" class="detail-list">
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
      </ul>
    </div>
  </article>
</template>
