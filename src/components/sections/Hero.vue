<template>
  <section class="relative mb-[-100svh] py-15 padding-x">
    <!-- Background Effects -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="tech-grid absolute inset-0 opacity-20"></div>
      <div class="glow-orbs absolute inset-0"></div>
      <div class="particles absolute inset-0">
        <div v-for="p in particles" :key="p.id" class="particle" :style="p.style"></div>
      </div>
    </div>

    <div id="hero"
      class="sticky top-0 z-0 flex min-h-svh w-full items-end pb-[clamp(2.25rem,2.1786rem+0.3571vi,2.5rem)]">
      <div class="relative flex w-full flex-col items-center">

        <!-- Top Row — Animated Text Loop -->
        <div class="w-full overflow-clip">
          <div class="flex w-full items-center justify-between gap-10">
            <div
              class="relative h-[1.2em] overflow-hidden text-4xl font-extrabold uppercase tracking-tight md:text-6xl font-fancy">
              <div class="animate-text-loop flex flex-col">
                <span class="text-loop-item">We Build</span>
                <span class="text-loop-item text-emerald-500">We Innovate</span>
                <span class="text-loop-item">We Deliver</span>
                <span class="text-loop-item text-emerald-500">We Transform</span>
                <span class="text-loop-item">We Build</span> <!-- duplicate for seamless loop -->
              </div>
            </div>
            <div class="hide-on-mobile flex items-center gap-3">
              <span class="status-dot"></span>
              <span class="font-mono text-xs uppercase tracking-widest text-emerald-600">Available Now</span>
            </div>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="lg:column-gap spacing-t grid w-full grid-cols-12 gap-8">

          <!-- Left -->
          <div class="col-span-full flex flex-col items-start gap-10 sm:col-span-5">
            <p class="company-tag font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 rounded-sm cursor-default hover:bg-emerald-500/10 transition-colors"
              @mouseenter="isPulsing = true" @mouseleave="isPulsing = false">
              <span :class="{ 'animate-pulse': isPulsing }">●</span> {{ companyTag }}
            </p>

            <p v-html="whoAmI" id="whoAmI"
              class="who-am-i heading-5 w-full max-w-[30ch] leading-snug font-medium text-balance sm:max-w-[37ch] lg:text-start">
            </p>

            <!-- CTA Buttons — fixed -->
            <div class="flex flex-wrap gap-3">
              <Button label="Start Project →" url="#contact-section" href="#services"
                class="group flex items-center gap-1 font-mono text-xs uppercase tracking-wider border border-flax-smoke-500/20 px-5 py-3 rounded-sm hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300">


                <span class="group-hover:translate-x-0.5 inline-block transition-transform">Our Work</span>
                <span class="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Button>

            </div>

            <!-- Tech Stack -->
            <div class="tech-stack flex flex-wrap gap-2">
              <span v-for="(tech, idx) in techStack" :key="tech"
                class="tech-tag font-mono text-[10px] uppercase tracking-wider text-flax-smoke-500/60 border border-flax-smoke-500/15 px-2.5 py-1 rounded-sm hover:border-emerald-500/30 hover:text-emerald-500 hover:bg-emerald-500/5 transition-all duration-200 cursor-default"
                :style="{ animationDelay: `${idx * 80}ms` }">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Center: Code Card -->
          <div id="profile-container"
            class="group relative col-span-4 mt-10 h-[28vh] max-w-lg sm:mt-0 sm:h-full md:flex md:h-[52vh]"
            @mouseenter="isCodeHovered = true" @mouseleave="isCodeHovered = false">
            <div
              class="code-card h-full w-full overflow-hidden rounded-lg border border-emerald-500/20 bg-[#0d1117] relative transition-all duration-300"
              :class="{ 'border-emerald-400/40 shadow-lg shadow-emerald-500/10': isCodeHovered }">
              <div
                class="absolute top-0 left-0 right-0 z-20 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent">
              </div>

              <div
                class="relative z-20 flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3">
                <div class="flex gap-1.5">
                  <span class="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <span class="font-mono text-xs text-white/20">{{ currentCodeFile }}</span>
                <span class="font-mono text-[10px] text-emerald-400/50">● live</span>
              </div>

              <div class="relative z-10 flex flex-col p-5 pt-4">
                <pre class="font-mono text-xs leading-relaxed"><code v-html="currentCode"></code></pre>
                <div
                  class="absolute bottom-8 right-4 font-mono text-6xl font-bold text-emerald-500/[0.07] group-hover:text-emerald-500/[0.13] transition-all duration-300">
                  { }</div>
                <div class="absolute top-[68px] left-[52px] h-4 w-0.5 bg-emerald-400/70 animate-pulse"></div>
              </div>

              <div class="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                <button v-for="(_, idx) in codeSnippets" :key="idx" @click.stop="currentCodeIndex = idx"
                  class="h-1.5 rounded-full transition-all duration-200"
                  :class="currentCodeIndex === idx ? 'bg-emerald-400 w-4' : 'w-1.5 bg-white/20 hover:bg-white/40'"></button>
              </div>
            </div>
          </div>

          <!-- Right -->
          <div class="col-span-8 size-full text-end sm:col-span-3">
            <div class="mt-10 flex w-full flex-col items-end gap-4 sm:mt-0">

              <div
                class="group w-full cursor-default rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] px-6 py-5 text-right relative overflow-hidden transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-500/[0.1]">
                <div
                  class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent">
                </div>
                <p
                  class="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600 mb-2 transition-colors group-hover:text-emerald-500">
                  Currently Available
                </p>
                <h3
                  class="font-fancy text-4xl font-bold leading-none lg:text-5xl transition-transform group-hover:scale-105">
                  {{ AvailableForWorkDate }}
                </h3>
              </div>

              <div class="flex w-full gap-3">
                <div v-for="(stat, idx) in stats" :key="stat.label"
                  class="stat-item group flex-1 cursor-default border border-flax-smoke-500/10 bg-flax-smoke-500/5 p-3 text-center rounded-md transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  :style="{ animationDelay: `${idx * 100}ms` }">
                  <span class="font-fancy text-2xl font-bold block transition-colors group-hover:text-emerald-500">{{
                    stat.value }}</span>
                  <span class="font-mono text-[9px] uppercase tracking-widest text-flax-smoke-500/50">{{ stat.label
                    }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="mt-12 flex w-full items-center justify-between border-t border-flax-smoke-500/[0.06] pt-6">
          <span
            class="select-none font-fancy text-[clamp(48px,7vw,90px)] font-bold tracking-tighter text-flax-smoke-500/[0.08] uppercase">Build</span>
          <span class="font-mono text-[10px] uppercase tracking-[0.25em] text-flax-smoke-500/30 scroll-hint">↓ Scroll to
            explore ↓</span>
          <span
            class="select-none font-fancy text-[clamp(48px,7vw,90px)] font-bold tracking-tighter text-flax-smoke-500/[0.08] uppercase">Innovate</span>
        </div>

      </div>
    </div>
    <div class="h-svh"></div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref, computed } from 'vue';
