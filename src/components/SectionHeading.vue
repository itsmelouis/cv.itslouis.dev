<script setup lang="ts">
defineProps<{
  id: string
  title: string
  index: string
}>()
</script>

<template>
  <div class="section-heading">
    <span class="section-index" aria-hidden="true">{{ index }}</span>
    <h2 :id="id">{{ title }}</h2>
    <span class="section-outline" aria-hidden="true">{{ title }}</span>
  </div>
</template>
