<script setup>
import { RouterLink } from 'vue-router';

</script>
<template>
    <div class="font-sans text-brown-800">
      <section class="bg-off-white py-20 text-center">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-semibold mb-5 text-brown-600">Our Hair Services</h1>
          <p class="text-lg">Experience personalized hair care in a warm and relaxing atmosphere.</p>
        </div>
      </section>
  
      <section class="py-16 text-center animate-fade-right animate-once animate-duration-500 animate-delay-200 animate-ease-linear">
        <table class="w-4/5 md:w-3/4 mx-auto border-collapse border-[2px] border-brown text-darkBrown">
          <thead class="text-xl">
            <tr class="bg-light-brown">
              <th class="py-4 px-6 font-semibold text-left">Service</th>
              <th class="py-4 px-6 font-semibold text-left">Duration</th>
              <th class="py-4 px-6 font-semibold text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-light-brown-border">
              <td class="py-4 px-6 text-left">Haircut</td>
              <td class="py-4 px-6 text-left">30 minutes</td>
              <td class="py-4 px-6 text-left">$10</td>
            </tr>
            <tr class="border-b border-light-brown-border">
              <td class="py-4 px-6 text-left">Hair Coloring</td>
              <td class="py-4 px-6 text-left">60 minutes</td>
              <td class="py-4 px-6 text-left">$60</td>
            </tr>
            <tr class="border-b border-light-brown-border">
              <td class="py-4 px-6 text-left">Hair Treatment</td>
              <td class="py-4 px-6 text-left">90 minutes</td>
              <td class="py-4 px-6 text-left">$80</td>
            </tr>
          </tbody>
        </table>
      </section>
  
      <div class="py-16 text-center animate-fade-left animate-once animate-duration-500 animate-delay-200 animate-ease-linear">
        <RouterLink to="/auth/login-booking">
            <button class="bg-darkBrown text-white py-4 px-8 rounded-md text-lg cursor-pointer hover:bg-brown-cta-dark">
          Book an Appointment
        </button>
        </RouterLink>
        
      </div>
    </div>
  </template>