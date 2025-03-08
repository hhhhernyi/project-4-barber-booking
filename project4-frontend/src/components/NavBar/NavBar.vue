<script setup>
// IMPORTS
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useToast } from "vue-toastification";


// CONSTANTS
const router = useRouter();
const toast = useToast();

const token = localStorage.getItem('token')

    


// VARIABLES
const showSmallNavBar = ref(false);
let adminStatus=false;
if (token) {
  const decoded = JSON.parse(atob(token.split('.')[1]));
  adminStatus = decoded.payload.admin
    console.log(decoded.payload.admin) // i can check for admin status here
}

// FUNCTIONS

function toggleSmallNavBar() {
  showSmallNavBar.value = !showSmallNavBar.value
  console.log(showSmallNavBar)
  return showSmallNavBar
}

function handleLogout() {
  localStorage.clear()
  toast.success("Logged Out")
  router.push('/')
}


</script>

<template>
  <div
    class="flex w-[80%] max-w-[1500px] border-[2px] h-[100px] mt-5 mx-auto z-1 rounded-xl justify-around items-center bg-brown text-white fixed right-0 left-0"
  >
    <div><RouterLink to="/"><i class="pi pi-image mt-1"></i></RouterLink></div>
    <div class="flex justify-around w-[70%] sm:hidden md:flex">
      <div v-if="token">
        <div v-if="adminStatus===true"><RouterLink to="/admin/home"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Admin</p ></RouterLink></div>
        <div v-else="adminStatus===false"><RouterLink to="/member/home"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Member</p ></RouterLink></div>
      </div>
      <RouterLink to="/"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Home</p></RouterLink>
      <RouterLink to="/services"><p  class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Services</p></RouterLink>
      <RouterLink to="/auth/login-booking"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Book Appointment</p></RouterLink>
      <div>
        <RouterLink v-if="!token" to="/auth/login"><p class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Login</p ></RouterLink>
        <RouterLink v-else="token" to="/"><p @click="handleLogout" class="border-[2px] p-3  rounded-3xl  hover:shadow-lg hover:shadow-amber-950/50 hover:scale-125">Logout</p ></RouterLink>
      </div>
      
      
      
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
        <div v-if="token">
        <div v-if="adminStatus===true"><RouterLink to="/admin/home"><p class="py-5">Admin</p ></RouterLink></div>
        <div v-else-if="adminStatus===false"><RouterLink to="/member/home"><p class="py-5">Member</p ></RouterLink></div>
        
      </div>
      
    </div>

 

</template>
