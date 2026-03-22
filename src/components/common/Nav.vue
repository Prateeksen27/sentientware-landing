<template>
  <BurgerMenuBtn
    @click="toggleBtnClickAnimation"
    class="z-9999 scale-0 drop-shadow-lg"
    id="burger"
  />

  <div
    @click="toggleBtnClickAnimation"
    class="fixed inset-0 z-9998 size-full bg-black opacity-50 select-none"
    :class="{ hidden: !isNavbarOpen }"
  ></div>

  <div
    tabindex="0"
    id="navbar"
    @keydown.esc="toggleBtnClickAnimation()"
    class="bg-flax-smoke-950 fixed top-[1dvh] right-0 z-9998 h-[98dvh] w-full translate-x-full rounded-s-lg p-5 will-change-auto select-none focus:outline-hidden max-md:w-[98%] sm:p-10 md:w-3/5 md:px-20 lg:w-2/5"
  >
    <Circles id="circles" class="absolute top-0 right-0 opacity-25" />
    <div class="flex h-full flex-col items-center justify-between">
      <div class="relative z-19 w-full">
        <ul
          class="heading-2 text-flax-smoke-50 mt-12 font-bold md:mt-24"
          id="navLinks"
        >
          <li
            class="overflow-y-clip"
            v-for="l in navbarLinks"
            :key="l.label"
            :id="l.label"
          >
            <a
              :href="l.url"
              @click="gotoSection(l.url)"
              class="group my-2 flex h-full w-fit translate-y-full cursor-pointer items-center justify-start leading-none will-change-auto"
            >
              <span
                class="bg-flax-smoke-50 h-3 w-3 scale-0 rounded-full opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:h-4 sm:w-4"
              ></span>
              <p
                class="font-fancy -translate-x-4 text-2xl transition-all duration-300 ease-in-out group-hover:translate-x-4 sm:-translate-x-5 sm:text-3xl sm:group-hover:translate-x-5"
              >
                {{ l.label }}
              </p>
            </a>
          </li>
        </ul>
      </div>

      <div class="w-full">
        <div class="text-flax-smoke-50 mt-2 h-full font-normal">
          <p class="text-left text-xs font-bold uppercase sm:text-sm">Email address</p>
          <Link
            class="text-sm font-medium tracking-wider sm:text-base"
            tag="p"
            label="info@sentientware.com"
            url="mailto:info@sentientware.com"
          />
          <div class="mt-4 flex flex-wrap justify-start gap-1 sm:mt-6">
            <Button
              class="contact border-flax-smoke-600 border opacity-0"
              v-for="social in socialLinks"
              :key="social.label"
              :label="social.label"
              :url="social.url"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <header
    :class="$attrs.class"
    class="padding-x absolute inset-0 z-20 h-fit -translate-y-full pt-4 will-change-auto sm:pt-6"
  >
    <nav class="flex items-center justify-between">
      <!-- Logo -->
      <MagneticEffect
        :magnetoStrengthVal="20"
        :magnetoTextStrengthVal="10"
        divId="name-container"
        textId="name"
      >
        <div id="name-container" class="group -m-6 h-fit cursor-pointer p-6 sm:-m-10 sm:p-10">
          <h2
            id="name"
            class="font-fancy flex items-start text-lg font-extrabold uppercase sm:text-xl md:text-3xl"
          >
            sentientware
          </h2>
        </div>
      </MagneticEffect>

      <!-- Desktop Nav Links — hidden on mobile -->
      <div class="hidden md:flex">
        <ul class="flex gap-2 text-lg font-medium lg:gap-4 lg:text-2xl xl:text-3xl">
          <Link
            v-for="(l, index) in navLinks"
            :key="l.label"
            tag="li"
            :label="l.label + (index !== navLinks.length - 1 ? ',' : '')"
            :url="l.url"
          />
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';

  import { Link, BurgerMenuBtn, MagneticEffect } from '..';
  import { Circles } from '../design';
  import { Button } from '../common';

  import {
    animateNavbarEnter,
    animateNavbarLeave,
    navbarScale,
  } from '@/animations';
  import { navbarLinks, navLinks, socialLinks } from '@/data';
  import { lenis } from '@/main';

  const isNavbarOpen = ref(false);

  const toggleBtnClickAnimation = () => {
    isNavbarOpen.value = !isNavbarOpen.value;

    document.getElementById('magneto')?.classList.toggle('active');

    const x = document.getElementById('navbar') as HTMLDivElement;
    if (isNavbarOpen.value) {
      animateNavbarEnter('#navbar', '#navLinks li a', '.contact');
      x.focus();
    } else {
      animateNavbarLeave('#navbar', '#navLinks li a', '.contact');
      x.blur();
    }
  };

  const gotoSection = (url: string) => {
    lenis.start();
    lenis.scrollTo(url, { duration: 3 });
    toggleBtnClickAnimation();
  };

  onMounted(() => {
    navbarScale('#burger', '#hero');
  });

  const emit = defineEmits(['isLocked']);
  watch(isNavbarOpen, (newVal) => {
    emit('isLocked', newVal);
  });
</script>
