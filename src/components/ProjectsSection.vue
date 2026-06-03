<template>
  <section id="projects" class="projects" ref="section">
    <div class="projects-inner">
      <div class="section-label">
        <span class="label-line"></span>
        <span>03 — Projects</span>
      </div>
      <h2 class="projects-title" :class="{ visible: isVisible }">Selected<br><em>Work.</em></h2>

      <div class="projects-list">
        <article
          v-for="(project, i) in projects"
          :key="project.title"
          class="project-card"
          :class="{ visible: isVisible }"
          :style="{ transitionDelay: `${i * 0.12}s` }"
        >
          <router-link :to="`/project/${project.slug}`" class="project-visual" :style="{ background: project.bg }">
            <div class="project-visual-inner">
              <span class="project-icon">{{ project.icon }}</span>
            </div>
            <div class="project-overlay">
              <span class="view-label">View Project ↗</span>
            </div>
          </router-link>
          <div class="project-info">
            <div class="project-meta">
              <span class="project-year">{{ project.year }}</span>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag" class="ptag">{{ tag }}</span>
              </div>
            </div>
            <router-link :to="`/project/${project.slug}`">
              <h3 class="project-title">{{ project.title }}</h3>
            </router-link>
            <p class="project-desc">{{ project.desc }}</p>
            <router-link :to="`/project/${project.slug}`" class="read-more">
              Read more →
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { projects } from '../data/projects.js'

const section = ref(null)
const isVisible = ref(false)

let observer
onMounted(() => {
  observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) isVisible.value = true
  }, { threshold: 0.1 })
  observer.observe(section.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.projects { padding: 8rem 2rem; position: relative; }
.projects::before {
  content: ''; position: absolute; left: 0; top: 0; right: 0;
  height: 1px; background: var(--border);
}
.projects-inner { max-width: 1200px; margin: 0 auto; }
.section-label {
  display: flex; align-items: center; gap: 1rem;
  font-family: var(--font-mono); font-size: 0.72rem;
  letter-spacing: 0.15em; color: var(--text-muted);
  text-transform: uppercase; margin-bottom: 2rem;
}
.label-line { display: block; width: 40px; height: 1px; background: var(--accent); }
.projects-title {
  font-family: var(--font-display); font-size: clamp(3rem, 7vw, 7rem);
  line-height: 0.95; margin-bottom: 4rem;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.projects-title.visible { opacity: 1; transform: translateY(0); }
.projects-title em { font-style: normal; color: transparent; -webkit-text-stroke: 2px var(--accent); }

.projects-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.project-card {
  border: 1px solid var(--border); border-radius: 8px; overflow: hidden;
  background: var(--bg2);
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease, border-color 0.2s;
}
.project-card.visible { opacity: 1; transform: translateY(0); }
.project-card:hover { border-color: rgba(232,255,71,0.3); }

.project-visual {
  aspect-ratio: 16/9; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; text-decoration: none;
}
.project-visual-inner { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
.project-icon { font-size: 4rem; opacity: 0.7; transition: transform 0.3s; }
.project-card:hover .project-icon { transform: scale(1.1); }
.project-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.project-card:hover .project-overlay { opacity: 1; }
.view-label { font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.1em; color: var(--accent); }

.project-info { padding: 1.5rem; }
.project-meta {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;
}
.project-year { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.1em; }
.project-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.ptag {
  font-family: var(--font-mono); font-size: 0.65rem; padding: 0.2rem 0.5rem;
  border: 1px solid var(--border); border-radius: 3px; color: var(--accent); letter-spacing: 0.05em;
}
.project-title {
  font-family: var(--font-display); font-size: 1.6rem; line-height: 1.1;
  margin-bottom: 0.75rem; letter-spacing: 0.02em;
  transition: color 0.2s;
}
.project-title:hover { color: var(--accent); }
.project-desc { font-size: 0.87rem; line-height: 1.7; color: var(--text-muted); font-weight: 300; margin-bottom: 1rem; }
.read-more {
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.08em;
  color: var(--text-muted); transition: color 0.2s;
}
.read-more:hover { color: var(--accent); }

@media (max-width: 768px) { .projects-list { grid-template-columns: 1fr; } }
</style>
