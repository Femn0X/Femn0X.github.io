<template>
  <section id="about" class="about" ref="section">
    <div class="about-inner">
      <div class="section-label">
        <span class="label-line"></span>
        <span>01 — About</span>
      </div>
      <div class="about-grid">
        <div class="about-text" :class="{ visible: isVisible }">
          <h2 class="about-title">
            Turning ideas into<br>
            <em>digital reality.</em>
          </h2>
          <p>
            I'm a frontend developer with a passion for crafting interfaces that feel alive. 
            I obsess over performance, accessibility, and the tiny details that separate 
            good from unforgettable.
          </p>
          <p>
            My workflow blends Vue.js, modern CSS, and a healthy skepticism of over-engineering.
            When I'm not building, I'm probably reading about typography or arguing about tabs vs spaces.
          </p>
          <div class="about-tags">
            <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="about-visual" :class="{ visible: isVisible }">
          <div class="portrait-frame">
            <div class="portrait-inner">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e8ff47;stop-opacity:0.3"/>
                    <stop offset="100%" style="stop-color:#7c9eff;stop-opacity:0.3"/>
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="100" fill="url(#grad)"/>
                <circle cx="100" cy="78" r="35" fill="rgba(240,237,230,0.15)"/>
                <ellipse cx="100" cy="155" rx="55" ry="40" fill="rgba(240,237,230,0.1)"/>
                <text x="100" y="108" text-anchor="middle" font-size="48" opacity="0.4">👤</text>
              </svg>
              <div class="portrait-badge">
                <span>✦</span> Vue 3 Dev
              </div>
            </div>
            <div class="frame-deco top-right"></div>
            <div class="frame-deco bottom-left"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const section = ref(null)
const isVisible = ref(false)

const tags = ['Vue 3', 'TypeScript', 'Vite', 'Node.js', 'CSS/SCSS', 'Figma', 'Git', 'REST APIs']

let observer
onMounted(() => {
  observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) isVisible.value = true
  }, { threshold: 0.2 })
  observer.observe(section.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.about {
  padding: 8rem 2rem;
  position: relative;
}
.about::before {
  content: '';
  position: absolute;
  left: 0; top: 0; right: 0;
  height: 1px;
  background: var(--border);
}
.about-inner {
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
  display: block;
  width: 40px; height: 1px;
  background: var(--accent);
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
.about-text {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.about-text.visible {
  opacity: 1;
  transform: translateX(0);
}
.about-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1;
  margin-bottom: 2rem;
}
.about-title em {
  font-style: normal;
  color: var(--accent);
}
.about-text p {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.2rem;
  font-weight: 300;
}
.about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
}
.tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  transition: border-color 0.2s, color 0.2s;
}
.tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.about-visual {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease;
}
.about-visual.visible {
  opacity: 1;
  transform: translateX(0);
}
.portrait-frame {
  position: relative;
  padding: 1.5rem;
}
.portrait-inner {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg2);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.portrait-svg {
  width: 75%;
  height: 75%;
}
.portrait-badge {
  position: absolute;
  bottom: 1.5rem; right: 1.5rem;
  background: var(--bg3);
  border: 1px solid var(--border);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}
.portrait-badge span { color: var(--accent); }

.frame-deco {
  position: absolute;
  width: 24px; height: 24px;
  border-color: var(--accent);
  border-style: solid;
}
.frame-deco.top-right {
  top: 0; right: 0;
  border-width: 1px 1px 0 0;
}
.frame-deco.bottom-left {
  bottom: 0; left: 0;
  border-width: 0 0 1px 1px;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .about-visual { order: -1; }
}
</style>
