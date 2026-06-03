<template>
  <section id="contact" class="contact" ref="section">
    <div class="contact-inner">
      <div class="section-label">
        <span class="label-line"></span>
        <span>04 — Contact</span>
      </div>
      <div class="contact-grid">
        <div class="contact-left" :class="{ visible: isVisible }">
          <h2 class="contact-title">Let's build<br>something<br><em>great.</em></h2>
          <p class="contact-sub">Open for freelance projects and full-time opportunities.</p>
          <div class="contact-links">
            <a href="mailto:lucawinecker@gmail.com" class="contact-link">
              <span class="cl-icon">✉</span>
              <span>lucawinecker@gmail.com</span>
            </a>
            <a href="https://github.com/Femn0X" target="_blank" class="contact-link">
              <span class="cl-icon">⌥</span>
              <span>github.com/Femn0X</span>
            </a>
            <a href="https://www.linkedin.com/in/luca-winecker" target="_blank" class="contact-link">
              <span class="cl-icon">◈</span>
              <span>linkedin.com/in/luca-winecker</span>
            </a>
          </div>
        </div>
        <div class="contact-form-wrap" :class="{ visible: isVisible }">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group" :class="{ focused: focused === 'name' }">
              <label for="name">Name</label>
              <input id="name" v-model="form.name" type="text" placeholder="Your name"
                @focus="focused = 'name'" @blur="focused = null" required />
            </div>
            <div class="form-group" :class="{ focused: focused === 'email' }">
              <label for="email">Email</label>
              <input id="email" v-model="form.email" type="email" placeholder="your@email.com"
                @focus="focused = 'email'" @blur="focused = null" required />
            </div>
            <div class="form-group" :class="{ focused: focused === 'message' }">
              <label for="message">Message</label>
              <textarea id="message" v-model="form.message" placeholder="Tell me about your project..."
                rows="5" @focus="focused = 'message'" @blur="focused = null" required></textarea>
            </div>
            <button type="submit" class="submit-btn" :class="{ sending: sending, sent: sent }">
              <span v-if="!sending && !sent">Send Message →</span>
              <span v-else-if="sending">Sending...</span>
              <span v-else>Message Sent ✓</span>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="contact-bottom">
      <p class="footer-text">Built by Femn0X · Vue 3 + Vite · {{ new Date().getFullYear() }}</p>
      <div class="footer-links">
        <a href="#hero">Back to top ↑</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const section = ref(null)
const isVisible = ref(false)
const focused = ref(null)
const sending = ref(false)
const sent = ref(false)

const form = reactive({ name: '', email: '', message: '' })

async function handleSubmit() {
  sending.value = true
  await new Promise(r => setTimeout(r, 1500))
  sending.value = false
  sent.value = true
  form.name = ''
  form.email = ''
  form.message = ''
  setTimeout(() => sent.value = false, 4000)
}

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
.contact {
  padding: 8rem 2rem 4rem;
  background: var(--bg2);
  position: relative;
}
.contact::before {
  content: '';
  position: absolute;
  left: 0; top: 0; right: 0;
  height: 1px; background: var(--border);
}
.contact-inner { max-width: 1200px; margin: 0 auto; }
.section-label {
  display: flex; align-items: center; gap: 1rem;
  font-family: var(--font-mono); font-size: 0.72rem;
  letter-spacing: 0.15em; color: var(--text-muted);
  text-transform: uppercase; margin-bottom: 4rem;
}
.label-line { display: block; width: 40px; height: 1px; background: var(--accent); }

.contact-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 6rem; margin-bottom: 5rem;
}
.contact-left {
  opacity: 0; transform: translateX(-30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.contact-left.visible { opacity: 1; transform: translateX(0); }
.contact-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1; margin-bottom: 1.5rem;
}
.contact-title em { font-style: normal; color: var(--accent); }
.contact-sub {
  color: var(--text-muted); font-size: 1rem;
  line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300;
}
.contact-links { display: flex; flex-direction: column; gap: 1rem; }
.contact-link {
  display: flex; align-items: center; gap: 1rem;
  font-size: 0.9rem; color: var(--text-muted);
  transition: color 0.2s, transform 0.2s;
}
.contact-link:hover { color: var(--text); transform: translateX(4px); }
.cl-icon {
  width: 32px; height: 32px;
  border: 1px solid var(--border);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; flex-shrink: 0;
  transition: border-color 0.2s;
}
.contact-link:hover .cl-icon { border-color: var(--accent); }

.contact-form-wrap {
  opacity: 0; transform: translateX(30px);
  transition: opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease;
}
.contact-form-wrap.visible { opacity: 1; transform: translateX(0); }
.contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
.form-group {
  display: flex; flex-direction: column; gap: 0.4rem;
  position: relative;
}
.form-group::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 1px; background: var(--accent);
  transform: scaleX(0); transition: transform 0.3s;
  transform-origin: left;
}
.form-group.focused::after { transform: scaleX(1); }

label {
  font-family: var(--font-mono); font-size: 0.7rem;
  letter-spacing: 0.12em; color: var(--text-muted);
  text-transform: uppercase;
}
input, textarea {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.8rem 1rem;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 300;
  outline: none;
  transition: border-color 0.2s;
  resize: none;
}
input:focus, textarea:focus { border-color: rgba(232,255,71,0.3); }
input::placeholder, textarea::placeholder { color: var(--text-muted); opacity: 0.5; }

.submit-btn {
  background: var(--accent);
  color: #000;
  border: none;
  padding: 1rem 2.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s, box-shadow 0.2s, background 0.3s;
  align-self: flex-start;
}
.submit-btn:hover:not(.sending):not(.sent) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(232,255,71,0.3);
}
.submit-btn.sending { background: var(--bg3); color: var(--text-muted); cursor: not-allowed; }
.submit-btn.sent { background: #4ade80; color: #000; }

.contact-bottom {
  max-width: 1200px; margin: 0 auto;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.footer-text {
  font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--text-muted); letter-spacing: 0.08em;
}
.footer-links a {
  font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--text-muted); letter-spacing: 0.08em;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--accent); }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  .contact-bottom { flex-direction: column; gap: 1rem; text-align: center; }
}
</style>
