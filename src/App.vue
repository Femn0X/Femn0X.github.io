<template>
  <div id="app-root">
    <NavBar />
    <RouterView />
    <div class="cursor" ref="cursor"></div>
    <div class="cursor-dot" ref="cursorDot"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

const cursor = ref(null)
const cursorDot = ref(null)
let mouseX = 0, mouseY = 0, curX = 0, curY = 0, rafId

function onMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (cursorDot.value) {
    cursorDot.value.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
  }
}
function animate() {
  curX += (mouseX - curX) * 0.12
  curY += (mouseY - curY) * 0.12
  if (cursor.value) {
    cursor.value.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`
  }
  rafId = requestAnimationFrame(animate)
}
onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  rafId = requestAnimationFrame(animate)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})
</script>

<style>
.cursor {
  position: fixed; width: 40px; height: 40px;
  border: 1px solid var(--accent); border-radius: 50%;
  pointer-events: none; z-index: 9999; opacity: 0.5;
  will-change: transform;
}
.cursor-dot {
  position: fixed; width: 8px; height: 8px;
  background: var(--accent); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  will-change: transform;
}
@media (pointer: coarse) {
  .cursor, .cursor-dot { display: none; }
}
</style>
