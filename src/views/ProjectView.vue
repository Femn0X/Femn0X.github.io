<template>
  <div class="project-page" v-if="project">
    <!-- Back nav -->
    <nav class="back-nav">
      <router-link to="/" class="back-btn">
        <span class="back-arrow">←</span> Back to Portfolio
      </router-link>
      <span class="nav-logo">✦ Femn0X</span>
    </nav>

    <!-- Hero -->
    <header class="ph" :style="{ '--accent-local': project.accentColor }">
      <div class="ph-bg" :style="{ background: project.bg }">
        <div class="ph-grid"></div>
      </div>
      <div class="ph-inner">
        <div class="ph-meta">
          <span class="ph-year">{{ project.year }}</span>
          <span class="ph-sep">·</span>
          <span class="ph-status" :class="project.status.toLowerCase().replace(' ', '-')">
            {{ project.status }}
          </span>
        </div>
        <h1 class="ph-title">{{ project.title }}</h1>
        <p class="ph-subtitle">{{ project.subtitle }}</p>
        <div class="ph-tags">
          <span v-for="tag in project.tags" :key="tag" class="ph-tag">{{ tag }}</span>
        </div>
        <div class="ph-actions">
          <a :href="project.github" target="_blank" class="ph-btn primary">
            ⌥ View on GitHub
          </a>
          <a v-if="project.live" :href="project.live" target="_blank" class="ph-btn ghost">
            ↗ Live Demo
          </a>
        </div>
      </div>
      <div class="ph-icon-wrap">
        <span class="ph-icon">{{ project.icon }}</span>
      </div>
    </header>

    <!-- Content -->
    <main class="pc">
      <!-- Quick stats -->
      <div class="pc-stats">
        <div class="stat">
          <span class="stat-label">Role</span>
          <span class="stat-value">{{ project.role }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Duration</span>
          <span class="stat-value">{{ project.duration }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Status</span>
          <span class="stat-value">{{ project.status }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Year</span>
          <span class="stat-value">{{ project.year }}</span>
        </div>
      </div>

      <div class="pc-grid">
        <!-- Left col -->
        <div class="pc-main">
          <section class="pc-section">
            <h2 class="pc-h2">Overview</h2>
            <p class="pc-body">{{ project.overview }}</p>
          </section>

          <section class="pc-section">
            <h2 class="pc-h2">Key Features</h2>
            <ul class="feature-list">
              <li v-for="feat in project.features" :key="feat">
                <span class="feat-bullet" :style="{ color: project.accentColor }">✦</span>
                {{ feat }}
              </li>
            </ul>
          </section>

          <section class="pc-section">
            <h2 class="pc-h2">Challenges & Solutions</h2>
            <p class="pc-body">{{ project.challenges }}</p>
          </section>
        </div>

        <!-- Right col -->
        <aside class="pc-aside">
          <div class="aside-card">
            <h3 class="aside-title">Tech Stack</h3>
            <div class="tech-list">
              <div class="tech-row" v-for="item in project.techDetails" :key="item.label">
                <span class="tech-label">{{ item.label }}</span>
                <span class="tech-value">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="aside-card">
            <h3 class="aside-title">Links</h3>
            <a :href="project.github" target="_blank" class="aside-link">
              <span>⌥</span> GitHub Repository ↗
            </a>
            <a v-if="project.live" :href="project.live" target="_blank" class="aside-link">
              <span>◈</span> Live Demo ↗
            </a>
            <span v-else class="aside-link muted"><span>◈</span> Live demo coming soon</span>
          </div>

          <div class="aside-card tags-card">
            <h3 class="aside-title">Tags</h3>
            <div class="aside-tags">
              <span v-for="tag in project.tags" :key="tag" class="aside-tag"
                :style="{ borderColor: project.accentColor + '44', color: project.accentColor }">
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>

      <!-- Other projects -->
      <section class="other-projects">
        <h2 class="pc-h2">Other Projects</h2>
        <div class="other-grid">
          <router-link
            v-for="p in otherProjects"
            :key="p.slug"
            :to="`/project/${p.slug}`"
            class="other-card"
          >
            <div class="other-visual" :style="{ background: p.bg }">
              <span>{{ p.icon }}</span>
            </div>
            <div class="other-info">
              <span class="other-year">{{ p.year }}</span>
              <h3 class="other-title">{{ p.title }}</h3>
              <div class="other-tags">
                <span v-for="tag in p.tags.slice(0,2)" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </main>

    <footer class="pf">
      <span>Built by <a href="https://github.com/Femn0X" target="_blank">Femn0X</a> · {{ new Date().getFullYear() }}</span>
      <router-link to="/">← Back to Home</router-link>
    </footer>
  </div>

  <!-- 404 state -->
  <div class="not-found" v-else>
    <h1>Project not found</h1>
    <router-link to="/">← Go back</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'

const route = useRoute()
const project = computed(() => projects.find(p => p.slug === route.params.slug))
const otherProjects = computed(() => projects.filter(p => p.slug !== route.params.slug))
</script>

<style scoped>
/* ── Back nav ── */
.back-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.2rem 2rem;
  background: rgba(8,8,8,0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.back-btn {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono); font-size: 0.78rem;
  letter-spacing: 0.08em; color: var(--text-muted);
  transition: color 0.2s, transform 0.2s;
}
.back-btn:hover { color: var(--accent); transform: translateX(-3px); }
.back-arrow { font-size: 1rem; }
.nav-logo {
  font-family: var(--font-mono); font-size: 0.82rem;
  letter-spacing: 0.15em; color: var(--accent);
}

/* ── Hero ── */
.ph {
  position: relative; padding: 8rem 2rem 5rem;
  overflow: hidden; min-height: 50vh;
  display: flex; align-items: flex-end;
}
.ph-bg {
  position: absolute; inset: 0;
}
.ph-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(240,237,230,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240,237,230,0.04) 1px, transparent 1px);
  background-size: 50px 50px;
}
.ph::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
  background: linear-gradient(to bottom, transparent, var(--bg));
}
.ph-inner {
  max-width: 1200px; margin: 0 auto; width: 100%;
  position: relative; z-index: 1;
}
.ph-meta {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 1rem;
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em;
}
.ph-year { color: var(--text-muted); }
.ph-sep { color: var(--border); }
.ph-status {
  padding: 0.2rem 0.6rem; border-radius: 3px;
  border: 1px solid currentColor; font-size: 0.7rem;
}
.ph-status.completed { color: #4ade80; }
.ph-status.live { color: var(--accent); }
.ph-status.open-source { color: #7c9eff; }

.ph-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.95; margin-bottom: 0.5rem;
}
.ph-subtitle {
  font-size: 1.1rem; color: var(--text-muted); font-weight: 300;
  margin-bottom: 1.5rem;
}
.ph-tags {
  display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;
}
.ph-tag {
  font-family: var(--font-mono); font-size: 0.72rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--accent-local, var(--accent));
  color: var(--accent-local, var(--accent));
  border-radius: 4px; letter-spacing: 0.05em;
  opacity: 0.8;
}
.ph-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.ph-btn {
  font-family: var(--font-mono); font-size: 0.78rem;
  letter-spacing: 0.08em; padding: 0.75rem 1.5rem;
  border-radius: 4px; transition: transform 0.2s, box-shadow 0.2s;
}
.ph-btn.primary {
  background: var(--accent-local, var(--accent));
  color: #000; font-weight: 500;
}
.ph-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.ph-btn.ghost {
  border: 1px solid var(--border); color: var(--text-muted);
}
.ph-btn.ghost:hover { color: var(--text); border-color: var(--text); }

