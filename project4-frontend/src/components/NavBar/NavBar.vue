<script setup>
// IMPORTS
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";


// CONSTANTS
const router = useRouter();


// VARIABLES
const showSmallNavBar = ref(false);

// FUNCTIONS

function toggleSmallNavBar() {
  showSmallNavBar.value = !showSmallNavBar.value
  console.log(showSmallNavBar)
  return showSmallNavBar
}



</script>

<template>
  <div
    class="flex w-[80%] max-w-[1500px] border-[2px] h-[100px] mt-5 mx-auto rounded-xl justify-around items-center bg-brown text-white fixed right-0 left-0"
  >
    <div><RouterLink to="/"><i class="pi pi-image mt-1"></i></RouterLink></div>
    <div class="flex justify-around w-[70%] sm:hidden md:flex">
      <RouterLink to="/"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Home</p></RouterLink>
      <RouterLink to="/services"><p  class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Services</p></RouterLink>
      <RouterLink to="/auth/login-booking"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Book Appointment</p></RouterLink>
      <RouterLink to="/auth/login"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Login</p ></RouterLink>
    </div>

    <div @click="toggleSmallNavBar" class="md:hidden sm:block hover:cursor-pointer">
      <i class="pi pi-bars mt-1"></i>
    </div>
    

    
  </div>

    <div v-show="showSmallNavBar" class="w-[85%] mx-auto border-[2px] flex flex-col items-center bg-mediumBrown opacity-95 rounded-2xl fixed right-0 left-0 top-[120px]">
      <RouterLink to="/"><p class="py-5">Home</p></RouterLink>
      <RouterLink to="/services"><p class="py-5">Services</p></RouterLink>
      <RouterLink to="/auth/login-booking"><p class="py-5">Book Appointment</p></RouterLink>
      <RouterLink to="/auth/login"><p class="py-5">Login</p ></RouterLink>
      
    </div>

 

</template>
