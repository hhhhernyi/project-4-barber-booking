<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="flex flex-col w-full h-[800px] justify-center items-center">
    <div class="text-darkBrown text-2xl flex flex-col items-center">
      <h1>20 YEARS</h1>
      <h2>IN PROFESSIONAL HAIR SERVICES</h2>
    </div>
    <div class="mt-5">
      <RouterLink to="/services"><button class="border-[2px] border-brown m-3 p-2 rounded-2xl bg-brown text-white cursor-pointer">View services</button></RouterLink>
      <RouterLink to="/auth/login-booking"><button class="border-[2px] border-brown m-3 p-2 rounded-2xl bg-brown text-white cursor-pointer">Book Appointment now</button></RouterLink>
    </div>
  </div>
</template>
