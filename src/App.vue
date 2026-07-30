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
  '--dot-color',
  '--header-bg',
]

const githubProfile = computed(() =>
  resume.basics.profiles.find((profile) => profile.network === 'GitHub'),
)
const linkedinProfile = computed(() =>
  resume.basics.profiles.find((profile) => profile.network === 'LinkedIn'),
)

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'short',
  year: 'numeric',
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`)).replace('.', '')
}

function formatRange(startDate: string, endDate: string) {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

function updateScrollState() {
  showToTop.value = window.scrollY > 480
}

function applyTheme(dark: boolean) {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)

  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    // The selected theme still applies when storage is unavailable.
  }
}

function createThemeSnapshot(x: number, y: number) {
  const siteShell = document.querySelector<HTMLElement>('.site-shell')
  if (!siteShell) return null

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
  snapshot.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'))

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
  if (isThemeTransitioning) return

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
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

    const animation = overlay.animate(
      [{ '--theme-reveal-radius': '0px' }, { '--theme-reveal-radius': `${radius}px` }],
      {
        duration: 400,
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
        fill: 'forwards',
      },
    )

    await animation.finished.catch(() => undefined)
  } finally {
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
  } catch {
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
  <div id="top" class="site-shell min-h-svh">
    <AppHeader
      :is-dark="isDark"
      :show-to-top="showToTop"
      @print="printResume"
      @to-top="toTop"
      @toggle-theme="toggleTheme"
    />

    <main
      class="resume page-content mx-auto w-[min(calc(100%_-_40px),48rem)] pt-[126px] pb-20 min-[721px]:w-[min(calc(100%_-_64px),48rem)] min-[721px]:pt-[152px] min-[721px]:pb-28"
    >
      <section class="hero relative" aria-labelledby="name">
        <h1
          id="name"
          class="mb-0.5 text-[clamp(2.6rem,7vw,4rem)] leading-[1.05] font-[650] tracking-[-0.052em] text-text"
        >
          {{ resume.basics.name }}
        </h1>
        <p class="role mb-6 text-[clamp(1.1rem,3vw,1.35rem)] tracking-[-0.022em] text-text-soft">
          {{ resume.basics.label }}
        </p>

        <div
          class="identity-meta mb-8 flex flex-col flex-wrap gap-x-[18px] gap-y-[9px] font-mono text-xs text-text-muted min-[441px]:flex-row"
        >
          <span class="inline-flex items-center gap-1.5"
            ><MapPin :size="15" aria-hidden="true" /> {{ resume.basics.location.city }},
            {{ resume.basics.location.region }}</span
          >
          <a
            class="inline-flex items-center gap-1.5 no-underline transition-colors duration-200 hover:text-text"
            :href="`mailto:${resume.basics.email}?subject=cv.itslouis.dev%20%7C%20`"
          >
            <Mail :size="15" aria-hidden="true" /> {{ resume.basics.email }}
          </a>
        </div>

        <p
          class="summary mb-[25px] text-[15px] leading-[1.75] text-text-soft min-[721px]:text-[17px] min-[721px]:leading-[1.78]"
        >
          {{ resume.basics.summary }}
        </p>

        <div class="profile-links flex flex-wrap gap-[9px]">
          <a
            v-if="githubProfile"
            class="relative z-0 inline-flex items-center gap-1.5 overflow-hidden rounded-sm px-2 py-[5px] font-mono text-[13px] text-text no-underline transition-colors duration-250 before:absolute before:inset-x-0 before:bottom-0 before:-z-10 before:h-0 before:bg-text before:content-[''] before:transition-[height] before:duration-250 hover:text-inverse hover:before:h-full"
            :href="githubProfile.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrandIcon brand="github" :size="15" /> GitHub
            <ArrowUpRight :size="13" aria-hidden="true" />
          </a>
          <a
            v-if="linkedinProfile"
            class="relative z-0 inline-flex items-center gap-1.5 overflow-hidden rounded-sm px-2 py-[5px] font-mono text-[13px] text-text no-underline transition-colors duration-250 before:absolute before:inset-x-0 before:bottom-0 before:-z-10 before:h-0 before:bg-text before:content-[''] before:transition-[height] before:duration-250 hover:text-inverse hover:before:h-full"
            :href="linkedinProfile.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrandIcon brand="linkedin" :size="15" /> LinkedIn
            <ArrowUpRight :size="13" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        class="resume-section mt-[78px] min-[721px]:mt-[104px]"
        aria-labelledby="experience-title"
      >
        <SectionHeading id="experience-title" title="Expérience" index="01" />
        <div class="timeline-list border-t border-border">
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

      <section
        class="resume-section mt-[78px] min-[721px]:mt-[104px]"
        aria-labelledby="education-title"
      >
        <SectionHeading id="education-title" title="Formation" index="02" />
        <div class="timeline-list border-t border-border">
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

      <section
        class="resume-section mt-[78px] min-[721px]:mt-[104px]"
        aria-labelledby="skills-title"
      >
        <SectionHeading id="skills-title" title="Compétences" index="03" />
        <div class="skills-grid grid grid-cols-1 gap-3 min-[721px]:grid-cols-2">
          <SkillGroup v-for="skill in resume.skills" :key="skill.name" :skill="skill" />
        </div>
      </section>

      <section
        class="resume-section mt-[78px] min-[721px]:mt-[104px]"
        aria-labelledby="projects-title"
      >
        <SectionHeading id="projects-title" title="Projets" index="04" />
        <div class="project-list border-t border-border">
          <ProjectItem v-for="project in resume.projects" :key="project.name" :project="project" />
        </div>
      </section>

      <section
        class="resume-section details-section mt-[78px] min-[721px]:mt-[104px]"
        aria-labelledby="more-title"
      >
        <SectionHeading id="more-title" title="En quelques mots" index="05" />
        <div
          class="details-grid grid grid-cols-1 gap-11 border-t border-border pt-7 min-[721px]:grid-cols-[0.8fr_1.2fr] min-[721px]:gap-[60px]"
        >
          <div
            class="detail-column [&>h3]:mb-[19px] [&>h3]:font-mono [&>h3]:text-xs [&>h3]:leading-[1.4] [&>h3]:font-[620] [&>h3]:tracking-[-0.02em] [&>h3]:text-text"
          >
            <h3>Langues</h3>
            <dl class="language-list m-0 [&>div]:border-b [&>div]:border-border [&>div]:py-[13px]">
              <div v-for="language in resume.languages" :key="language.language">
                <dt class="text-sm font-[570] text-text">{{ language.language }}</dt>
                <dd class="mt-px mb-0 text-xs text-text-muted">{{ language.fluency }}</dd>
              </div>
            </dl>
          </div>
          <div
            class="detail-column [&>h3]:mb-[19px] [&>h3]:font-mono [&>h3]:text-xs [&>h3]:leading-[1.4] [&>h3]:font-[620] [&>h3]:tracking-[-0.02em] [&>h3]:text-text"
          >
            <h3>Centres d’intérêt</h3>
            <ul class="interest-list m-0 grid list-none gap-0 p-0">
              <li
                v-for="interest in resume.interests"
                :key="interest.name"
                class="flex flex-col border-b border-border py-2.5 text-[13px] text-text-soft"
              >
                <span>{{ interest.name }}</span>
                <small
                  v-if="interest.keywords?.length"
                  class="mt-[3px] font-mono text-[9px] leading-[1.55] text-text-faint"
                  >{{ interest.keywords.join(' · ') }}</small
                >
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        class="contact-section mt-[84px] rounded-xl bg-text px-[25px] py-[31px] text-inverse min-[721px]:mt-28 min-[721px]:p-[42px]"
        aria-labelledby="contact-title"
      >
        <span
          class="contact-eyebrow font-mono text-[10px] tracking-[0.08em] text-[color-mix(in_srgb,var(--inverse)_60%,transparent)] uppercase"
          >Une idée, un poste, un projet ?</span
        >
        <h2
          id="contact-title"
          class="mt-[7px] mb-2.5 text-[clamp(2.1rem,7vw,3.3rem)] leading-[1.05] font-[630] tracking-[-0.055em]"
        >
          Échangeons.
        </h2>
        <p
          class="mb-[25px] max-w-[540px] text-sm text-[color-mix(in_srgb,var(--inverse)_72%,transparent)]"
        >
          Je suis disponible pour discuter de nouvelles opportunités autour du web, du produit et
          des systèmes agentiques.
        </p>
        <a
          class="contact-link relative z-0 inline-flex items-center gap-1.5 overflow-hidden rounded-sm font-mono text-sm text-inverse no-underline transition-colors duration-250 before:absolute before:inset-x-0 before:bottom-0 before:-z-10 before:h-0 before:bg-inverse before:content-[''] before:transition-[height] before:duration-250 hover:text-text hover:before:h-full"
          :href="`mailto:${resume.basics.email}?subject=cv.itslouis.dev%20%7C%20`"
        >
          {{ resume.basics.email }} <ArrowUpRight :size="17" aria-hidden="true" />
        </a>
      </section>
    </main>

    <footer
      class="site-footer mx-auto flex w-[min(calc(100%_-_40px),48rem)] flex-col items-start justify-between gap-[7px] border-t border-border pt-[27px] pb-7 font-mono text-[10px] text-text-faint min-[441px]:flex-row min-[441px]:gap-5 min-[721px]:w-[min(calc(100%_-_64px),48rem)] min-[721px]:items-center min-[721px]:pb-[38px]"
    >
      <span>© {{ new Date().getFullYear() }} Louis Floquet</span>
      <a
        class="inline-flex items-center gap-1 no-underline hover:text-text"
        href="https://gist.github.com/itsmelouis/9e1747cc5b704021a9af1eea5590a750"
        target="_blank"
        rel="noopener noreferrer"
      >
        JSON Resume <ArrowUpRight :size="12" aria-hidden="true" />
      </a>
    </footer>
  </div>
</template>