import { Button } from '@/components/common';
import { getAvailableForWorkDate, textSplitterIntoChar } from '@/functions';

const whoAmI = ref('Crafting innovative digital solutions that transform businesses and elevate user experiences.');
const AvailableForWorkDate = ref('');
const companyTag = ref('Sentientware Tech Solutions');

const isCodeHovered = ref(false);
const isPulsing = ref(false);
const currentCodeIndex = ref(0);

const techStack = ['Vue.js', 'React', 'Node.js', 'TypeScript', 'Python', 'AI/ML'];

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '3+', label: 'Years' },
  { value: '100%', label: 'Success' },
];

const particles = ref<{ id: number; style: Record<string, string> }[]>([]);

const codeSnippets = [
  {
    file: 'main.ts',
    code: `<span class="text-purple-400">const</span> <span class="text-blue-400">app</span> = <span class="text-yellow-400">createApp</span>({
  <span class="text-emerald-400">name</span>: <span class="text-orange-400">'Sentientware'</span>,
  <span class="text-emerald-400">mission</span>: <span class="text-orange-400">'Innovation'</span>,
  <span class="text-emerald-400">clients</span>: <span class="text-orange-400">50</span><span class="text-white/20">+</span>,
  <span class="text-emerald-400">status</span>: <span class="text-green-400">true</span>
});

<span class="text-purple-400">await</span> <span class="text-blue-400">app</span>.<span class="text-yellow-400">mount</span>(<span class="text-orange-400">'#future'</span>);`
  },
  {
    file: 'api.js',
    code: `<span class="text-purple-400">import</span> { <span class="text-blue-400">fetchData</span> } <span class="text-purple-400">from</span> <span class="text-orange-400">'@sentientware/api'</span>;

<span class="text-purple-400">const</span> <span class="text-blue-400">projects</span> = <span class="text-purple-400">await</span> <span class="text-yellow-400">fetchData</span>({
  <span class="text-emerald-400">type</span>: <span class="text-orange-400">'portfolio'</span>,
  <span class="text-emerald-400">limit</span>: <span class="text-green-400">50</span>,
  <span class="text-emerald-400">rating</span>: <span class="text-orange-400">'excellent'</span>
});

<span class="text-blue-400">console</span>.<span class="text-yellow-400">log</span>(<span class="text-orange-400">'Success!'</span>);`
  },
  {
    file: 'ai.model.ts',
    code: `<span class="text-purple-400">class</span> <span class="text-yellow-400">SentientAI</span> <span class="text-purple-400">extends</span> <span class="text-blue-400">Model</span> {
  <span class="text-purple-400">async</span> <span class="text-blue-400">process</span>(input) {
    <span class="text-purple-400">const</span> <span class="text-blue-400">result</span> = <span class="text-purple-400">await</span> <span class="text-yellow-400">analyze</span>({
      <span class="text-emerald-400">data</span>: input,
      <span class="text-emerald-400">model</span>: <span class="text-orange-400">'gpt-5'</span>,
      <span class="text-emerald-400">accuracy</span>: <span class="text-green-400">0.99</span>
    });
    <span class="text-purple-400">return</span> result;
  }
}`
  },
  {
    file: 'deploy.sh',
    code: `<span class="text-purple-400">#!/bin/bash</span>

<span class="text-blue-400">echo</span> <span class="text-orange-400">"Deploying Sentientware..."</span>

<span class="text-yellow-400">npm</span> <span class="text-blue-400">run</span> build

<span class="text-yellow-400">aws</span> <span class="text-blue-400">s3</span> <span class="text-green-400">sync</span> ./dist <span class="text-orange-400">s3://sentientware</span>

<span class="text-blue-400">echo</span> <span class="text-orange-400">"Deployed successfully!"</span>`
  }
];

