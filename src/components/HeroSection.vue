<template>
  <section id="hero" class="hero">
    <div class="hero-bg">
      <div class="grid-overlay"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>
    <div class="hero-content">
      <div class="hero-tag" ref="tagEl">
        <span class="dot"></span>
        <span>Available for work</span>
      </div>
      <h1 class="hero-title" ref="titleEl">
        <span class="line">Creative</span>
        <span class="line accent-line">Developer.</span>
      </h1>
      <p class="hero-sub" ref="subEl">
        I build fast, beautiful web experiences that push the boundaries of what the browser can do.
        Based somewhere cool, working everywhere.
      </p>
      <div class="hero-cta" ref="ctaEl">
        <button class="btn-primary" @click="scrollTo('projects')">View Work</button>
        <button class="btn-ghost" @click="scrollTo('contact')">Get in Touch →</button>
      </div>
    </div>
    <div class="hero-scroll">
      <span class="scroll-label">SCROLL</span>
      <div class="scroll-line"><div class="scroll-dot"></div></div>
    </div>
    <div class="hero-counter">
      <div class="counter-item">
        <span class="counter-num">{{ displayProjects }}+</span>
        <span class="counter-label">Projects</span>
      </div>
      <div class="divider"></div>
      <div class="counter-item">
        <span class="counter-num">{{ displayYears }}yr</span>
        <span class="counter-label">Experience</span>
      </div>
      <div class="divider"></div>
      <div class="counter-item">
        <span class="counter-num">{{ displayClients }}+</span>
        <span class="counter-label">Clients</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const displayProjects = ref(0)
const displayYears = ref(0)
const displayClients = ref(0)

function animateCount(target, setter, duration = 1500, delay = 0) {
  setTimeout(() => {
    const start = performance.now()
    function step(now) {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setter(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, delay)
}

onMounted(() => {
  animateCount(42, v => displayProjects.value = v, 1800, 800)
  animateCount(5, v => displayYears.value = v, 1200, 900)
  animateCount(18, v => displayClients.value = v, 1600, 1000)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 8rem 2rem 4rem;
}
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(240,237,230,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240,237,230,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}
.glow-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #e8ff47 0%, transparent 70%);
  top: -200px; right: -100px;
  animation: floatGlow 8s ease-in-out infinite;
}
.glow-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #7c9eff 0%, transparent 70%);
  bottom: 0; left: -100px;
  animation: floatGlow 10s ease-in-out infinite reverse;
}
@keyframes floatGlow {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-40px) scale(1.05); }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  border: 1px solid var(--border);
  padding: 0.4rem 0.9rem;
  border-radius: 100px;
  margin-bottom: 2rem;
  animation: fadeSlideDown 0.8s ease both;
}
.dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 11rem);
  line-height: 0.9;
  letter-spacing: -0.01em;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}
.line {
  display: block;
  animation: fadeSlideUp 0.9s cubic-bezier(.16,1,.3,1) both;
}
.line:nth-child(1) { animation-delay: 0.1s; }
.line:nth-child(2) { animation-delay: 0.2s; }
.accent-line {
  color: transparent;
  -webkit-text-stroke: 2px var(--accent);
  text-stroke: 2px var(--accent);
}

.hero-sub {
  max-width: 560px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 3rem;
  font-weight: 300;
  animation: fadeSlideUp 0.9s cubic-bezier(.16,1,.3,1) 0.35s both;
}
.hero-cta {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  animation: fadeSlideUp 0.9s cubic-bezier(.16,1,.3,1) 0.45s both;
}
.btn-primary {
  background: var(--accent);
  color: #000;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(232,255,71,0.3);
}
.btn-ghost {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.btn-ghost:hover { color: var(--text); }

.hero-scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  animation: fadeIn 1s 1.2s both;
}
.scroll-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  writing-mode: vertical-rl;
}
.scroll-line {
  width: 1px; height: 60px;
  background: var(--border);
  position: relative;
  overflow: hidden;
}
.scroll-dot {
  position: absolute;
  width: 1px; height: 20px;
  background: var(--accent);
  animation: scrollDown 2s ease-in-out infinite;
}
@keyframes scrollDown {
  0% { top: -20px; }
  100% { top: 80px; }
}

.hero-counter {
  position: absolute;
  bottom: 2.5rem; right: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: fadeIn 1s 1.2s both;
}
.counter-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.counter-num {
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
  color: var(--text);
}
.counter-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.divider {
  width: 1px; height: 40px;
  background: var(--border);
}

@keyframes fadeSlideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 640px) {
  .hero-counter { display: none; }
  .hero-scroll { display: none; }
  .accent-line { -webkit-text-stroke-width: 1px; }
}
</style>
