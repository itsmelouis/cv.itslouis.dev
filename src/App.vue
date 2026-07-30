<script setup lang="ts">
import { ArrowUpRight, Mail, MapPin } from '@lucide/vue'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import BrandIcon from './components/BrandIcon.vue'
import ProjectItem from './components/ProjectItem.vue'
import SectionHeading from './components/SectionHeading.vue'
import SkillGroup from './components/SkillGroup.vue'
import TimelineItem from './components/TimelineItem.vue'
import resumeData from './data/resume.json'
import type { Resume } from './types/resume'

const resume = resumeData as Resume
const isDark = ref(document.documentElement.classList.contains('dark'))
const showToTop = ref(false)
let isThemeTransitioning = false

const themeProperties = [
  '--page',
  '--surface',
  '--surface-raised',
  '--text',
  '--text-soft',
  '--text-muted',
  '--text-faint',
  '--border',
  '--border-strong',
  '--inverse',
  '--success',
  '--success-bg',
  '--header-bg',
]

const githubProfile = computed(() => resume.basics.profiles.find(profile => profile.network === 'GitHub'))
const linkedinProfile = computed(() => resume.basics.profiles.find(profile => profile.network === 'LinkedIn'))

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'short',
  year: 'numeric',
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`)).replace('.', '')
}

function formatRange(startDate: string, endDate: string) {
  return `${formatDate(startDate)} — ${formatDate(endDate)}`
}

function updateScrollState() {
  showToTop.value = window.scrollY > 480
}

function applyTheme(dark: boolean) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)

  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }
  catch {
    // The selected theme still applies when storage is unavailable.
  }
}

function createThemeSnapshot(x: number, y: number) {
  const siteShell = document.querySelector<HTMLElement>('.site-shell')
  if (!siteShell)
    return null

  const rootStyles = getComputedStyle(document.documentElement)
  const overlay = document.createElement('div')
  const snapshot = siteShell.cloneNode(true) as HTMLElement

  overlay.className = 'theme-transition-overlay'
  overlay.ariaHidden = 'true'
  overlay.inert = true
  overlay.style.colorScheme = isDark.value ? 'dark' : 'light'
  overlay.style.setProperty('--theme-reveal-x', `${x}px`)
  overlay.style.setProperty('--theme-reveal-y', `${y}px`)
  overlay.style.setProperty('--theme-scroll-y', `${window.scrollY}px`)

  for (const property of themeProperties)
    overlay.style.setProperty(property, rootStyles.getPropertyValue(property))

  snapshot.classList.add('theme-transition-snapshot')
  snapshot.removeAttribute('id')
  snapshot.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'))

  const floatingElements = snapshot.querySelectorAll<HTMLElement>('.app-header, .to-top-button')
  overlay.appendChild(snapshot)
  floatingElements.forEach((element) => {
    element.classList.add('theme-transition-floating')
    overlay.appendChild(element)
  })
  document.body.appendChild(overlay)

  return overlay
}

async function toggleTheme(event: MouseEvent) {
  if (isThemeTransitioning)
    return

  const nextTheme = !isDark.value
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyTheme(nextTheme)
    return
  }

  const button = event.currentTarget as HTMLElement | null
  const buttonRect = button?.getBoundingClientRect()
  const x = event.clientX || (buttonRect ? buttonRect.left + buttonRect.width / 2 : innerWidth / 2)
  const y = event.clientY || (buttonRect ? buttonRect.top + buttonRect.height / 2 : innerHeight / 2)
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 2
  const overlay = createThemeSnapshot(x, y)

  if (!overlay) {
    applyTheme(nextTheme)
    return
  }

  isThemeTransitioning = true
  document.documentElement.classList.add('theme-transitioning')

  try {
    applyTheme(nextTheme)
    await nextTick()
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

    const animation = overlay.animate(
      [
        { '--theme-reveal-radius': '0px' },
        { '--theme-reveal-radius': `${radius}px` },
      ],
      {
        duration: 400,
        easing: 'ease-out',
        fill: 'forwards',
      },
    )

    await animation.finished.catch(() => undefined)
  }
  finally {
    overlay.remove()
    document.documentElement.classList.remove('theme-transitioning')
    isThemeTransitioning = false
  }
}

function printResume() {
  window.print()
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  let storedTheme: string | null = null

  try {
    storedTheme = localStorage.getItem('theme')
  }
  catch {
    // Fall back to the operating-system preference.
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(storedTheme ? storedTheme === 'dark' : prefersDark)
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  document.querySelector('.theme-transition-overlay')?.remove()
  document.documentElement.classList.remove('theme-transitioning')
})
</script>

<template>
  <div id="top" class="site-shell">
    <AppHeader
      :is-dark="isDark"
      :show-to-top="showToTop"
      @print="printResume"
      @to-top="toTop"
      @toggle-theme="toggleTheme"
    />

    <main class="resume page-content">
      <section class="hero" aria-labelledby="name">
        <div class="availability"><span aria-hidden="true"></span> Ouvert à de nouvelles opportunités</div>
        <h1 id="name">{{ resume.basics.name }}</h1>
        <p class="role">{{ resume.basics.label }}</p>

        <div class="identity-meta">
          <span><MapPin :size="15" aria-hidden="true" /> {{ resume.basics.location.city }}, {{ resume.basics.location.region }}</span>
          <a :href="`mailto:${resume.basics.email}?subject=cv.itslouis.dev%20%7C%20`">
            <Mail :size="15" aria-hidden="true" /> {{ resume.basics.email }}
          </a>
        </div>

        <p class="summary">{{ resume.basics.summary }}</p>

        <div class="profile-links">
          <a v-if="githubProfile" :href="githubProfile.url" target="_blank" rel="noopener noreferrer">
            <BrandIcon brand="github" :size="15" /> GitHub <ArrowUpRight :size="13" aria-hidden="true" />
          </a>
          <a v-if="linkedinProfile" :href="linkedinProfile.url" target="_blank" rel="noopener noreferrer">
            <BrandIcon brand="linkedin" :size="15" /> LinkedIn <ArrowUpRight :size="13" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section class="resume-section" aria-labelledby="experience-title">
        <SectionHeading id="experience-title" title="Expérience" index="01" />
        <div class="timeline-list">
          <TimelineItem
            v-for="job in resume.work"
            :key="`${job.name}-${job.startDate}`"
            :date="formatRange(job.startDate, job.endDate)"
            :title="job.position"
            :organization="job.name"
            :url="job.url"
            :summary="job.summary"
            :details="job.highlights"
          />
        </div>
      </section>

      <section class="resume-section" aria-labelledby="education-title">
        <SectionHeading id="education-title" title="Formation" index="02" />
        <div class="timeline-list">
          <TimelineItem
            v-for="education in resume.education"
            :key="`${education.area}-${education.startDate}`"
            :date="formatRange(education.startDate, education.endDate)"
            :title="education.area"
            :organization="education.institution"
            :badge="education.studyType"
            :details="education.courses"
          />
        </div>
      </section>

      <section class="resume-section" aria-labelledby="skills-title">
        <SectionHeading id="skills-title" title="Compétences" index="03" />
        <div class="skills-grid">
          <SkillGroup v-for="skill in resume.skills" :key="skill.name" :skill="skill" />
        </div>
      </section>

      <section class="resume-section" aria-labelledby="projects-title">
        <SectionHeading id="projects-title" title="Projets" index="04" />
        <div class="project-list">
          <ProjectItem v-for="project in resume.projects" :key="project.name" :project="project" />
        </div>
      </section>

      <section class="resume-section details-section" aria-labelledby="more-title">
        <SectionHeading id="more-title" title="En quelques mots" index="05" />
        <div class="details-grid">
          <div class="detail-column">
            <h3>Langues</h3>
            <dl class="language-list">
              <div v-for="language in resume.languages" :key="language.language">
                <dt>{{ language.language }}</dt>
                <dd>{{ language.fluency }}</dd>
              </div>
            </dl>
          </div>
          <div class="detail-column">
            <h3>Centres d’intérêt</h3>
            <ul class="interest-list">
              <li v-for="interest in resume.interests" :key="interest.name">
                <span>{{ interest.name }}</span>
                <small v-if="interest.keywords?.length">{{ interest.keywords.join(' · ') }}</small>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="contact-section" aria-labelledby="contact-title">
        <span class="contact-eyebrow">Une idée, un poste, un projet ?</span>
        <h2 id="contact-title">Échangeons.</h2>
        <p>Je suis disponible pour discuter de nouvelles opportunités autour du web, du produit et des systèmes agentiques.</p>
        <a class="contact-link" :href="`mailto:${resume.basics.email}?subject=cv.itslouis.dev%20%7C%20`">
          {{ resume.basics.email }} <ArrowUpRight :size="17" aria-hidden="true" />
        </a>
      </section>
    </main>

    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} Louis Floquet</span>
      <a href="https://gist.github.com/itsmelouis/9e1747cc5b704021a9af1eea5590a750" target="_blank" rel="noopener noreferrer">
        JSON Resume <ArrowUpRight :size="12" aria-hidden="true" />
      </a>
    </footer>
  </div>
</template>
