<template>
  <section id="skills" class="skills" ref="section">
    <div class="skills-inner">
      <div class="section-label">
        <span class="label-line"></span>
        <span>02 — Skills</span>
      </div>
      <div class="skills-grid">
        <div class="skills-header" :class="{ visible: isVisible }">
          <h2 class="skills-title">What I<br><em>work with.</em></h2>
          <p>A curated toolkit built through real projects and constant learning.</p>
        </div>
        <div class="skills-bars" :class="{ visible: isVisible }">
          <div class="skill-bar" v-for="(skill, i) in skills" :key="skill.name"
            :style="{ transitionDelay: `${i * 0.08}s` }">
            <div class="skill-info">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.level }}%</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: isVisible ? skill.level + '%' : '0%', background: skill.color }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tools-row" :class="{ visible: isVisible }">
        <div class="tool-card" v-for="tool in tools" :key="tool.name">
          <span class="tool-icon">{{ tool.icon }}</span>
          <span class="tool-name">{{ tool.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const section = ref(null)
const isVisible = ref(false)

const skills = [
  { name: 'Vue.js / Nuxt', level: 92, color: 'linear-gradient(90deg, #41b883, #34495e)' },
  { name: 'JavaScript / TypeScript', level: 88, color: 'linear-gradient(90deg, #f7df1e, #ff6b35)' },
  { name: 'CSS / SCSS / Tailwind', level: 90, color: 'linear-gradient(90deg, #7c9eff, #a78bfa)' },
  { name: 'HTML & Accessibility', level: 95, color: 'linear-gradient(90deg, #e8ff47, #4ade80)' },
  { name: 'Vite / Webpack', level: 82, color: 'linear-gradient(90deg, #ff6b35, #e8ff47)' },
  { name: 'Node.js / REST APIs', level: 75, color: 'linear-gradient(90deg, #4ade80, #7c9eff)' },
]

const tools = [
  { name: 'VS Code', icon: '💻' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Git', icon: '🔀' },
  { name: 'Postman', icon: '📡' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Notion', icon: '📝' },
  { name: 'Linear', icon: '◆' },
]

let observer
onMounted(() => {
  observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) isVisible.value = true
  }, { threshold: 0.15 })
  observer.observe(section.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.skills {
  padding: 8rem 2rem;
  background: var(--bg2);
  position: relative;
}
.skills-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 4rem;
}
.label-line {
  display: block; width: 40px; height: 1px;
  background: var(--accent);
}
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 6rem;
  margin-bottom: 4rem;
  align-items: start;
}
.skills-header {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.skills-header.visible { opacity: 1; transform: translateY(0); }
.skills-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  line-height: 1;
  margin-bottom: 1.2rem;
}
.skills-title em {
  font-style: normal;
  color: var(--accent);
}
.skills-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  font-weight: 300;
}
.skills-bars {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease;
}
.skills-bars.visible { opacity: 1; transform: translateY(0); }
.skill-bar {
  margin-bottom: 1.8rem;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.skills-bars.visible .skill-bar {
  opacity: 1;
}
.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.skill-name {
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.03em;
}
.skill-level {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}
.bar-track {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1.2s cubic-bezier(.16,1,.3,1);
}

.tools-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease;
}
.tools-row.visible { opacity: 1; transform: translateY(0); }
.tool-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg3);
  transition: border-color 0.2s, transform 0.2s;
  cursor: default;
}
.tool-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.tool-icon { font-size: 1rem; }
.tool-name {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
