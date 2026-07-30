<script setup lang="ts">
import type { Skill } from '../types/resume'

defineProps<{
  skill: Skill
}>()
</script>

<template>
  <article class="skill-group">
    <div class="skill-heading">
      <h3>{{ skill.name }}</h3>
      <span>{{ skill.level }}</span>
    </div>
    <ul class="tag-list" :aria-label="`Technologies : ${skill.name}`">
      <li v-for="keyword in skill.keywords" :key="keyword">{{ keyword }}</li>
    </ul>
  </article>
</template>
