<script setup lang="ts">
import { ArrowUpRight, Box, Mail, MapPin } from '@lucide/vue'
import { computed } from 'vue'
import type { Resume } from '../types/resume'
import BrandIcon from './BrandIcon.vue'

const { resume } = defineProps<{
  resume: Resume
}>()

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  month: 'short',
  year: 'numeric',
})

const githubProfile = computed(() =>
  resume.basics.profiles.find((profile) => profile.network === 'GitHub'),
)
const linkedinProfile = computed(() =>
  resume.basics.profiles.find((profile) => profile.network === 'LinkedIn'),
)

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`)).replace('.', '')
}

function formatRange(startDate: string, endDate: string) {
  return `${formatDate(startDate)} — ${formatDate(endDate)}`
}
</script>

<template>
  <article class="print-resume" aria-label="CV de Louis Floquet au format imprimable">
    <section class="pdf-page pdf-page--profile">
      <header class="pdf-masthead">
        <div class="pdf-brand">
          <img src="/logo.svg" width="34" height="34" alt="" />
          <span>~/cv</span>
        </div>
        <div class="pdf-masthead-links">
          <a :href="resume.basics.url">itslouis.dev</a>
          <a :href="`mailto:${resume.basics.email}`">{{ resume.basics.email }}</a>
        </div>
      </header>

      <div class="pdf-hero">
        <p class="pdf-kicker">Curriculum vitæ · 2026</p>
        <h1>{{ resume.basics.name }}</h1>
        <p class="pdf-role">{{ resume.basics.label }}</p>
        <div class="pdf-identity">
          <span
            ><MapPin :size="11" aria-hidden="true" /> {{ resume.basics.location.city }},
            {{ resume.basics.location.region }}</span
          >
          <a :href="`mailto:${resume.basics.email}`"
            ><Mail :size="11" aria-hidden="true" /> {{ resume.basics.email }}</a
          >
        </div>
        <p class="pdf-summary">{{ resume.basics.summary }}</p>
        <div class="pdf-profiles">
          <a v-if="githubProfile" :href="githubProfile.url">
            <BrandIcon brand="github" :size="10" /> github.com/{{ githubProfile.username }}
          </a>
          <a v-if="linkedinProfile" :href="linkedinProfile.url">
            <BrandIcon brand="linkedin" :size="10" /> linkedin.com/in/{{ linkedinProfile.username }}
          </a>
        </div>
      </div>

      <section class="pdf-section pdf-experience" aria-labelledby="pdf-experience-title">
        <div class="pdf-section-title">
          <span>01</span>
          <h2 id="pdf-experience-title">Expérience</h2>
          <strong aria-hidden="true">EXPÉRIENCE</strong>
        </div>

        <div class="pdf-timeline">
          <article
            v-for="job in resume.work"
            :key="`${job.name}-${job.startDate}`"
            class="pdf-timeline-item"
          >
            <time>{{ formatRange(job.startDate, job.endDate) }}</time>
            <div>
              <h3>{{ job.position }}</h3>
              <a v-if="job.url" class="pdf-organization" :href="job.url">
                {{ job.name }} <ArrowUpRight :size="9" aria-hidden="true" />
              </a>
              <p v-else class="pdf-organization">{{ job.name }}</p>
              <p class="pdf-item-summary">{{ job.summary }}</p>
              <ul>
                <li v-for="highlight in job.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <footer class="pdf-footer">
        <span>Louis Floquet · Développeur Fullstack</span>
        <span>01 / 03</span>
      </footer>
    </section>

    <section class="pdf-page">
      <header class="pdf-masthead pdf-masthead--compact">
        <div class="pdf-brand"><span>Louis Floquet</span></div>
        <div class="pdf-masthead-links"><span>Formation & compétences</span></div>
      </header>

      <section class="pdf-section pdf-education" aria-labelledby="pdf-education-title">
        <div class="pdf-section-title">
          <span>02</span>
          <h2 id="pdf-education-title">Formation</h2>
          <strong aria-hidden="true">FORMATION</strong>
        </div>

        <div class="pdf-timeline">
          <article
            v-for="education in resume.education"
            :key="`${education.area}-${education.startDate}`"
            class="pdf-timeline-item pdf-education-item"
          >
            <time>{{ formatRange(education.startDate, education.endDate) }}</time>
            <div>
              <div class="pdf-title-with-badge">
                <div>
                  <h3>{{ education.area }}</h3>
                  <p class="pdf-organization">{{ education.institution }}</p>
                </div>
                <span>{{ education.studyType }}</span>
              </div>
              <ul class="pdf-course-list">
                <li v-for="course in education.courses" :key="course">{{ course }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section class="pdf-section pdf-skills" aria-labelledby="pdf-skills-title">
        <div class="pdf-section-title">
          <span>03</span>
          <h2 id="pdf-skills-title">Compétences</h2>
          <strong aria-hidden="true">COMPÉTENCES</strong>
        </div>

        <div class="pdf-skills-grid">
          <article v-for="skill in resume.skills" :key="skill.name" class="pdf-skill-card">
            <div>
              <h3>{{ skill.name }}</h3>
              <span>{{ skill.level }}</span>
            </div>
            <ul>
              <li v-for="keyword in skill.keywords" :key="keyword">{{ keyword }}</li>
            </ul>
          </article>
        </div>
      </section>

      <footer class="pdf-footer">
        <span>cv.itslouis.dev</span>
        <span>02 / 03</span>
      </footer>
    </section>

    <section class="pdf-page">
      <header class="pdf-masthead pdf-masthead--compact">
        <div class="pdf-brand"><span>Louis Floquet</span></div>
        <div class="pdf-masthead-links"><span>Projets & profil</span></div>
      </header>

      <section class="pdf-section pdf-projects" aria-labelledby="pdf-projects-title">
        <div class="pdf-section-title">
          <span>04</span>
          <h2 id="pdf-projects-title">Projets</h2>
          <strong aria-hidden="true">PROJETS</strong>
        </div>

        <div class="pdf-project-grid">
          <article v-for="project in resume.projects" :key="project.name" class="pdf-project">
            <Box :size="12" :stroke-width="1.6" aria-hidden="true" />
            <div>
              <h3>
                <a v-if="project.url" :href="project.url"
                  >{{ project.name }} <ArrowUpRight :size="9" aria-hidden="true"
                /></a>
                <span v-else>{{ project.name }}</span>
              </h3>
              <p>{{ project.description }}</p>
              <ul>
                <li v-for="keyword in project.keywords" :key="keyword">{{ keyword }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section class="pdf-section pdf-profile-details" aria-labelledby="pdf-details-title">
        <div class="pdf-section-title">
          <span>05</span>
          <h2 id="pdf-details-title">En quelques mots</h2>
          <strong aria-hidden="true">PROFIL</strong>
        </div>

        <div class="pdf-details-grid">
          <div>
            <h3>Langues</h3>
            <dl>
              <div v-for="language in resume.languages" :key="language.language">
                <dt>{{ language.language }}</dt>
                <dd>{{ language.fluency }}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3>Centres d’intérêt</h3>
            <ul class="pdf-interest-list">
              <li v-for="interest in resume.interests" :key="interest.name">
                <span>{{ interest.name }}</span>
                <small v-if="interest.keywords?.length">{{ interest.keywords.join(' · ') }}</small>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="pdf-contact" aria-label="Contact">
        <div>
          <span>Une idée, un poste, un projet ?</span>
          <h2>Échangeons.</h2>
        </div>
        <div>
          <a :href="`mailto:${resume.basics.email}`"
            >{{ resume.basics.email }} <ArrowUpRight :size="11" aria-hidden="true"
          /></a>
          <a :href="resume.basics.url">{{ resume.basics.url.replace('https://', '') }}</a>
        </div>
      </section>

      <footer class="pdf-footer">
        <span>Disponible pour de nouvelles opportunités</span>
        <span>03 / 03</span>
      </footer>
    </section>
  </article>
</template>
