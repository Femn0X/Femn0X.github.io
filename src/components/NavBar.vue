<template>
  <nav class="nav" :class="{ scrolled: isScrolled }" v-if="isHome">
    <div class="nav-inner">
      <button class="nav-logo" @click="scrollTo('hero')">✦ Femn0X</button>
      <ul class="nav-links">
        <li v-for="link in links" :key="link.id">
          <button @click="scrollTo(link.id)" :class="{ active: activeSection === link.id }">
            {{ link.label }}
          </button>
        </li>
      </ul>
      <button class="burger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <button v-for="link in links" :key="link.id" @click="scrollTo(link.id); menuOpen = false">
        {{ link.label }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const isScrolled = ref(false)
const menuOpen = ref(false)
const activeSection = ref('hero')

const links = [
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  menuOpen.value = false
}

// Highlight active section on scroll
function onScroll() {
  isScrolled.value = window.scrollY > 60
  const ids = ['hero', 'about', 'skills', 'projects', 'contact']
  for (const id of [...ids].reverse()) {
    const el = document.getElementById(id)
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = id
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 1.5rem 2rem;
  transition: background 0.3s, padding 0.3s, border-bottom 0.3s;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(8,8,8,0.92);
  backdrop-filter: blur(16px);
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  font-family: var(--font-mono); font-size: 0.85rem;
  letter-spacing: 0.15em; color: var(--accent); font-weight: 500;
  background: none; border: none; cursor: pointer;
}
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-links button {
  font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-muted); transition: color 0.2s; position: relative;
  background: none; border: none; cursor: pointer; font-family: var(--font-body);
}
.nav-links button::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 1px; background: var(--accent);
  transform: scaleX(0); transition: transform 0.2s;
}
.nav-links button:hover,
.nav-links button.active { color: var(--text); }
.nav-links button:hover::after,
.nav-links button.active::after { transform: scaleX(1); }

.burger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 4px;
}
.burger span {
  display: block; width: 22px; height: 1.5px;
  background: var(--text); transition: transform 0.25s, opacity 0.25s;
}
.burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

.mobile-menu {
  display: none; flex-direction: column; gap: 1.2rem;
  padding: 1.5rem 2rem; max-height: 0; overflow: hidden;
  transition: max-height 0.4s ease;
}
.mobile-menu.open { max-height: 400px; }
.mobile-menu button {
  font-size: 1.2rem; letter-spacing: 0.05em; color: var(--text-muted);
  background: none; border: none; cursor: pointer; text-align: left;
  font-family: var(--font-body); transition: color 0.2s;
}
.mobile-menu button:hover { color: var(--accent); }

@media (max-width: 640px) {
  .nav-links { display: none; }
  .burger { display: flex; }
  .mobile-menu { display: flex; }
}
</style>