const currentCode = computed(() => codeSnippets[currentCodeIndex.value].code);
const currentCodeFile = computed(() => codeSnippets[currentCodeIndex.value].file);

let codeInterval: ReturnType<typeof setInterval>;

onMounted(() => {
  particles.value = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${(i * 5.3 + 7) % 100}%`,
      top: `${(i * 7.7 + 13) % 100}%`,
      width: `${(i % 3) + 2}px`,
      height: `${(i % 3) + 2}px`,
      animationDelay: `${(i * 0.7) % 5}s`,
      animationDuration: `${((i * 1.3) % 10) + 10}s`,
    },
  }));

  codeInterval = setInterval(() => {
    currentCodeIndex.value = (currentCodeIndex.value + 1) % codeSnippets.length;
  }, 4000);
});

onUnmounted(() => {
  clearInterval(codeInterval);
});

onBeforeMount(() => {
  whoAmI.value = textSplitterIntoChar(whoAmI.value);
  AvailableForWorkDate.value = getAvailableForWorkDate();
});
</script>

<style scoped>
.tech-grid {
  background-image:
    linear-gradient(rgba(16, 185, 129, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.06) 1px, transparent 1px);
  background-size: 60px 60px;
}

.glow-orbs {
  background:
    radial-gradient(ellipse 600px 600px at -100px -200px, rgba(16, 185, 129, 0.05) 0%, transparent 70%),
    radial-gradient(ellipse 400px 400px at 100% 100%, rgba(99, 102, 241, 0.04) 0%, transparent 70%);
}

.particle {
  position: absolute;
  background: rgba(16, 185, 129, 0.25);
  border-radius: 50%;
  animation: float-particle linear infinite;
}

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateY(-100vh) translateX(40px);
    opacity: 0;
  }
}

.status-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

/* Animated text loop */
.text-loop-item {
  display: block;
  height: 1.2em;
  line-height: 1.2em;
}

.animate-text-loop {
  animation: text-loop 10s linear infinite;
}

@keyframes text-loop {
  0% {
    transform: translateY(0);
  }

  18% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-1.2em);
  }

  43% {
    transform: translateY(-1.2em);
  }

  50% {
    transform: translateY(-2.4em);
  }

  68% {
    transform: translateY(-2.4em);
  }

  75% {
    transform: translateY(-3.6em);
  }

  93% {
    transform: translateY(-3.6em);
  }

  100% {
    transform: translateY(-4.8em);
  }
}

.tech-tag {
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.stat-item {
  opacity: 0;
  animation: slideUp 0.4s ease forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-hint {
  animation: bounce-hint 2s ease-in-out infinite;
}

@keyframes bounce-hint {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(4px);
  }
}
</style>