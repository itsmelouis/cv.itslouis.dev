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
  <article
    class="timeline-item grid grid-cols-1 gap-3 border-b border-border pt-[27px] pb-[31px] min-[721px]:grid-cols-[132px_minmax(0,1fr)] min-[721px]:gap-7 min-[721px]:pt-[34px] min-[721px]:pb-[38px]"
  >
    <div
      class="timeline-date p-0 font-mono text-[11px] leading-[1.5] text-text-muted min-[721px]:pt-[3px]"
    >
      {{ date }}
    </div>
    <div class="timeline-content">
      <div
        class="timeline-title-row flex flex-col-reverse items-start justify-between gap-2 min-[441px]:flex-row min-[441px]:gap-3 min-[721px]:gap-[18px]"
      >
        <div>
          <h3 class="m-0 text-[17px] leading-[1.4] font-[620] tracking-[-0.02em] text-text">
            {{ title }}
          </h3>
          <a
            v-if="url"
            class="organization-link mt-0.5 inline-flex items-center gap-1 font-mono text-xs text-text-muted no-underline hover:text-text hover:underline hover:underline-offset-4"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ organization }}
            <ArrowUpRight :size="13" aria-hidden="true" />
          </a>
          <p
            v-else
            class="organization mt-0.5 mb-0 inline-flex items-center gap-1 font-mono text-xs text-text-muted"
          >
            {{ organization }}
          </p>
        </div>
        <span
          v-if="badge"
          class="timeline-badge shrink-0 self-start whitespace-nowrap rounded-[5px] border border-border px-[7px] py-[3px] font-mono text-[10px] text-text-muted"
          >{{ badge }}</span
        >
      </div>

      <p
        v-if="summary"
        class="timeline-summary mt-[19px] mb-0 text-sm leading-[1.72] text-text-soft"
      >
        {{ summary }}
      </p>
      <ul
        v-if="details.length"
        class="detail-list mt-[18px] mb-0 grid list-none gap-2 p-0 text-[13px] leading-[1.62] text-text-soft"
      >
        <li
          v-for="detail in details"
          :key="detail"
          class="relative pl-4 before:absolute before:top-0 before:left-px before:text-text-faint before:content-['-']"
        >
          {{ detail }}
        </li>
      </ul>
    </div>
  </article>
</template>