.ph-icon-wrap {
  position: absolute; right: 4rem; bottom: 3rem; z-index: 1;
  opacity: 0.15;
}
.ph-icon { font-size: 8rem; }

/* ── Content ── */
.pc {
  max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 6rem;
}
.pc-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1px; background: var(--border);
  border: 1px solid var(--border); border-radius: 8px;
  overflow: hidden; margin-bottom: 4rem;
}
.stat {
  background: var(--bg2); padding: 1.5rem;
  display: flex; flex-direction: column; gap: 0.3rem;
}
.stat-label {
  font-family: var(--font-mono); font-size: 0.68rem;
  letter-spacing: 0.12em; color: var(--text-muted); text-transform: uppercase;
}
.stat-value {
  font-size: 1rem; font-weight: 400;
}

.pc-grid {
  display: grid; grid-template-columns: 1fr 340px;
  gap: 4rem; margin-bottom: 5rem;
}
.pc-section { margin-bottom: 3rem; }
.pc-h2 {
  font-family: var(--font-display);
  font-size: 1.8rem; letter-spacing: 0.03em;
  margin-bottom: 1.2rem;
  color: var(--text);
}
.pc-body {
  color: var(--text-muted); line-height: 1.85;
  font-size: 0.97rem; font-weight: 300;
}

