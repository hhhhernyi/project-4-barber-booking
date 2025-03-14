<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="grid grid-cols-2 h-[800px]">
    <div
      class="bg-[url('/images/heroBG.png')] bg-cover bg-center rounded-r-[15%]"
    ></div>
    <div class="flex flex-col justify-center items-center">
      <div class="text-darkBrown text-2xl flex flex-col items-center">
        <h1 class="md:text-6xl sm:text-3xl font-montserrat">20 YEARS</h1>
        <h2 class="text-sm md:text-4xl font-montserrat">IN PROFESSIONAL HAIR SERVICES</h2>
      </div>
      <div class="mt-5 flex sm:flex-col md:flex-row justify-center items-center">
        <RouterLink to="/services">
          <button
            class="border-[2px] border-brown m-3 p-2 rounded-2xl bg-brown text-white cursor-pointer hover:scale-125"
          >
            View services
          </button>
        </RouterLink>
        <RouterLink to="/auth/login-booking">
          <button
            class="border-[2px] border-brown m-3 p-2 rounded-2xl bg-brown text-white cursor-pointer hover:scale-125"
          >
            Book Appointment now
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
