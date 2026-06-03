<template>
  <nav class="nav" :class="{ scrolled: isScrolled }" v-if="isHome">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo">✦ Femn0X</a>
      <ul class="nav-links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" :class="{ active: activeLink === link.href }">{{ link.label }}</a>
        </li>
      </ul>
      <button class="burger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <a v-for="link in links" :key="link.href" :href="link.href" @click="menuOpen = false">{{ link.label }}</a>
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
const activeLink = ref('#hero')

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function onScroll() { isScrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
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
}
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-links a {
  font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-muted); transition: color 0.2s; position: relative;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 1px; background: var(--accent);
  transform: scaleX(0); transition: transform 0.2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--text); }
.nav-links a:hover::after, .nav-links a.active::after { transform: scaleX(1); }
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
.mobile-menu a {
  font-size: 1.2rem; letter-spacing: 0.05em;
  color: var(--text-muted); transition: color 0.2s;
}
.mobile-menu a:hover { color: var(--accent); }
@media (max-width: 640px) {
  .nav-links { display: none; }
  .burger { display: flex; }
  .mobile-menu { display: flex; }
}
</style>