.feature-list {
  list-style: none; display: flex; flex-direction: column; gap: 0.8rem;
}
.feature-list li {
  display: flex; align-items: flex-start; gap: 0.75rem;
  color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;
  font-weight: 300;
}
.feat-bullet { flex-shrink: 0; font-size: 0.7rem; margin-top: 0.3rem; }

/* Aside */
.pc-aside { display: flex; flex-direction: column; gap: 1.5rem; }
.aside-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 8px; padding: 1.5rem;
}
.aside-title {
  font-family: var(--font-mono); font-size: 0.7rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 1rem;
}
.tech-list { display: flex; flex-direction: column; gap: 0.6rem; }
.tech-row {
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 0.6rem; border-bottom: 1px solid var(--border);
}
.tech-row:last-child { border-bottom: none; padding-bottom: 0; }
.tech-label {
  font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--text-muted); letter-spacing: 0.05em;
}
.tech-value { font-size: 0.85rem; font-weight: 400; }

.aside-link {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.87rem; color: var(--text-muted);
  padding: 0.5rem 0; transition: color 0.2s;
  border-bottom: 1px solid var(--border);
}
.aside-link:last-child { border-bottom: none; }
.aside-link:hover:not(.muted) { color: var(--accent); }
.aside-link.muted { cursor: default; opacity: 0.5; font-size: 0.82rem; }

.aside-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.aside-tag {
  font-family: var(--font-mono); font-size: 0.7rem;
  padding: 0.25rem 0.6rem; border: 1px solid; border-radius: 3px;
  letter-spacing: 0.05em;
}

/* Other projects */
.other-projects { padding-top: 3rem; border-top: 1px solid var(--border); }
.other-projects .pc-h2 { margin-bottom: 2rem; }
.other-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem;
}
.other-card {
  border: 1px solid var(--border); border-radius: 8px;
  overflow: hidden; background: var(--bg2);
  transition: border-color 0.2s, transform 0.2s;
  display: block;
}
.other-card:hover {
  border-color: rgba(232,255,71,0.3); transform: translateY(-3px);
}
.other-visual {
  height: 100px; display: flex; align-items: center; justify-content: center;
  font-size: 2.5rem;
}
.other-info { padding: 1rem; }
.other-year {
  font-family: var(--font-mono); font-size: 0.68rem;
  color: var(--text-muted); letter-spacing: 0.1em;
}
.other-title {
  font-family: var(--font-display); font-size: 1.2rem;
  margin: 0.3rem 0 0.5rem; letter-spacing: 0.02em;
}
.other-tags {
  display: flex; gap: 0.4rem;
}
.other-tags span {
  font-family: var(--font-mono); font-size: 0.65rem;
  padding: 0.15rem 0.45rem; border: 1px solid var(--border);
  border-radius: 3px; color: var(--text-muted);
}

/* Footer */
.pf {
  border-top: 1px solid var(--border);
  padding: 2rem;
  max-width: 1200px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--text-muted); letter-spacing: 0.05em;
}
.pf a { color: var(--text-muted); transition: color 0.2s; }
.pf a:hover { color: var(--accent); }

/* 404 */
.not-found {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 1rem;
}
.not-found h1 { font-family: var(--font-display); font-size: 3rem; }
.not-found a { font-family: var(--font-mono); color: var(--accent); }

@media (max-width: 900px) {
  .pc-grid { grid-template-columns: 1fr; }
  .pc-stats { grid-template-columns: repeat(2, 1fr); }
  .other-grid { grid-template-columns: 1fr 1fr; }
  .ph-icon-wrap { display: none; }
}
@media (max-width: 600px) {
  .other-grid { grid-template-columns: 1fr; }
  .pc-stats { grid-template-columns: 1fr 1fr; }
}
</style>
